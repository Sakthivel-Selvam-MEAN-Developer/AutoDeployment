import { FC, ReactElement, useState } from 'react'
import { tripProps } from './driverTable'
import { driverDialog, driverFormFields, driverTable } from './listBody'
import { expensesProps } from './driverDetails'

type listTripType = (
    activateDialog: boolean,
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    driverTrips: tripProps[],
    expenses: expensesProps[]
) => ReactElement
const listTripDetails: listTripType = (
    activateDialog,
    setActivateDialog,
    driverTrips,
    expenses
) => {
    return (
        <>
            {driverFormFields(setActivateDialog)}
            {driverTable(setActivateDialog, driverTrips, expenses)}
            {driverDialog(activateDialog, setActivateDialog)}
        </>
    )
}
interface listTripDetailsProps {
    driverTrips: tripProps[]
    expenses: expensesProps[]
}
const ListTripDetails: FC<listTripDetailsProps> = ({ driverTrips, expenses }) => {
    const [activateDialog, setActivateDialog] = useState(false)
    return <>{listTripDetails(activateDialog, setActivateDialog, driverTrips, expenses)}</>
}
export default ListTripDetails
