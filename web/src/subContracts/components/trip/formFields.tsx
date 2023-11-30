import TextInput from '../../../form/TextInput.tsx'
import NumberInput from '../../../form/NumberInput.tsx'
import AutoComplete from '../../../form/AutoComplete.tsx'
import DateInput from '../../../form/DateInput.tsx'
import { InputAdornment } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getTruckByTransporter } from '../../services/truck.ts'

interface FormFieldProps {
    control: any
    transporter: string[]
}
const FormField: React.FC<FormFieldProps> = ({ control, transporter }) => {
    const [transporterName, setTransporterName] = useState<string | null>()
    const [listTruck, setListTruck] = useState([])

    useEffect(() => {
        getTruckByTransporter(transporterName).then((truckData) => {
            setListTruck(truckData.map(({ vehicleNumber }: any) => vehicleNumber))
        })
    }, [transporterName])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutoComplete
                control={control}
                fieldName="transporterName"
                label="Transporter"
                options={transporter}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setTransporterName(newValue)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="truckId"
                label="Truck Number"
                options={listTruck}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    return newValue
                }}
            />
            <TextInput control={control} label="Start Point" fieldName="Start Point" />
            <TextInput control={control} label="Delivery Point" fieldName="deliveryPoint" />
            <TextInput control={control} label="Invoice Number" fieldName="invoiceNumber" />
            <NumberInput
                control={control}
                label="Filled Load"
                fieldName="filledLoad"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Ton</b>
                        </InputAdornment>
                    )
                }}
            />
            <DateInput control={control} fieldName="startDate" label="Start Date" />
            <DateInput control={control} fieldName="endDate" label="End Date" />
        </div>
    )
}

export default FormField
