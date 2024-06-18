export interface driverDetailProps {
    trips: Trip[]
    expensesDetails: Expense[]
    advanceDetails: AdvanceDetail[]
}

export interface AdvanceDetail {
    advanceforTrip: AdvanceforTrip[]
}

export interface Trip {
    id: number
    loadingPointToUnloadingPointTrip: LoadingPointToUnloadingPointTrip
    loadingPointToStockPointTrip?: any
    tripSalaryDeatails: TripSalaryDeatails
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

interface TripSalaryDeatails {
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
    truck: Truck
}

interface Truck {
    vehicleNumber: string
}

interface LoadingPoint {
    name: string
}
