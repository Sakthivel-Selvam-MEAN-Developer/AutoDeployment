import React, { useEffect, FC, useState } from 'react'
import { getOverallTripWithTollDetailsNotEmpty } from '../../../services/tollPlaza'
import { overallTrip, trip } from '../type'
import { alignTrips, columns, getTrip } from './tripFunctions'
import TripsDataGrid from '../dataGrid'
import { GridRowSelectionModel } from '@mui/x-data-grid/models/gridRowSelectionModel'
import ListTrips from './alignTripDetails'
export interface props {
    trip: tripProp[]
    setTrips: React.Dispatch<React.SetStateAction<tripProp[]>>
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
    dialog: boolean
    setSelTrips: React.Dispatch<React.SetStateAction<tripProp[]>>
    selTrips: tripProp[]
}
export interface tripProp {
    trip: trip
    toll: overallTrip['tollPayment']
    id: number
}
type selProps = (
    params: GridRowSelectionModel,
    setSelTrips: React.Dispatch<React.SetStateAction<tripProp[]>>,
    trip: tripProp[]
) => void
const handleSelection: selProps = (params, setSelTrips, trip) =>
    setSelTrips(trip.filter((tripDetail) => params.includes(tripDetail.id)))

const DisplayTrips: FC<props> = ({ setTrips, trip, setDialog, dialog, setSelTrips, selTrips }) => {
    const [reload, setLoad] = useState<boolean>(false)
    useEffect(() => {
        getOverallTripWithTollDetailsNotEmpty().then((overAlltripDetails) => {
            setTrips(getTrip(overAlltripDetails))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])
    return (
        <>
            {trip.length ? (
                <TripsDataGrid
                    row={alignTrips(trip)}
                    column={columns}
                    handleSelection={(params) => handleSelection(params, setSelTrips, trip)}
                />
            ) : (
                <p>No Trips to Generate Invoice ..!</p>
            )}
            <ListTrips
                trip={selTrips}
                setDialog={setDialog}
                dialog={dialog}
                setLoad={setLoad}
                reload={reload}
            />
        </>
    )
}
export default DisplayTrips
