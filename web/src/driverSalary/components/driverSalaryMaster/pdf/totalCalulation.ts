import { AdvanceforTrip, driverDetailProps, Trip } from '../types'
export const totalTripExpenseCalculation = (trip: Trip) => {
    let total = 0
    trip.expenses.map((expense) => (total += expense.acceptedAmount))
    return total
}
const findTrip = (overallTrip: Trip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { trip: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { trip: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
export const fuelCalculation = (fuel: { totalprice: number; quantity: number }[]) => {
    if (fuel.length === 0) return { price: 0, quantity: 0 }
    return { price: fuel[0].totalprice, quantity: fuel[0].quantity }
}
export const advanceCalculation = (advanceforTrip: AdvanceforTrip[]) => {
    let total = 0
    advanceforTrip.map(({ amount }) => (total += amount))
    return total
}

export const totalCalculation = (tripDetails: driverDetailProps) => {
    let totalAdvance = 0
    let totalExpense = 0
    let totalBetta = 0
    let totalFuel = 0
    let totalFilledLoad = 0
    let totalQuantity = 0
    let averageFilledLoad = 0
    tripDetails.trips.map((tripDetails) => {
        const { price, quantity } = fuelCalculation(tripDetails.fuel)
        totalFuel += price
        totalQuantity += quantity
        averageFilledLoad += 1
        const { trip } = findTrip(tripDetails)
        totalBetta += tripDetails.tripSalaryDetails.totalTripBetta
        totalFilledLoad += trip.filledLoad
    })
    tripDetails.expensesDetails.map(({ acceptedAmount }) => (totalExpense += acceptedAmount))
    tripDetails.advanceDetails.map((advanceDetails) =>
        advanceDetails.advanceforTrip.map(({ amount }) => (totalAdvance += amount))
    )
    return {
        totalQuantity,
        totalAdvance,
        totalExpense,
        totalBetta,
        totalFuel,
        totalFilledLoad,
        averageFilledLoad: totalFilledLoad / averageFilledLoad
    }
}
