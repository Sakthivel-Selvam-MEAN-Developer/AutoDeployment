import { FC } from 'react'
import InputWithType from '../../../../form/InputWithType'
import { bunkField } from './formFields'

const ContactPersonDetailsFields: FC<bunkField> = ({ control }) => {
    return (
        <>
            <InputWithType
                control={control}
                label="Contact Person Name"
                fieldName="contactPersonName"
                type="string"
            />
            <InputWithType
                control={control}
                label="Contact Person Number"
                fieldName="contactPersonNumber"
                type="number"
            />
        </>
    )
}

export default ContactPersonDetailsFields
