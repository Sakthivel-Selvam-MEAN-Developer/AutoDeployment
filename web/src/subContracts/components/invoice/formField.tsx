import { ChangeEvent, Context, useContext, useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { getAllCementCompany } from '../../services/cementCompany.ts'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { cementCompanyProps, dateProps } from './generateInvoice/list.tsx'
import { filterDataProps } from './addAdvisory/addAdvisoryContext.ts'
dayjs.extend(utc)

interface FormFieldsProps {
    control: Control
    cementCompany: cementCompanyProps[]
    setCementCompany: React.Dispatch<React.SetStateAction<cementCompanyProps[]>>
    FilterData: Context<any>
}
const FormField: React.FC<FormFieldsProps> = ({
    control,
    cementCompany,
    setCementCompany,
    FilterData
}) => {
    useEffect(() => {
        getAllCementCompany().then(setCementCompany)
    }, [])
    const { setFilterData } = useContext(FilterData)
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)

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
                    label="From Date"
                    value={startDate}
                    onChange={(newValue) => {
                        const endDate = dayjs
                            .utc(dayjs((newValue as unknown as dateProps)?.$d))
                            .unix()
                        setFilterData((preData: filterDataProps) => {
                            return { ...preData, endDate }
                        })
                        setStartDate(newValue)
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
                <DatePicker
                    label="To Date"
                    value={endDate}
                    onChange={(newValue) => {
                        const startDate = dayjs
                            .utc(dayjs((newValue as unknown as dateProps)?.$d))
                            .unix()
                        setFilterData((preData: filterDataProps) => {
                            return { ...preData, startDate }
                        })
                        setEndDate(newValue)
                    }}
                />
            </LocalizationProvider>
            <AutoComplete
                control={control}
                fieldName="companyName"
                label="Select Company"
                options={cementCompany.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const company = cementCompany.find((company) => company.name === newValue)
                    setFilterData((preData: filterDataProps) => {
                        return {
                            ...preData,
                            cementCompany: { id: company?.id, name: company?.name }
                        }
                    })
                }}
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
