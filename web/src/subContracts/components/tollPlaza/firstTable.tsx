import { epochToMinimalDate } from '../../../commonUtils/epochToTime'
import { overallTripp } from './type'
export const rows = (tollPlaza: overallTripp[]) => {
    return (
        tollPlaza &&
        tollPlaza.map((row, index) => {
            const { trip, unloadingPointName } = displayFunction(row)
            return {
                id: index + 1,
                overallTripId: row.id,
                vehicleNumber: trip.truck.vehicleNumber,
                startDate: epochToMinimalDate(trip.startDate),
                invoiceNumber: trip.invoiceNumber,
                loadingPoint: trip.loadingPoint.name,
                stockPoint: trip.stockPoint ? trip.stockPoint.name : 'null',
                unloadingPoint: unloadingPointName
            }
        })
    )
}

function displayFunction(row: overallTripp) {
    const trip = row.loadingPointToStockPointTrip || row.loadingPointToUnloadingPointTrip
    let unloadingPointName = 'null'
    if (trip.unloadingPoint) unloadingPointName = trip.unloadingPoint.name
    else if (trip.stockPointToUnloadingPointTrip && trip.stockPointToUnloadingPointTrip.length > 0)
        unloadingPointName = trip.stockPointToUnloadingPointTrip[0].unloadingPoint.name
    return { trip, unloadingPointName }
}
