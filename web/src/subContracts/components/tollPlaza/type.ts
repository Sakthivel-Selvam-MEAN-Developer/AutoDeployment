interface trip {
    invoiceNumber: string
    loadingPoint: { name: string }
    unloadingPoint?: { name: string }
    stockPoint?: { name: string }
    startDate: number
    truck: { vehicleNumber: string }
    stockPointToUnloadingPointTrip?: {
        unloadingPoint: {
            name: string
        }
    }
}
interface tollPlaza {
    tollPlazaLocation: string
    amount: number
}
export interface overallTrip {
    loadingPointToStockPointTrip: trip
    loadingPointToUnloadingPointTrip: trip
    tollPlaza: tollPlaza[]
}
