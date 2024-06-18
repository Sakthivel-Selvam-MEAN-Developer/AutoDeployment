import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import TripsDataGrid from '../dataGrid'
import './tollFormat.css'
import { overallTrip, trip } from '../type'

interface props {
    trip: { trip: trip; toll: overallTrip['tollPlaza'] }[]
}
const columns = [
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 300, flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 200, flex: 1 },
    {
        field: 'startDate',
        headerName: 'Date',
        width: 200,
        flex: 1,
        valueFormatter: (value: number) => epochToMinimalDate(value)
    },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 200, flex: 1 },
    { field: 'stockPoint', headerName: 'Stock Point', width: 150, flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 150, flex: 1 },
    { field: 'totalTollAmount', headerName: 'Total Toll Amount', width: 150, flex: 1 }
]
const alignTrips = (trips: props['trip']) => {
    return trips.map((trip, index) => {
        return {
            id: index + 1,
            vehicleNumber: trip.trip.truck.vehicleNumber,
            invoiceNumber: trip.trip.invoiceNumber,
            loadingPoint: trip.trip.loadingPoint.name,
            unloadingPoint: trip.trip.stockPointToUnloadingPointTrip
                ? trip.trip.stockPointToUnloadingPointTrip[0].unloadingPoint.name
                : trip.trip.unloadingPoint?.name,
            stockPoint: trip.trip.stockPoint ? trip.trip.stockPoint.name : 'Null',
            startDate: trip.trip.startDate,
            totalTollAmount: trip.toll.reduce((acc, toll) => acc + toll.amount, 0)
        }
    })
}
const AlignTripDetails: React.FC<props> = ({ trip }) => {
    return <TripsDataGrid row={alignTrips(trip)} column={columns} />
}
export default AlignTripDetails
