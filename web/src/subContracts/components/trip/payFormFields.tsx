import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { getTruckByTransporter } from '../../services/truck.ts'
import { getTripByVehicleNumber } from '../../services/trip.ts'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import NumberInput from '../../../form/NumberInputWithValue.tsx'
import { InputAdornment } from '@mui/material'
import { Control } from 'react-hook-form'

interface FormFieldsProps {
    control: Control
    transporter: string[]
    secondPay: number
    firstPay: number
    tripId: React.Dispatch<React.SetStateAction<number>>
    data: React.Dispatch<React.SetStateAction<number>>
    setFirstPay: React.Dispatch<React.SetStateAction<number>>
    setSecondPay: React.Dispatch<React.SetStateAction<number>>
}
const PayFormFields: React.FC<FormFieldsProps> = ({
    control,
    transporter,
    tripId,
    data,
    firstPay,
    secondPay,
    setFirstPay
}) => {
    const [listTruck, setListTruck] = useState([])
    const [transporterName, setTransporterName] = useState<string>('null')
    const [truckNumber, setTruckNumber] = useState<string>('')

    useEffect(() => {
        getTruckByTransporter(transporterName).then(setListTruck)
        getTripByVehicleNumber(truckNumber).then(({ id, totalTransporterAmount }) => {
            tripId(id)
            data(totalTransporterAmount)
        })
    }, [transporterName, truckNumber])

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
                fieldName="truck"
                label="Truck Number"
                options={listTruck.map(({ vehicleNumber }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setTruckNumber(newValue)
                }}
            />
            <NumberInput
                control={control}
                label="Seventy Percentage"
                fieldName="seventypercentage"
                value={firstPay}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setFirstPay(parseInt(event.target.value))
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Remaining"
                fieldName="remaining"
                type="number"
                defaultValue={secondPay}
                value={secondPay}
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
        </div>
    )
}
export default PayFormFields
