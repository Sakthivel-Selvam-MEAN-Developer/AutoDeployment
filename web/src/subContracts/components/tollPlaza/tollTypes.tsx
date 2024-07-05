import { trip } from './type'
export interface overallTripp {
    id: number
    truck: { vehicleNumber: string }
    loadingPointToStockPointTrip: trip
    loadingPointToUnloadingPointTrip: trip
    stockPointToUnloadingPointTrip: trip
    tollPayment: {
        id: number
        tollPlazaLocation: { id: number; location: string }
        amount: number
    }[]
}
