import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { overallTrip } from '../type'
import { tripProp } from './displayTripDetails'
export const alignTrips = (trips: tripProp[]) => {
    return trips.map((trip) => {
        return {
            id: trip.id,
            vehicleNumber: trip.trip.truck.vehicleNumber,
            invoiceNumber: trip.trip.invoiceNumber,
            loadingPoint: trip.trip.loadingPoint.name,
            unloadingPoint: getName(trip),
            stockPoint: trip.trip.stockPoint ? trip.trip.stockPoint.name : 'Null',
            startDate: trip.trip.startDate,
            totalTollAmount: trip.toll.reduce((acc, toll) => acc + toll.amount, 0)
        }
    })
}
export const getTrip = (overallTrip: overallTrip[]) => {
    return overallTrip.map((trip) => {
        if (trip.loadingPointToUnloadingPointTrip)
            return {
                trip: trip.loadingPointToUnloadingPointTrip,
                toll: trip.tollPlaza,
                id: trip.id
            }
        else return { trip: trip.loadingPointToStockPointTrip, toll: trip.tollPlaza, id: trip.id }
    })
}
export const columns = [
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
const getName = (trip: tripProp) =>
    trip.trip.stockPointToUnloadingPointTrip
        ? trip.trip.stockPointToUnloadingPointTrip[0].unloadingPoint.name
        : trip.trip.unloadingPoint?.name
