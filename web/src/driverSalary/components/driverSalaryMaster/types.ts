export interface driverDetailProps {
    trips: Trip[]
    driverName: string
    expensesDetails: Expense[]
    advanceDetails: AdvanceDetail[]
    totalTripBetta: number
    tripDays: number
    averageTripDays: number
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
    dieselkilometer: number
}

export interface Trip {
    id: number
    fuel: fuelProps[]
    truck: Truck
    loadingPointToUnloadingPointTrip: LoadingPointToUnloadingPointTrip
    loadingPointToStockPointTrip: LoadingPointToUnloadingPointTrip
    tripSalaryDetails: TripSalaryDetails
    mileage: number
    runKilometer: number
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
export interface FuelTableProps {
    tripDetails: driverDetailProps
}
export interface tableCellProps {
    tripDetails: Trip[]
}
export interface mileageProps {
    trip: Trip
}
