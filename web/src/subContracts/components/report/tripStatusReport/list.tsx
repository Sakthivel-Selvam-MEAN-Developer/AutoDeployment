import React, { ReactElement, useEffect, useReducer, useState } from 'react'
import { tripStatusFilter } from '../../../services/overallTrips'
import { TripFilterForm } from './tripFilterForm'
import { filterData, dispatchData } from './tripStatusContext'
import ListAllDetails from './show'
import { updateFilterProps } from './updateFilterProps'

export type dispatchType =
    | { type: string; cementCompanyId: number }
    | { type: string; transporterId: number }
    | { type: string; loadinPointId: number }
    | { type: string; from: number; to: number }

const initialTasks = {
    pageNumber: 1,
    cementCompanyId: undefined,
    loadinPointId: undefined,
    transporterId: undefined,
    from: undefined,
    to: undefined
}
const ListAllTrip: React.FC = (): ReactElement => {
    const [overallTrips, setOverallTrips] = useState([])
    const [filterIds, dispatch] = useReducer(updateFilterProps, initialTasks)
    useEffect(() => {
        tripStatusFilter(filterIds).then(setOverallTrips)
    }, [filterIds])
    return (
        <>
            <filterData.Provider value={filterIds}>
                <dispatchData.Provider value={{ dispatch }}>
                    <b>Trip Status Report</b>
                    <br />
                    <TripFilterForm />
                    <ListAllDetails listoverallTrip={overallTrips} />
                </dispatchData.Provider>
            </filterData.Provider>
        </>
    )
}
export default ListAllTrip
