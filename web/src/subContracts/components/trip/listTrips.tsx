import { CircularLoader } from '../cementCompany/companyReport/companyReportShow'
import ListAllTrip from './show'
import { FC } from 'react'

interface listTripsProps {
    allStockTrips: never[]
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
    loading: boolean
}

const ListTrips: FC<listTripsProps> = ({ allStockTrips, setUpdate, update, loading }) => {
    return <>{loading ? <CircularLoader /> : callListAllTrips(allStockTrips, setUpdate, update)}</>
}
export default ListTrips

const callListAllTrips = (
    allStockTrips: never[],
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    update: boolean
) => {
    return <ListAllTrip allStockTrips={allStockTrips} setUpdate={setUpdate} update={update} />
}
