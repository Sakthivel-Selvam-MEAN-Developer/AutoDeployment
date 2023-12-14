import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { getTripByTruckNumber } from '../../services/trip.ts'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import NumberInput from '../../../form/NumberInputWithValue.tsx'
import { InputAdornment } from '@mui/material'
import { Control } from 'react-hook-form'

interface FormFieldsProps {
    control: Control
    secondPay: number
    firstPay: number
    trip: any[]
    tripId: React.Dispatch<React.SetStateAction<number>>
    data: React.Dispatch<React.SetStateAction<number>>
    setFirstPay: React.Dispatch<React.SetStateAction<number>>
    setSecondPay: React.Dispatch<React.SetStateAction<number>>
}
const PayFormFields: React.FC<FormFieldsProps> = ({
    control,
    tripId,
    data,
    trip,
    firstPay,
    secondPay,
    setFirstPay
}) => {
    const [transporter, setTransporter] = useState([])
    const [truckNumber, setTruckNumber] = useState<string>('')

    useEffect(() => {
        getTripByTruckNumber(truckNumber).then(
            ({
                id,
                totalTransporterAmount,
                truck: {
                    transporter: { name }
                }
            }) => {
                setTransporter(name)
                tripId(id)
                data(totalTransporterAmount)
            }
        )
    }, [truckNumber])

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
                fieldName="truck"
                label="Truck Number"
                options={trip.map(({ truck: { vehicleNumber } }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setTruckNumber(newValue)
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Transporter"
                fieldName="transporterName"
                type="string"
                defaultValue={transporter}
                value={transporter}
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
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
