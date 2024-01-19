import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import TextInputWithPattern from '../../../form/InputWithPattern.tsx'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'

interface FormFieldsProps {
    control: Control
    companyId: React.Dispatch<React.SetStateAction<number>>
    setValue: UseFormSetValue<FieldValues>
}
const FactoryFormFields: React.FC<FormFieldsProps> = ({ control, companyId, setValue }) => {
    const [cementCompany, setCementCompany] = useState([])
    const [category, setCategory] = useState<string>('Loading Point')

    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
    }, [])
    useEffect(() => {
        setValue('name', '')
        setValue('location', '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])
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
                    const { id }: any = cementCompany.find(
                        (company: { name: string }) => company.name === newValue
                    )
                    companyId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="category"
                label="Select Category"
                options={['Loading Point', 'Stock Point', 'Unloading Point']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCategory(newValue)
                }}
            />
            <TextInputWithPattern
                control={control}
                disabled={false}
                label={`Enter ${category}`}
                fieldName="name"
                InputProps={{
                    inputProps: {
                        pattern: '[a-zA-Z0-9\\s]*',
                        title: 'Only alphabetic characters are allowed'
                    }
                }}
            />
            <TextInputWithPattern
                control={control}
                disabled={false}
                label="Enter Location"
                fieldName="location"
                InputProps={{
                    inputProps: {
                        pattern: '[a-zA-Z\\s]*',
                        title: 'Only alphabetic characters are allowed'
                    }
                }}
            />
        </div>
    )
}
export default FactoryFormFields
