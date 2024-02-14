import { ChangeEvent, useEffect } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { cementCompanyProps } from './list.tsx'
import { Button } from '@mui/material'

interface FormFieldsProps {
    control: Control
    setLoadingDate: React.Dispatch<React.SetStateAction<string | null>>
    loadingDate: string | null
    cementCompany: cementCompanyProps[]
    setCementCompany: React.Dispatch<React.SetStateAction<cementCompanyProps[]>>
    setCementCompanyName: React.Dispatch<React.SetStateAction<string>>
}
const FormField: React.FC<FormFieldsProps> = ({
    control,
    setLoadingDate,
    loadingDate,
    cementCompany,
    setCementCompany,
    setCementCompanyName
}) => {
    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
    }, [])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
                <DatePicker
                    label="Loading Date"
                    value={loadingDate}
                    onChange={(newValue) => setLoadingDate(newValue)}
                />
            </LocalizationProvider>
            <AutoComplete
                control={control}
                fieldName="companyName"
                label="Select Company"
                options={cementCompany.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) =>
                    setCementCompanyName(newValue)
                }
            />
            <Button
                color="secondary"
                variant="contained"
                type="submit"
                style={{ marginLeft: '10px' }}
            >
                Filter Details
            </Button>
        </div>
    )
}
export default FormField
