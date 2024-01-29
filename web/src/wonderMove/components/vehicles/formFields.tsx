import SelectInput from '../../../form/SelectInput.tsx'
import TextInput from '../../../form/TextInput.tsx'
import DateInput from '../../../form/DateInput.tsx'
import { Control } from 'react-hook-form'
interface FormFieldsProps {
    control: Control
    listValues: string[]
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
            <SelectInput
                control={control}
                listValues={['Tata', 'Layland']}
                fieldName="make"
                label="Make"
            />
            <TextInput control={control} label="Number" fieldName="number" />
            <TextInput control={control} label="OwnerName" fieldName="ownerName" />
            <SelectInput control={control} listValues={['Bulker']} fieldName="type" label="Type" />
            <SelectInput
                control={control}
                listValues={['Self', 'Leased']}
                fieldName="ownershipType"
                label="Ownership"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="insuranceExpiryDate"
                label="Insurance Expiry Date"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="taxExpiryDate"
                label="Tax Expiry Date"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="npPermitDate"
                label="Np Permit Date"
            />
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="fiveYearPermitDate"
                label="Five Year Permit Date"
            />
            <DateInput control={control} format="DD/MM/YYYY" fieldName="fcDate" label="FC Date" />
        </div>
    )
}
export default FormFields
