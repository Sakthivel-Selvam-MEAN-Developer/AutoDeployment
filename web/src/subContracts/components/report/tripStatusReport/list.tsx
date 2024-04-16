import React, { ReactElement, useReducer, useState } from 'react'
import { TripFilterForm } from './tripFilterForm'
import { filterData, dispatchData } from './tripStatusContext'
import ListAllDetails from './show'
import { updateFilterProps } from './updateFilterProps'

export const initialFilterData = {
    pageNumber: 1,
    cementCompanyId: undefined,
    loadinPointId: undefined,
    transporterId: undefined,
    from: undefined,
    to: undefined
}
const ListAllTrip: React.FC = (): ReactElement => {
    const [overallTrips, setOverallTrips] = useState([])
    const [filterIds, dispatch] = useReducer(updateFilterProps, initialFilterData)
    return (
        <>
            <filterData.Provider value={filterIds}>
                <dispatchData.Provider value={{ dispatch }}>
                    <b>Trip Status Report</b>
                    <TripFilterForm setOverallTrips={setOverallTrips} />
                    <ListAllDetails setOverallTrips={setOverallTrips} overallTrips={overallTrips} />
                </dispatchData.Provider>
            </filterData.Provider>
        </>
    )
}
export default ListAllTrip
