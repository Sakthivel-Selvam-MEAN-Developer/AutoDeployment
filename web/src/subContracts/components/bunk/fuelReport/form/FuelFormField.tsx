import { ChangeEvent, useContext, useEffect, useState } from 'react'
import AutoComplete from '../../../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { divStyle } from '../FuelContext/UpdateFuelFilter.ts'
import FilterField from './FormField.tsx'
import { dispatchData } from '../FuelContext/FuelReportContext.ts'
import { getAllBunk } from '../../../../services/bunk.ts'
export interface FormFieldsProps {
    control: Control
}
const statusData = [
    {
        name: 'Paid'
    },
    {
        name: 'Un Paid'
    }
]
const FuelFilterFields: React.FC<FormFieldsProps> = ({ control }) => {
    const [bunk, setBunk] = useState([])
    const { dispatch } = useContext(dispatchData)
    useEffect(() => {
        getAllBunk().then(setBunk)
    }, [])
    return (
        <div style={{ ...divStyle, flexWrap: 'wrap' }}>
            <AutoComplete
                control={control}
                fieldName="bunkName"
                label="Select Bunk Name"
                data-testid={'select'}
                options={bunk ? bunk.map(({ bunkName }) => bunkName) : []}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = bunk.find(({ bunkName }) => bunkName === newValue) || { id: 0 }
                    dispatch(
                        { bunkId: id, type: 'updateBunkId' },
                        { pageNumber: 1, type: 'updatePageNumber' }
                    )
                }}
            />
            <FilterField control={control} dispatch={dispatch} />
            <AutoComplete
                control={control}
                fieldName="status"
                label="Select Status"
                data-testid={'select'}
                options={statusData ? statusData.map(({ name }) => name) : []}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { name } = statusData.find(({ name }) => name === newValue) || { id: 0 }
                    dispatch(
                        { transactionId: name, type: 'updatetransactionId' },
                        { pageNumber: 1, type: 'updatePageNumber' }
                    )
                }}
            />
        </div>
    )
}
export default FuelFilterFields
