import { Control } from 'react-hook-form'
import TextInput from '../../../form/TextInput.tsx'
export interface FormFieldsProps {
    control: Control
}

const fieldNames = [
    { label: 'Line 1', fieldName: 'line1' },
    { label: 'Line 2', fieldName: 'line2' },
    { label: 'Line 3', fieldName: 'line3' },
    { label: 'City', fieldName: 'city' },
    { label: 'State', fieldName: 'state' },
    { label: 'Pin Code', fieldName: 'pincode' }
]

const Address: React.FC<FormFieldsProps> = ({ control }) => {
    return (
        <div>
            <div style={{ margin: '10px' }}> Address </div>
            {textInput(control)}
        </div>
    )
}
export default Address
function textInput(control: Control) {
    return (
        <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
            {fieldNames.map((name) => (
                <TextInput
                    key={name.label}
                    control={control}
                    label={name.label}
                    fieldName={name.fieldName}
                />
            ))}
        </div>
    )
}
