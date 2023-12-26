import { ChangeEvent, useEffect } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
// import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType.tsx'

interface FormFieldsProps {
    control: Control
}
const FuelFormFields: React.FC<FormFieldsProps> = ({ control }) => {
    // const [totalPrice, setTotalPrice] = useState<string>('')

    useEffect(() => {}, [])

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
                fieldName="bunkId"
                label="Select Bunk"
                options={['1', '2']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    console.log(newValue)
                }}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Fuel per Liter"
                fieldName="pricePerliter"
                type="number"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Fuel Quantity"
                fieldName="quantity"
                type="number"
            />
            {/* <InputWithDefaultValue
                control={control}
                label="Total Price"
                fieldName="totalprice"
                type="number"
                defaultValue={totalPrice}
                value={totalPrice}
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            /> */}
        </div>
    )
}
export default FuelFormFields
