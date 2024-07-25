export interface totalProps {
    totalAmount: number
    totalFilledLoad: number
    numberOfTrips: number
    fromDate: number
    endDate: number
    shortageQuantity: number
}
export interface LoadingTripProps {
    startDate: number
    partyName: string
    lrNumber: string
    billingRate: number | null
    unloadingPoint?: {
        name: string
    }
    stockPoint?: {
        name: string
    }
    loadingPoint: {
        name: string
        cementCompany: {
            quantityType: string | null
            primaryBill: { address: string; gstNumber: string; panNumber: string | null } | null
        }
    }
    overallTrip: {
        truck: {
            vehicleNumber: string
        } | null
        shortageQuantity: {
            unloadedQuantity: number
            shortageQuantity: number
        }[]
    }[]
    freightAmount: number
    filledLoad: number
    invoiceNumber: string
}
export interface StockToUnloadingPointProps {
    startDate: number
    billingRate: number | null
    partyName: string
    lrNumber: string
    unloadingPoint: {
        name: string
        cementCompany: {
            name: string
            secondaryBill: { address: string; gstNumber: string; panNumber: string | null } | null
        }
    }
    freightAmount: number
    loadingPointToStockPointTrip: {
        filledLoad: number
        stockPoint: {
            cementCompany: {
                quantityType: string | null
            }
            name: string
        }
    }
    invoiceNumber: string
    overallTrip: {
        shortageQuantity: {
            unloadedQuantity: number
            shortageQuantity: number
        }[]
        truck: {
            vehicleNumber: string
        } | null
    }[]
}
export interface InvoiceProp {
    trips: {
        loadingPointToUnloadingPointTrip: LoadingTripProps[]
        stockPointToUnloadingPointTrip: StockToUnloadingPointProps[]
        loadingPointToStockPointTrip: LoadingTripProps[]
    }
}
export interface AnnexureProps {
    trip: InvoiceProp['trips']
    bill: { billNo: string; date: number }
    total: totalProps
    depot?: string
}
