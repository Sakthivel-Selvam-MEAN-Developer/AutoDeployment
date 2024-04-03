import { FC, useEffect, useState } from 'react'
import Driver_FormFields from './formFields'
import Driver_Table from './driverTable'
import Driver_Dialog_For_All_Details from './downloadAllDetailsDialog'
import { getDriverTripByDriverId } from '../../services/driverTrip'

const List_Trip_Details: FC = () => {
    const [activateDialog, setActivateDialog] = useState(false)
    const [driverTripDetails, setDriverTripDetails] = useState([])
    useEffect(() => {
        //should change 1 to driverId
        getDriverTripByDriverId(1).then(setDriverTripDetails)
    }, [])
    return (
        <>
            <Driver_FormFields setActivateDialog={setActivateDialog} />
            <Driver_Table
                driverTripDetails={driverTripDetails}
                setActivateDialog={setActivateDialog}
            />
            {activateDialog && (
                <Driver_Dialog_For_All_Details setActivateDialog={setActivateDialog} />
            )}
        </>
    )
}

export default List_Trip_Details
