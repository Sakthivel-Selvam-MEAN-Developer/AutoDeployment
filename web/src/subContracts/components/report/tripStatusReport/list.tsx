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
    vehicleNumber: undefined,
    invoiceNumber: undefined,
    from: undefined,
    to: undefined
}
const ListAllTrip: React.FC = (): ReactElement => {
    const [overallTrips, setOverallTrips] = useState([])
    const [count, setCount] = useState<number>(0)
    const [filterIds, dispatch] = useReducer(updateFilterProps, initialFilterData)
    return (
        <filterData.Provider value={filterIds}>
            <dispatchData.Provider value={{ dispatch }}>
                <b>Trip Status Report</b>
                <TripFilterForm setOverallTrips={setOverallTrips} setCount={setCount} />
                <ListAllDetails
                    setOverallTrips={setOverallTrips}
                    overallTrips={overallTrips}
                    count={count}
                    setCount={setCount}
                />
            </dispatchData.Provider>
        </filterData.Provider>
    )
}
export default ListAllTrip
