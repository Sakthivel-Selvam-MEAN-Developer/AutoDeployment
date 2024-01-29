import { Control, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'

// import en from 'dayjs/locale/en-in'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface DateInputProps {
    control: Control
    label: string
    fieldName: string
    format: string
}
const DateInput: React.FC<DateInputProps> = ({ control, label, fieldName, format }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <Controller
                render={({ field }) => <DatePicker {...field} label={label} format={format} />}
                name={fieldName}
                control={control}
            />
        </LocalizationProvider>
    )
}

export default DateInput
