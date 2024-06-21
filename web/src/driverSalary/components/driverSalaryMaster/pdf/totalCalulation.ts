import { AdvanceDetail, driverDetailProps, Trip } from './types'

export const totalAdvanceCalculation = (advanceDetails: AdvanceDetail[]) => {
    let total = 0
    advanceDetails.map((trip) => {
        trip.advanceforTrip.map(({ amount }: { amount: number }) => (total += amount))
    })
    return total
}
export const totalBettaCalculation = (trip: Trip[]) => {
    let total = 0
    trip.map((tripDeatils) => (total += tripDeatils.tripSalaryDetails.totalTripBetta))
    return total
}
export const totalTripExpenseCalculation = (trip: Trip) => {
    let total = 0
    trip.expenses.map((expense) => (total += expense.acceptedAmount))
    return total
}
export const totalExpenseCalculation = (trip: driverDetailProps) => {
    let total = 0
    trip.expensesDetails.map((expense) => (total += expense.acceptedAmount))
    return total
}
export const totalFuelCalculation = (trip: Trip[]) => {
    let total = 0
    trip.map((tripDeatils) => {
        if (tripDeatils.fuel.length === 0) return
        total += tripDeatils.fuel[0].totalprice
    })
    return total
}

const findTrip = (overallTrip: Trip) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { trip: overallTrip.loadingPointToStockPointTrip, type: 'stock' }
    } else {
        return { trip: overallTrip.loadingPointToUnloadingPointTrip, type: 'direct' }
    }
}
export const totalFilledLoadCalculation = (trips: Trip[]) => {
    let total = 0
    let average = 0
    trips.map((tripDeatils) => {
        average += 1
        const { trip } = findTrip(tripDeatils)
        total += trip.filledLoad
    })
    return { totalFilledLoad: total, averageFilledLoad: total / average }
}
export const summaryCalculation = (trip: driverDetailProps) => {
    let total = 0
    trip.expensesDetails.map((expense) => (total += expense.acceptedAmount))
    return total
}
// export const demoTotalFuelCalculation = (fuel: { totalprice: number }[]) => {
//     if (fuel.length === 0) return 0
//     return fuel[0].totalprice
// }
// const totalCalculation = ({ tripDeatils }: any) => {
//     let totalAdvance = 0
//     let totalExpense = 0
//     let totalBetta = 0
//     let totalFuel = 0
//     let totalFilledLoad = 0
//     tripDeatils.trips.map((tripDetails: any) => {
//         const { trip } = findTrip(tripDetails)
//         totalFuel += demoTotalFuelCalculation(tripDetails.fuel)
//         totalBetta += tripDetails.tripSalaryDetails.totalTripBetta
//         totalFilledLoad = trip.filledLoad
//     })
// }
