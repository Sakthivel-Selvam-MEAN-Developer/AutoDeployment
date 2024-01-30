import AutoComplete from '../../../form/AutoComplete.tsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { getAllTransporter } from '../../services/transporter.ts'
import InputWithType from '../../../form/InputWithType.tsx'
import NumberInputWithProps from '../../../form/NumberInputwithProps.tsx'
interface FormFieldProps {
    control: Control
    setTransporterId: React.Dispatch<React.SetStateAction<number>>
}
const VehicleFormField: React.FC<FormFieldProps> = ({ control, setTransporterId }) => {
    const [transporter, setTransporter] = useState([])
    useEffect(() => {
        getAllTransporter().then(setTransporter)
    }, [])
    return (
        <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
            <AutoComplete
                control={control}
                fieldName="transporterName"
                label="Transporter"
                options={transporter.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = transporter.find(({ name }) => name === newValue) || { id: 0 }
                    setTransporterId(id)
                }}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Vehicle Number"
                fieldName="vehicleNumber"
                type="string"
            />
            <NumberInputWithProps
                control={control}
                label="Capacity"
                fieldName="capacity"
                type="number"
                inputProps={{ step: 'any', min: '0' }}
                InputProps={''}
            />
        </div>
    )
}

export default VehicleFormField
