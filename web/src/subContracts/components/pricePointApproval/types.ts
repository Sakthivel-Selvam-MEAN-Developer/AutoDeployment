export interface tripDetails {
    startDate: number
    invoiceNumber: string
    filledLoad: number
    freightAmount: number
    transporterAmount: number
    loadingPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    stockPoint: {
        name: string
    }
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
    pricePointApprovalStatus: boolean
    loadingPointToStockPointTrip: tripDetails
    loadingPointToUnloadingPointTrip: tripDetails
}
