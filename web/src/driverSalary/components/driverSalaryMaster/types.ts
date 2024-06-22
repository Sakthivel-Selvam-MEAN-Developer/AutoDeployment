export interface driverDetailProps {
    trips: Trip[]
    driverName: string
    expensesDetails: Expense[]
    advanceDetails: AdvanceDetail[]
}

export interface AdvanceDetail {
    advanceforTrip: AdvanceforTrip[]
}
interface fuelProps {
    totalprice: number
    quantity: number
    fueledDate: number
    invoiceNumber: string
    bunk: {
        bunkName: string
    }
}

export interface Trip {
    id: number
    fuel: fuelProps[]
    loadingPointToUnloadingPointTrip: LoadingPointToUnloadingPointTrip
    loadingPointToStockPointTrip: LoadingPointToUnloadingPointTrip
    tripSalaryDetails: TripSalaryDetails
    expenses: Expense[]
    advanceforTrip: AdvanceforTrip[]
}

export interface AdvanceforTrip {
    amount: number
    advanceDate: number
}

interface Expense {
    expenseType: string
    acceptedAmount: number
    tripId: number
}

export interface TripSalaryDetails {
    totalTripBetta: number
    totalAdvance: number
    dailyBetta: number
    totalTripSalary: number
}

interface LoadingPointToUnloadingPointTrip {
    id: number
    loadingPoint: LoadingPoint
    invoiceNumber: string
    startDate: number
    unloadingPoint: LoadingPoint
    stockPoint: LoadingPoint
    truck: Truck
    filledLoad: number
}

interface Truck {
    vehicleNumber: string
}

interface LoadingPoint {
    name: string
    cementCompany: {
        name: string
    }
}
