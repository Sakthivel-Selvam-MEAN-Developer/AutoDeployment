import { ChangeEvent, useContext, useEffect, useState } from 'react'
import AutoComplete from '../../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { getAllCementCompany } from '../../../services/cementCompany.ts'
import { dispatchData } from './tripStatusContext.ts'
import { TransporterField, FactoryField, DateField } from './TransporterField.tsx'
export interface FormFieldsProps {
    control: Control
}
const TripFilterFields: React.FC<FormFieldsProps> = ({ control }) => {
    const [cementCompany, setCementCompany] = useState([])
    const [cementCompanyName, setCementCompanyName] = useState('')
    const { dispatch } = useContext(dispatchData)
    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
    }, [])
    return (
        <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
            <AutoComplete
                control={control}
                fieldName="companyName"
                label="Select Company"
                data-testid={'select'}
                options={cementCompany ? cementCompany.map(({ name }) => name) : []}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = cementCompany.find(({ name }) => name === newValue) || { id: 0 }
                    dispatch(
                        { cementCompanyId: id, type: 'updateCementComapnyId' },
                        { pageNumber: 1, type: 'updatePageNumber' }
                    )
                    setCementCompanyName(newValue)
                }}
            />
            <TransporterField control={control} dispatch={dispatch} />
            <FactoryField
                control={control}
                dispatch={dispatch}
                cementCompanyName={cementCompanyName}
            />
            <DateField control={control} />
        </div>
    )
}
export default TripFilterFields
