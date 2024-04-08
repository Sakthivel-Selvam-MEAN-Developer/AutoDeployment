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
    return (
        <>
            {loading ? (
                <CircularLoader />
            ) : (
                <ListAllTrip allStockTrips={allStockTrips} setUpdate={setUpdate} update={update} />
            )}
        </>
    )
}
export default ListTrips
