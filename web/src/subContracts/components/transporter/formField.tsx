import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType.tsx'
import MultiLineInput from '../../../form/MultiLineInput.tsx'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'
import { ChangeEvent } from 'react'
export interface accountTypeProps {
    id: number
    accountTypeNumber: number
    accountTypeName: string
}
export interface FormFieldsProps {
    control: Control
    gst: boolean
    setGst: React.Dispatch<React.SetStateAction<boolean>>
    tds: boolean
    setTds: React.Dispatch<React.SetStateAction<boolean>>
    accountTypes: accountTypeProps[]
    setAccountTypeNumber: React.Dispatch<React.SetStateAction<number | undefined>>
    setAccountType: React.Dispatch<React.SetStateAction<string | null>>
    setTransporterType: React.Dispatch<React.SetStateAction<string>>
    transporterType: string
    accountType: string | null
}
const FormFields: React.FC<FormFieldsProps> = ({
    control,
    gst,
    tds,
    setGst,
    setTds,
    accountTypes,
    setAccountTypeNumber,
    setAccountType,
    accountType,
    setTransporterType,
    transporterType
}) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
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
                label="Transporter Name"
                fieldName="name"
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
            <InputWithType
                control={control}
                disabled={false}
                label="Account Holder Name"
                fieldName="accountHolder"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Account Number"
                fieldName="accountNumber"
                type="number"
            />
            <AutoCompleteWithValue
                control={control}
                value={transporterType}
                fieldName="transporterType"
                label="Transporter Type"
                options={['Own Truck', 'Market Transporter']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setTransporterType(newValue)
                }}
            />
            <Autocomplete
                sx={{ width: 200 }}
                value={accountType}
                options={accountTypes.map((option) => option.accountTypeName)}
                onChange={(_event, value) => {
                    const { accountTypeNumber } = accountTypes.find(
                        ({ accountTypeName }) => accountTypeName === value
                    ) || { accountTypeNumber: 0 }
                    setAccountTypeNumber(accountTypeNumber)
                    setAccountType(value)
                }}
                renderInput={(params) => <TextField {...params} label={'Account Type'} />}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="IFSC code"
                fieldName="ifsc"
                type="string"
            />
            <MultiLineInput
                control={control}
                label="Transporter Address"
                fieldName="address"
                type="string"
                rows={1}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="CSM Name"
                fieldName="csmName"
                type="string"
            />
            <div style={{ display: 'flex' }}>
                <Checkbox onClick={() => setGst(!gst)} {...label} checked={!gst} />
                <InputWithType
                    control={control}
                    disabled={gst}
                    label="GST Number"
                    fieldName="gstNumber"
                    type="string"
                />
            </div>
            <InputWithType
                control={control}
                disabled={gst}
                label="GST Percentage"
                fieldName="gstPercentage"
                type="number"
            />
            <div style={{ display: 'flex' }}>
                <Checkbox onClick={() => setTds(!tds)} {...label} checked={!tds} />
                <InputWithType
                    control={control}
                    disabled={tds}
                    label="TDS Percentage"
                    fieldName="tdsPercentage"
                    type="number"
                />
            </div>
        </div>
    )
}
export default FormFields
