import { Control } from 'react-hook-form'
import InputWithType from '../../../form/InputWithType.tsx'
import MultiLineInput from '../../../form/MultiLineInput.tsx'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
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
}
const FormFields: React.FC<FormFieldsProps> = ({
    control,
    gst,
    tds,
    setGst,
    setTds,
    accountTypes,
    setAccountTypeNumber
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
            <Autocomplete
                sx={{ width: 200 }}
                options={accountTypes.map((option) => option.accountTypeName)}
                onChange={(_event, value) => {
                    const { accountTypeNumber } = accountTypes.find(
                        ({ accountTypeName }) => accountTypeName === value
                    ) || { accountTypeNumber: 0 }
                    setAccountTypeNumber(accountTypeNumber)
                    console.log(accountTypeNumber)
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
            <div>
                <Checkbox onClick={() => setGst(!gst)} {...label} />
                <InputWithType
                    control={control}
                    disabled={gst}
                    label="Gst Number"
                    fieldName="gstNumber"
                    type="string"
                />
            </div>
            <div>
                <Checkbox onClick={() => setTds(!tds)} {...label} />
                <InputWithType
                    control={control}
                    disabled={tds}
                    label="Tds Percentage"
                    fieldName="tdsPercentage"
                    type="number"
                />
            </div>
        </div>
    )
}
export default FormFields
