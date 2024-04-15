import { ChangeEvent, Dispatch, FC, useContext, useEffect, useState } from 'react'
import AutoComplete from '../../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { getAllCementCompany } from '../../../services/cementCompany.ts'
import { getAllTransporter } from '../../../services/transporter.ts'
import { getLoadingPointByCompanyName } from '../../../services/loadingPoint.ts'
import DateInput from '../../../../form/DateInput.tsx'
import { dispatchData } from './tripStatusContext.ts'
import { dispatchType } from './list.tsx'
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
                    dispatch({ cementCompanyId: id, type: 'updateCementComapnyId' })
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

interface FactoryFieldProps {
    control: Control
    cementCompanyName: string
    dispatch: Dispatch<dispatchType>
}

const FactoryField: FC<FactoryFieldProps> = ({ control, cementCompanyName, dispatch }) => {
    const [loadingPointList, setLoadingPointList] = useState([])
    useEffect(() => {
        if (cementCompanyName !== '')
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
    }, [cementCompanyName])
    return (
        <AutoComplete
            control={control}
            fieldName="factoryName"
            label="Select Factory"
            options={loadingPointList ? loadingPointList.map(({ name }) => name) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const { id } = loadingPointList.find(({ name }) => name === newValue) || { id: 0 }
                dispatch({ loadinPointId: id, type: 'updateLoadinPointId' })
            }}
        />
    )
}
interface TransporterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
const TransporterField: FC<TransporterFieldProps> = ({ control, dispatch }) => {
    const [transporter, setTransporter] = useState([])
    useEffect(() => {
        getAllTransporter().then(setTransporter)
    }, [])
    return (
        <AutoComplete
            control={control}
            fieldName="transporterName"
            label="Select Transporter"
            options={transporter ? transporter.map(({ name }) => name) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const { id } = transporter.find(({ name }) => name === newValue) || { id: 0 }
                dispatch({ transporterId: id, type: 'updateTransporterId' })
            }}
        />
    )
}
interface DateFieldProps {
    control: Control
}
const DateField: FC<DateFieldProps> = ({ control }) => {
    return (
        <>
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="from"
                label="Trip Start Date"
            />
            <DateInput control={control} format="DD/MM/YYYY" fieldName="to" label="Trip End Date" />
        </>
    )
}
