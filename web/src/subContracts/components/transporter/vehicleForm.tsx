import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType'
import NumberInputWithProps from '../../../form/NumberInputwithProps'
import { FC } from 'react'
interface vehicleFormProps {
    control: Control
}

const VehicleForm: FC<vehicleFormProps> = ({ control }) => {
    return (
        <>
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
                InputProps={{}}
            />
        </>
    )
}

export default VehicleForm
