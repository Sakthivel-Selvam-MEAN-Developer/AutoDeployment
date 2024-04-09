import { Control, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'

// import en from 'dayjs/locale/en-in'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ReactElement } from 'react'

interface DateInputProps {
    control: Control
    label: string
    fieldName: string
    format: string
}
type controlType = (
    control: Control,
    label: string,
    fieldName: string,
    format: string
) => ReactElement
const controller: controlType = (control, label, fieldName, format) => {
    return (
        <Controller
            render={({ field }) => <DatePicker {...field} label={label} format={format} />}
            name={fieldName}
            control={control}
        />
    )
}
const DateInput: React.FC<DateInputProps> = ({ control, label, fieldName, format }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            {controller(control, label, fieldName, format)}
        </LocalizationProvider>
    )
}

export default DateInput
