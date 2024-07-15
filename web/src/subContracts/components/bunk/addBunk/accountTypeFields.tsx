import { ChangeEvent, FC, useEffect, useState } from 'react'
import InputWithType from '../../../../form/InputWithType'
import { AutoCompleteWithValue } from '../../../../form/AutoCompleteWithValue'
import { getAllAccountTypes } from '../../../services/accountType'
import { accType, accTypeFields, bunkFields } from './types'

const AccountTypeFields: FC<accTypeFields> = ({ control, setAccType }) => {
    const [accountType, setAccountType] = useState<accType[]>([])
    useEffect(() => {
        getAllAccountTypes().then(setAccountType)
    }, [])
    return (
        <>
            <InputWithType control={control} label="IFSC" fieldName="ifsc" type="string" />
            <AccountTypeField control={control} accTypes={accountType} setAccType={setAccType} />
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

const AccountTypeField: FC<bunkFields> = ({ control, accTypes, setAccType }) => {
    const [accountType, setAccountType] = useState<string>('')
    return (
        <AutoCompleteWithValue
            control={control}
            value={accountType}
            fieldName="accountType"
            label="Account Type"
            options={accTypes && accTypes.map((acc) => acc.accountTypeName)}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                setAccountType(newValue)
                const accType = accTypes.find((acc) => acc.accountTypeName === newValue)
                setAccType(accType ? accType.accountTypeNumber : 0)
            }}
        />
    )
}
