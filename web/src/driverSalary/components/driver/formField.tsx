import { Control } from 'react-hook-form'
import MultiLineInput from '../../../form/MultiLineInput'
import InputWithType from '../../../form/InputWithType'
import DateInput from '../../../form/DateInput'

export interface FormFieldsProps {
    control: Control
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
                label="Name"
                fieldName="name"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Father Name"
                fieldName="fatherName"
                type="string"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                label="Date of Birth"
                fieldName="dateofBirth"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Aadhar Number"
                fieldName="aadharNumber"
                type="number"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="PAN Number"
                fieldName="panNumber"
                type="string"
            />
            <MultiLineInput
                control={control}
                label="Address"
                fieldName="address"
                type="string"
                rows={1}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Mobile Number"
                fieldName="mobileNumber"
                type="number"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Driver License"
                fieldName="driverLicense"
                type="string"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                label="License Expriry Date"
                fieldName="licenseExpriryDate"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Bank Name"
                fieldName="bankName"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Account Number"
                fieldName="accountNumber"
                type="number"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Account Branch"
                fieldName="accountBranch"
                type="string"
            />
            <InputWithType
                control={control}
                disabled={false}
                label="IFCS Code"
                fieldName="ifcsCode"
                type="string"
            />
        </div>
    )
}
export default FormFields
