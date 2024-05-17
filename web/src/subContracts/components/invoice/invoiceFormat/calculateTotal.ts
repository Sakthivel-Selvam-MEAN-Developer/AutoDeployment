import { InvoiceProp } from '../interface'

const calculateTotals = (trip: InvoiceProp) => {
    let totalFilledLoad = 0
    let totalAmount = 0
    let numberOfTrips = 0
    let fromDate = 0
    let endDate = 0
    let shortageQuantity = 0
    if (trip.loadingPointToStockPointTrip)
        trip.loadingPointToStockPointTrip.map((loadingToStock) => {
            fromDate =
                fromDate === 0
                    ? loadingToStock.startDate
                    : loadingToStock.startDate < fromDate
                      ? loadingToStock.startDate
                      : fromDate
            endDate =
                endDate === 0
                    ? loadingToStock.startDate
                    : loadingToStock.startDate > endDate
                      ? loadingToStock.startDate
                      : endDate
            numberOfTrips += 1
            totalAmount += loadingToStock.freightAmount * loadingToStock.filledLoad
            totalFilledLoad += loadingToStock.filledLoad
            if (loadingToStock.overallTrip[0].shortageQuantity.length > 0) {
                shortageQuantity +=
                    loadingToStock.overallTrip[0].shortageQuantity[0].shortageQuantity
            }
        })
    if (trip.loadingPointToUnloadingPointTrip)
        trip.loadingPointToUnloadingPointTrip.map((loadingToUnloading) => {
            fromDate =
                fromDate === 0
                    ? loadingToUnloading.startDate
                    : loadingToUnloading.startDate < fromDate
                      ? loadingToUnloading.startDate
                      : fromDate
            endDate =
                endDate === 0
                    ? loadingToUnloading.startDate
                    : loadingToUnloading.startDate > endDate
                      ? loadingToUnloading.startDate
                      : endDate
            numberOfTrips += 1
            totalAmount += loadingToUnloading.freightAmount * loadingToUnloading.filledLoad
            totalFilledLoad += loadingToUnloading.filledLoad
            shortageQuantity +=
                loadingToUnloading.overallTrip[0].shortageQuantity[0].shortageQuantity
        })
    if (trip.stockPointToUnloadingPointTrip)
        trip.stockPointToUnloadingPointTrip.map((stockToUnloading) => {
            fromDate =
                fromDate === 0
                    ? stockToUnloading.startDate
                    : stockToUnloading.startDate < fromDate
                      ? stockToUnloading.startDate
                      : fromDate
            endDate =
                endDate === 0
                    ? stockToUnloading.startDate
                    : stockToUnloading.startDate > endDate
                      ? stockToUnloading.startDate
                      : endDate
            numberOfTrips += 1
            totalAmount +=
                stockToUnloading.freightAmount *
                stockToUnloading.loadingPointToStockPointTrip.filledLoad
            totalFilledLoad += stockToUnloading.loadingPointToStockPointTrip.filledLoad
            shortageQuantity += stockToUnloading.overallTrip[0].shortageQuantity[0].shortageQuantity
        })
    return { totalAmount, totalFilledLoad, numberOfTrips, fromDate, endDate, shortageQuantity }
}
export default calculateTotals
