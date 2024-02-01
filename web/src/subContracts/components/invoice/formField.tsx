import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { Control } from 'react-hook-form'
import { getAllCementCompany } from '../../services/cementCompany.ts'

interface FormFieldsProps {
    control: Control
}
const FormField: React.FC<FormFieldsProps> = ({ control }) => {
    const [cementCompany, setCementCompany] = useState([])
    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
    }, [])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutoComplete
                control={control}
                fieldName="companyName"
                label="Select Company"
                options={cementCompany.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id } = cementCompany.find(
                        (company: { name: string }) => company.name === newValue
                    ) || { id: 0 }
                    // companyId(id)
                    console.log(id)
                }}
            />
        </div>
    )
}
export default FormField
