import { FC } from 'react'
import InputWithType from '../../../../form/InputWithType'
import { bunkField } from './formFields'

const AccountHolderDetailFields: FC<bunkField> = ({ control }) => {
    return (
        <>
            <BunkLocationField control={control} />
            <InputWithType
                control={control}
                label="Account Number"
                fieldName="accountNumber"
                type="number"
            />
            <InputWithType
                control={control}
                label="Account Holder Name"
                fieldName="accountHolderName"
                type="string"
            />
        </>
    )
}

export default AccountHolderDetailFields

const BunkLocationField: FC<bunkField> = ({ control }) => {
    return (
        <InputWithType
            control={control}
            label="Bunk Location"
            fieldName="bunkLocation"
            type="string"
        />
    )
}
