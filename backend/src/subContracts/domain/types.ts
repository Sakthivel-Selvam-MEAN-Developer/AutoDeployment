interface expense {
    acceptedAmount: number
    tripId: number
}
interface tripSalaryDeatails {
    id: number
    dailyBetta: number
    appPayAdvance: number
    tripBetta: number
}
interface driverTrip {
    id: number
    driverId: number
    stockTripSalaryId: number | null
    unloadingTripSalaryId: number
    tripId: number
}
export interface allTripDetails {
    expenses: expense[]
    tripSalaryDetails: tripSalaryDeatails[]
    driverTrip: driverTrip[]
}
export interface trip {
    loadingKilometer: number
    unloadingKilometer: number
    filledLoad: number
    totalFreightAmount: number
    invoiceNumber: string
    startDate: number
    truck: {
        vehicleNumber: string
        transporter: { name: string; csmName: string }
    }
    loadingPoint: { name: string }
    unloadingPoint?: { name: string } | null
    stockPoint?: { name: string } | null
    stockPointToUnloadingPointTrip?: { unloadingPoint: { name: string } }[] | null
}
export interface tripType {
    loadingKilometer?: number
    unloadingKilometer?: number
    filledLoad?: number
    totalFreightAmount?: number
    invoiceNumber?: string
    startDate?: number
    truck?: {
        vehicleNumber: string
        transporter: { name: string; csmName: string }
    }
    loadingPoint?: { name: string }
    unloadingPoint?: string
    stockPoint?: { name: string } | null
    stockPointToUnloadingPointTrip?: { unloadingPoint: { name: string } }[] | null
}
export interface allTrips {
    id: number
    loadingPointToStockPointTrip: trip | null
    loadingPointToUnloadingPointTrip: trip | null
    shortageQuantity: { unloadedDate: number; shortageAmount: number }[]
    paymentDues: { payableAmount: number }[]
}
export interface responseDetails {
    trip: {
        id: number
        vehicleNumber: string | undefined
        startDate: number | undefined
        invoiceNumber: string | undefined
        transporterName: string | undefined
        csmName: string | undefined
        loadingPoint: string | undefined
        stockPoint: string | undefined
        unloadingPoint: string | undefined
        filledLoad: number | undefined
        totalFreightAmount: number | undefined
        totalDieselAmount: number
        pandl: number
    }
    expenseAmountByTrip: number
    tripBettaByTrip: number
    totalDailyBetta: number
    totalDailyAmount: number
    totalRanKMAmount: number
    totalDieselAmount: number
    shortageAmount: number
    vehicleExpense: number
}
