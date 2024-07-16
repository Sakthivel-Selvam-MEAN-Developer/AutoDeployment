import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType.tsx'
import { Autocomplete, FormControlLabel, Switch, TextField } from '@mui/material'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'
import { ChangeEvent } from 'react'
import DateInput from '../../../form/DateInput.tsx'

export interface accountTypeProps {
    id: number
    accountTypeNumber: number
    accountTypeName: string
}
export interface FormFieldsProps {
    control: Control
    login: boolean
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
    accountTypes: accountTypeProps[]
    setAccountTypeNumber: React.Dispatch<React.SetStateAction<number | string | undefined>>
    setAccountType: React.Dispatch<React.SetStateAction<string | undefined>>
    setDepartmentType: React.Dispatch<React.SetStateAction<string>>
    setDesignationType: React.Dispatch<React.SetStateAction<string>>
    designationType: string
    departmentType: string
    accountTypeName: string | undefined
}
const FormFields: React.FC<FormFieldsProps> = ({
    control,
    login,
    setLogin,
    departmentType,
    setDepartmentType,
    designationType,
    setDesignationType,
    accountTypes,
    setAccountTypeNumber,
    setAccountType,
    accountTypeName
}) => {
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
                label="Employee Name"
                fieldName="name"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Email Id"
                fieldName="mailId"
                type="email"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Contact Number"
                fieldName="contactNumber"
                type="number"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Employee Code"
                fieldName="corporateId"
                type="string"
            />
            <AutoCompleteWithValue
                control={control}
                value={departmentType}
                fieldName="department"
                label="Department"
                options={['Support', 'Sales']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setDepartmentType(newValue)
                }}
            />
            <AutoCompleteWithValue
                control={control}
                value={designationType}
                fieldName="designation"
                label="Designation"
                options={['CSM', 'ASM']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setDesignationType(newValue)
                }}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Address"
                fieldName="address"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Aadhaar Number"
                fieldName="aadharNumber"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Pan Number"
                fieldName="panNumber"
                type="string"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="joiningDate"
                label="Date Of Joining"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="dateOfBirth"
                label="Date Of Birth"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Blood Group"
                fieldName="bloodGroup"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Account Name"
                fieldName="accountName"
                type="string"
            />

            <InputWithType
                control={control}
                disabled={false}
                label="Account Number"
                fieldName="accountNumber"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="IFSC Code"
                fieldName="ifscCode"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Branch"
                fieldName="branch"
                type="string"
            />
            <Autocomplete
                sx={{ width: 200 }}
                value={accountTypeName}
                options={accountTypes ? accountTypes.map((option) => option.accountTypeName) : []}
                onChange={(_event, value) => {
                    const { accountTypeNumber } = accountTypes.find(
                        ({ accountTypeName }) => accountTypeName === value
                    ) || { accountTypeNumber: '' }
                    setAccountTypeNumber(accountTypeNumber)
                    setAccountType(value || '')
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={'Account Type'}
                        InputLabelProps={{ shrink: true }}
                    />
                )}
            />

            <FormControlLabel
                control={<Switch checked={login} onChange={() => setLogin(!login)} />}
                label={login ? 'Login Required' : 'Login Not Required'}
            />
        </div>
    )
}
export default FormFields
