import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType.tsx'
import { FieldValues } from './company.tsx'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { ChangeEvent } from 'react'

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
            <AutoComplete
                control={control}
                fieldName="quantityType"
                label="Billing Quantity Type"
                options={['Loading Quantity', 'Unloading Quantity']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string | null) => {
                    if (newValue) {
                        // setFuelType(newValue)
                    }
                }}
            />
        </div>
    )
}
export default FormFields
