import { ChangeEvent, useContext, useEffect, useState } from 'react'
import AutoComplete from '../../../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { divStyle } from '../fuelContext/updateFuelFilter.ts'
import { dispatchData } from '../fuelContext/fuelReportContext.ts'
import { getAllBunk } from '../../../../services/bunk.ts'
import FilterField from './FormField.tsx'
export interface FormFieldsProps {
    control: Control
}
const statusData = [
    {
        name: 'Paid',
        value: true
    },
    {
        name: 'UnPaid',
        value: false
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
                    const { id } = bunk.find(({ bunkName }) => bunkName === newValue) || {
                        id: null
                    }
                    dispatch(
                        { bunkId: id, type: 'updateBunkId' },
                        { pageNumber: 1, type: 'updatePageNumber' }
                    )
                }}
            />
            <AutoComplete
                control={control}
                fieldName="transporterType"
                label="Select Transporter Type"
                options={['Own', 'Market Transporter']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    dispatch({ transporterType: newValue, type: 'updateTransporterType' })
                    dispatch({ pageNumber: 1, type: 'updatePageNumber' })
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
                    const { value } = statusData.find(({ name }) => name === newValue) || {
                        value: null
                    }
                    dispatch(
                        { paymentStatus: value, type: 'updatepaymentStatus' },
                        { pageNumber: 1, type: 'updatePageNumber' }
                    )
                }}
            />
        </div>
    )
}
export default FuelFilterFields
