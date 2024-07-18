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
        transporter: {
            name: string
            csmName: string
            employee?: {
                name: string
            }
        }
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
        transporter: {
            name: string
            csmName: string
            employee?: {
                name: string
            }
        }
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

export interface fuelProps {
    id: number
    fueledDate: number
    overallTripId: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    paymentStatus: boolean
    vehicleNumber: string
    bunkId: number
}
interface truck {
    vehicleNumber: string
    transporterId: number
    transporter: {
        id: number
        csmName: string
        name: string
        tdsPercentage: number | null
        transporterType: string
        employee?: {
            name: string
        }
    }
}
interface loadingPoint {
    id: number
    name: string
    cementCompanyId: number
    cementCompany: {
        name: string
    }
}
export interface overallTrip {
    id: number
    acknowledgementStatus: boolean
    acknowledgementApproval: boolean
    finalPayDuration: number
    transporterInvoice: string
    acknowledgementDate: number | null
    loadingPointToStockPointTripId: number | null
    stockPointToUnloadingPointTripId: number | null
    loadingPointToUnloadingPointTripId: number
    createdAt: Date
    updatedAt: Date
    fuel: []
    loadingPointToStockPointTrip: number | null
    loadingPointToUnloadingPointTrip: {
        id: number
        startDate: number
        filledLoad: number
        wantFuel: boolean
        tripStatus: boolean
        acknowledgeDueTime: number | null
        partyName: string
        lrNumber: string
        freightAmount: number
        transporterAmount: number
        totalFreightAmount: number
        totalTransporterAmount: number
        margin: number
        loadingKilometer: number
        unloadingKilometer: number
        invoiceNumber: string
        loadingPointId: number
        createdAt: Date
        updatedAt: Date
        unloadingPointId: number
        truckId: number
        billNo: null
        truck: truck
        loadingPoint: loadingPoint
    }
}
export interface props {
    truck: { vehicleNumber: string; transporter: { name: string; transporterType: string } }
    id: number
    acknowledgeDueTime: number | null
    startDate: number
    partyName: string
    lrNumber: string
    filledLoad: number
    wantFuel: boolean | null
    tripStatus: boolean
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    loadingKilometer: number
    unloadingKilometer: number
    loadingPointId: number
    invoiceNumber: string
    stockPointId: number
    truckId: number
}
export interface tripLogicTripProps {
    totalTransporterAmount: number
    wantFuel: boolean | null
}
export interface paymentDuesProps {
    id: number
    name: string
    vehicleNumber: string
    dueDate: number
    fuelId: number | null
    type: string
    status: boolean
    NEFTStatus: boolean
    payableAmount: number
    transactionId: string | null
    paidAt: number | null
    createdAt: Date
    updatedAt: Date
    overallTripId: number | null
}
export interface ppFuelProps {
    id: number
    fueledDate: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    dieselkilometer: number
    fuelType: string | null
    paymentStatus: boolean
    overallTripId: number | null
    updatedAt: Date
}
