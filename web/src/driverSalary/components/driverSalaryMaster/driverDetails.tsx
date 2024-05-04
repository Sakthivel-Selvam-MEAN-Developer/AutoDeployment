import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import DriverCardField from './card'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './style.css'
import { FC, useEffect, useState } from 'react'
import ListTripDetails from './list'
import { Autocomplete, TextField } from '@mui/material'
import { getAllDriver } from '../../services/driver'
import { getDriverTripByDriverId } from '../../services/driverTrip'
import { tripProps } from './driverTable'

interface datePickerProps {
    driverList: driverProps[]
    setDriverId: React.Dispatch<React.SetStateAction<number>>
}
interface driverDetailsProps {
    driverList: driverProps[]
    setDriverId: React.Dispatch<React.SetStateAction<number>>
    numberOfTrips: number
    numberOfExpenses: number
}
interface numberOfTripsProps {
    numberOfTrips: number
    numberOfExpenses: number
}
interface driverProps {
    id: number
    name: string
    mobileNumber: string
}
const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '20px'
}
export interface expensesProps {
    amount: number
    tripId: number
}
const DriverSalaryConatiner: FC = () => {
    const [driverList, setDriverList] = useState<never[]>([])
    const [driverId, setDriverId] = useState<number>(0)
    const [numberOfTrips, setNumberOfTrips] = useState<number>(0)
    const [numberOfExpenses, setNumberOfExpenses] = useState<number>(0)
    const [expenses, setExpenses] = useState<expensesProps[]>([{ amount: 0, tripId: 0 }])
    const [driverTrips, setDriverTrips] = useState<tripProps[]>([])
    useEffect(() => {
        getAllDriver().then(setDriverList)
    }, [])
    useEffect(() => {
        getDriverTripByDriverId(driverId).then((allTrips) => {
            setNumberOfTrips(allTrips.trips.length)
            setDriverTrips(allTrips.trips)
            setNumberOfExpenses(allTrips.expensesDetails.length)
            setExpenses(allTrips.expensesDetails)
        })
    }, [driverId])
    return (
        <>
            <DriverDetails
                driverList={driverList}
                setDriverId={setDriverId}
                numberOfTrips={numberOfTrips}
                numberOfExpenses={numberOfExpenses}
            />
            <ListTripDetails driverTrips={driverTrips} expenses={expenses} />
        </>
    )
}

export default DriverSalaryConatiner
const DriverDetails: FC<driverDetailsProps> = ({
    driverList,
    setDriverId,
    numberOfTrips,
    numberOfExpenses
}) => {
    return (
        <>
            <DatePickerField driverList={driverList} setDriverId={setDriverId} />
            <DriverCard numberOfTrips={numberOfTrips} numberOfExpenses={numberOfExpenses} />
        </>
    )
}

const DatePickerField: FC<datePickerProps> = ({ driverList, setDriverId }) => {
    return (
        <div style={style}>
            <h2>Welcome Sakthivel Selvam</h2>
            <div style={{ display: 'flex' }}>
                <AutocompleteWithDriverName driverList={driverList} setDriverId={setDriverId} />
                <DateFilterField />
            </div>
        </div>
    )
}
const DriverBetta: FC = () => {
    return (
        <>
            <DriverCardField content={'Daily Betta'} value={'\u20B9' + ' --'} />
            <DriverCardField content={'Total Salary'} value={'\u20B9' + ' --'} />
        </>
    )
}
const DriverCard: FC<numberOfTripsProps> = ({ numberOfTrips, numberOfExpenses }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} className="cards">
            <DriverCardField content={'Number of Trips Taken'} value={numberOfTrips.toString()} />
            <DriverCardField
                content={'Number of Expenses Submitted'}
                value={numberOfExpenses.toString()}
            />
            <DriverCardField content={'Number of Days Present'} value={'--'} />
            <DriverBetta />
        </div>
    )
}

interface driverNameProps {
    driverList: driverProps[]
    setDriverId: (id: number) => void
}
export const AutocompleteWithDriverName: FC<driverNameProps> = ({ driverList, setDriverId }) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={
                driverList &&
                driverList.map(({ name, mobileNumber }) => `${name} - ${mobileNumber}`)
            }
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Driver Name" />}
            onChange={(_event, newValue: string | null) => {
                const mobileNumber = newValue?.split(' - ')[1]
                setDriverId(
                    driverList.find((driver) => driver.mobileNumber === mobileNumber)?.id || 0
                )
            }}
        />
    )
}

const DateFilterField = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
            <DatePicker
                label={'Select Month & Year'}
                views={['month', 'year']}
                sx={{ marginLeft: '20px' }}
            />
        </LocalizationProvider>
    )
}
