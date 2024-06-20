import React, { useEffect, FC } from 'react'
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
    toll: overallTrip['tollPlaza']
    id: number
}
const DisplayTrips: FC<props> = ({ setTrips, trip, setDialog, dialog, setSelTrips, selTrips }) => {
    useEffect(() => {
        getOverallTripWithTollDetailsNotEmpty().then((overAlltripDetails) => {
            setTrips(getTrip(overAlltripDetails))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSelection = (params: GridRowSelectionModel) =>
        setSelTrips(trip.filter((tripDetail) => params.includes(tripDetail.id)))
    return (
        <>
            <TripsDataGrid
                row={alignTrips(trip)}
                column={columns}
                handleSelection={handleSelection}
            />
            <ListTrips trip={selTrips} setDialog={setDialog} dialog={dialog} />
        </>
    )
}
export default DisplayTrips
