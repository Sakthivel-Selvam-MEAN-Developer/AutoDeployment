import { FC, ReactElement, useState } from 'react'
import { tripProps } from './driverTable'
import { driverDialog, driverFormFields, driverTable } from './listBody'
import { expensesProps } from './driverDetails'
import { driverDetailProps } from './types'

type listTripType = (
    activateDialog: boolean,
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    driverTrips: tripProps[],
    expenses: expensesProps[],
    tripDetails: driverDetailProps
) => ReactElement
const listTripDetails: listTripType = (
    activateDialog,
    setActivateDialog,
    driverTrips,
    expenses,
    tripDetails
) => {
    return (
        <>
            {driverFormFields(setActivateDialog)}
            {driverTable(driverTrips, expenses)}
            {driverDialog(activateDialog, setActivateDialog, tripDetails)}
        </>
    )
}
interface listTripDetailsProps {
    driverTrips: tripProps[]
    expenses: expensesProps[]
    tripDetails: driverDetailProps
}
const ListTripDetails: FC<listTripDetailsProps> = ({ driverTrips, expenses, tripDetails }) => {
    const [activateDialog, setActivateDialog] = useState(false)
    return (
        <>
            {listTripDetails(activateDialog, setActivateDialog, driverTrips, expenses, tripDetails)}
        </>
    )
}
export default ListTripDetails
