import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import Driver_Card from './card'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './style.css'
import { FC } from 'react'
import List_Trip_Details from './list'

const Driver_Salary: FC = () => {
    return (
        <>
            {driver_Details()}
            <List_Trip_Details />
        </>
    )
}

export default Driver_Salary

export const driver_Details = () => {
    return (
        <>
            {datePicker()}
            {driverCard()}
        </>
    )
}

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '20px'
}
const datePicker = () => {
    return (
        <div style={style}>
            <h2>Welcome Sakthivel Selvam</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
                <DatePicker label={'Select Month & Year'} views={['month', 'year']} />
            </LocalizationProvider>
        </div>
    )
}

const driverCard = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} className="cards">
            <Driver_Card content={'Number of Trips Taken'} value={'12'} />
            <Driver_Card content={'Number of Expenses Submitted'} value={'25'} />
            <Driver_Card content={'Number of Days Present'} value={'23'} />
            <Driver_Card content={'Daily Betta'} value={'\u20B9' + ' 250'} />
            <Driver_Card content={'Total Salary'} value={'\u20B9' + ' 23000'} />
        </div>
    )
}
