import { FC, ReactElement, useEffect, useState } from 'react'
import { getDriverTripByDriverId } from '../../services/driverTrip'
import { tripProps } from './driverTable'
import { driverDialog, driverFormFields, driverTable } from './listBody'

type listTripType = (
    driverTripDetails: tripProps[],
    activateDialog: boolean,
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => ReactElement
const listTripDetails: listTripType = (driverTripDetails, activateDialog, setActivateDialog) => {
    return (
        <>
            {driverFormFields(setActivateDialog)}
            {driverTable(driverTripDetails, setActivateDialog)}
            {driverDialog(activateDialog, setActivateDialog)}
        </>
    )
}
const List_Trip_Details: FC = () => {
    const [activateDialog, setActivateDialog] = useState(false)
    const [driverTripDetails, setDriverTripDetails] = useState([])
    useEffect(() => {
        getDriverTripByDriverId(1).then(setDriverTripDetails) //should change 1 to driverId
    }, [])
    return <>{listTripDetails(driverTripDetails, activateDialog, setActivateDialog)}</>
}
export default List_Trip_Details
