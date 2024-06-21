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
import { driverDetailProps } from './pdf/types'
import { PdfConatiner } from './pdf/pdfConatainer'

interface props {
    driverList: driverProps[]
    setDriverId: React.Dispatch<React.SetStateAction<number>>
    driverName: string | null
    setDriverName: React.Dispatch<React.SetStateAction<string | null>>
}
interface driverDetailsProps {
    driverList: driverProps[]
    setDriverId: React.Dispatch<React.SetStateAction<number>>
    numberOfTrips: number
    numberOfExpenses: number
    dailyBetta: number
}
interface numberOfTripsProps {
    numberOfTrips: number
    numberOfExpenses: number
    dailyBetta: number
}
interface driverProps {
    id: number
    name: string
    mobileNumber: string
}
export interface tripSalaryProps {
    dailyBetta: number
    totalAdvance: number
    totalTripBetta: number
    totalTripSalary: number
}
const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '20px'
}
export interface expensesProps {
    acceptedAmount: number
    tripId: number
}
const DriverSalaryConatiner: FC = () => {
    const [driverList, setDriverList] = useState<never[]>([])
    const [driverId, setDriverId] = useState<number>(0)
    const [numberOfTrips, setNumberOfTrips] = useState<number>(0)
    const [numberOfExpenses, setNumberOfExpenses] = useState<number>(0)
    const [expenses, setExpenses] = useState<expensesProps[]>([{ acceptedAmount: 0, tripId: 0 }])
    const [driverTrips, setDriverTrips] = useState<tripProps[]>([])
    const [dailyBetta, setDailyBetta] = useState<number>(0)
    const [tripDetails, setTripDetails] = useState<driverDetailProps>({} as driverDetailProps)
    useEffect(() => {
        getAllDriver().then(setDriverList)
    }, [])
    useEffect(() => {
        getDriverTripByDriverId(driverId).then((allTrips) => {
            setNumberOfTrips(allTrips.trips.length)
            setDriverTrips(allTrips.trips)
            setNumberOfExpenses(allTrips.expensesDetails.length)
            setExpenses(allTrips.expensesDetails)
            setDailyBetta(allTrips.trips[0].tripSalaryDetails?.dailyBetta)
            setTripDetails(allTrips)
        })
    }, [driverId])
    return (
        <>
            <DriverDetails
                driverList={driverList}
                setDriverId={setDriverId}
                numberOfTrips={numberOfTrips}
                numberOfExpenses={numberOfExpenses}
                dailyBetta={dailyBetta}
            />
            <ListTripDetails driverTrips={driverTrips} expenses={expenses} />
            <br />
            {tripDetails.trips !== undefined && <PdfConatiner tripDetails={tripDetails} />}
        </>
    )
}

export default DriverSalaryConatiner
const DriverDetails: FC<driverDetailsProps> = ({
    driverList,
    setDriverId,
    numberOfTrips,
    numberOfExpenses,
    dailyBetta
}) => {
    const [driverName, setDriverName] = useState<string | null>(null)
    return (
        <>
            <DatePickerField
                driverList={driverList}
                setDriverId={setDriverId}
                setDriverName={setDriverName}
                driverName={driverName}
            />
            <DriverCard
                numberOfTrips={numberOfTrips}
                numberOfExpenses={numberOfExpenses}
                dailyBetta={dailyBetta}
            />
        </>
    )
}

const DatePickerField: FC<props> = ({ driverList, setDriverId, setDriverName, driverName }) => {
    return (
        <div style={style}>
            <h2>Welcome Sakthivel Selvam</h2>
            <div style={{ display: 'flex' }}>
                <AutocompleteWithDriverName
                    driverList={driverList}
                    setDriverId={setDriverId}
                    driverName={driverName}
                    setDriverName={setDriverName}
                />
                <DateFilterField />
            </div>
        </div>
    )
}
const DriverBetta: FC<{ dailyBetta: number }> = ({ dailyBetta }) => {
    return (
        <>
            <DriverCardField content={'Daily Betta'} value={'\u20B9' + ` ${dailyBetta}`} />
            <DriverCardField content={'Total Salary'} value={'\u20B9' + ' --'} />
        </>
    )
}
const DriverCard: FC<numberOfTripsProps> = ({ numberOfTrips, numberOfExpenses, dailyBetta }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} className="cards">
            <DriverCardField content={'Number of Trips Taken'} value={numberOfTrips.toString()} />
            <DriverCardField
                content={'Number of Expenses Submitted'}
                value={numberOfExpenses.toString()}
            />
            <DriverCardField content={'Number of Days Present'} value={'--'} />
            <DriverBetta dailyBetta={dailyBetta} />
        </div>
    )
}

interface driverNameProps {
    driverList: driverProps[]
    setDriverId: (id: number) => void
    driverName: string | null
    setDriverName: React.Dispatch<React.SetStateAction<string | null>>
}
export const AutocompleteWithDriverName: FC<driverNameProps> = ({
    driverList,
    setDriverId,
    driverName,
    setDriverName
}) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={driverName}
            options={
                driverList &&
                driverList.map(({ name, mobileNumber }) => `${name} - ${mobileNumber}`)
            }
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Select Driver Name" name="driverId" />
            )}
            onChange={(_event, newValue: string | null) => {
                const mobileNumber = newValue?.split(' - ')[1]
                setDriverId(
                    driverList.find((driver) => driver.mobileNumber === mobileNumber)?.id || 0
                )
                setDriverName(newValue)
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
