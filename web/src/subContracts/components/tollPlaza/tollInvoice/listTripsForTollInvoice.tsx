import DisplayTrips, { tripProp } from './displayTripDetails'
import { useState } from 'react'
import TollIndex from './tollIndex'

const ListTripsForTollInvoice = () => {
    const [selectedTrips, setSelectedTrips] = useState<tripProp[]>([] as tripProp[])
    const [trips, setTrips] = useState<tripProp[]>([] as tripProp[])
    const [dialog, setDialog] = useState<boolean>(false)
    return (
        <>
            <TollIndex trips={selectedTrips} setDialog={setDialog} />
            <DisplayTrips
                setTrips={setTrips}
                trip={trips}
                setDialog={setDialog}
                dialog={dialog}
                setSelTrips={setSelectedTrips}
                selTrips={selectedTrips}
            />
        </>
    )
}
export default ListTripsForTollInvoice
