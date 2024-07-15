import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType.tsx'
import { FieldValues } from './company.tsx'

interface FormFieldsProps {
    control: Control<FieldValues>
}
const FormFields: React.FC<FormFieldsProps> = ({ control }) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <InputWithType
                control={control}
                disabled={false}
                label="Company Name"
                fieldName="name"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Gst Number"
                fieldName="gstNo"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Email Id"
                fieldName="emailId"
                type="email"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Contact Person"
                fieldName="contactPersonName"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Contact Number"
                fieldName="contactPersonNumber"
                type="number"
            />
            <InputWithType control={control} label="Address" fieldName="address" type="string" />
        </div>
    )
}
export default FormFields
