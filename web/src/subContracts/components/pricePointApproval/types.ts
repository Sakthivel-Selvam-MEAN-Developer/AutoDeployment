/* eslint-disable max-lines */
export interface tripDetails {
    startDate: number
    invoiceNumber: string
    filledLoad: number
    freightAmount: number
    transporterAmount: number
    loadingPointId: number
    unloadingPointId: number
    stockPointId: number
    loadingPoint: { name: string }
    unloadingPoint: { name: string }
    stockPoint: { name: string }
    truck: {
        transporter: {
            name: string
            csmName: string
        }
        vehicleNumber: string
    }
}
export interface overallTrip {
    id: number
    truck: {
        transporter: {
            name: string
            csmName: string
        }
        vehicleNumber: string
    }
    loadingPointToStockPointTrip: tripDetails
    loadingPointToUnloadingPointTrip: tripDetails
}
