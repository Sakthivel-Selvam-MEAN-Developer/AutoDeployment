import { Controller } from 'react-hook-form'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'

// import en from 'dayjs/locale/en-in'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface DateInputProps {
    control: any
    label: string
    fieldName: string
}
const DateInput: React.FC<DateInputProps> = ({ control, label, fieldName }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <Controller
                render={({ field }) => <DateField {...field} label={label} />}
                name={fieldName}
                control={control}
            />
        </LocalizationProvider>
    )
}

export default DateInput
