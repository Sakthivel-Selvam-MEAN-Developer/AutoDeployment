import { ChangeEvent, FC } from 'react'
import InputWithType from '../../../../form/InputWithType'
import { bunkField } from './formFields'
import { AutoCompleteWithValue } from '../../../../form/AutoCompleteWithValue'

const AccountTypeFields: FC<bunkField> = ({ control }) => {
    return (
        <>
            <InputWithType control={control} label="IFSC" fieldName="ifsc" type="string" />
            <AccountTypeField control={control} />
            <InputWithType
                control={control}
                label="Account Branch Name"
                fieldName="accountBranchName"
                type="string"
            />
        </>
    )
}

export default AccountTypeFields
const AccountTypeField: FC<bunkField> = ({ control }) => {
    return (
        <AutoCompleteWithValue
            control={control}
            value={''}
            fieldName="accountType"
            label="Account Type"
            options={[]}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                console.log(newValue)
            }}
        />
    )
}
