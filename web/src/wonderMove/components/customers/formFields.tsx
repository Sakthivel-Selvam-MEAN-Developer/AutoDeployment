import TextInput from '../../../form/TextInput.tsx'
import BooleanInput from '../../../form/BooleanInput.tsx'
import Address from '../address/formFields.tsx'
import React from 'react'

interface FormFieldsProps {
    control: any
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
            <TextInput control={control} label="Name" fieldName="name" />
            <TextInput control={control} label="Pan" fieldName="pan" />
            <TextInput control={control} label="GST" fieldName="gst" />
            <TextInput control={control} label="IGST" fieldName="iGst" />
            <TextInput control={control} label="CGST" fieldName="cGst" />
            <BooleanInput control={control} label="GST Billing" fieldName="isGstBilling" />
            <TextInput control={control} label="TDS%" fieldName="tdsPercentage" />
            <BooleanInput control={control} label="TDS Applicable" fieldName="isTDSApplicable" />
            <Address control={control} />
        </div>
    )
}

export default FormFields
