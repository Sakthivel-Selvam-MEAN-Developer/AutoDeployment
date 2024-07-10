import { allTripProps } from '../controller/driverTrip'

interface type {
    tripStartDate: number
}
const sortTripDate = (a: type, b: type) => {
    const bandA = a.tripStartDate
    const bandB = b.tripStartDate
    if (bandA > bandB) return 1
    return -1
}
const getTripDates = (tripsByDate: allTripProps[]) => {
    let averageTripDays = 0
    tripsByDate.reduce((prev: type | number, newValue: type) => {
        if (typeof prev === 'number') return newValue
        const period = (newValue.tripStartDate - prev.tripStartDate) / 86400
        averageTripDays += period
        return newValue
    }, 0)
    return { averageTripDays }
}
export const tripDaysCalculation = (allTrips: allTripProps[]) => {
    const sortedDate = allTrips.sort(sortTripDate)
    let { averageTripDays } = getTripDates(sortedDate)
    const low = sortedDate[0].tripStartDate
    const high = sortedDate[sortedDate.length - 1].tripStartDate
    const tripDays = (high - low) / 86400
    averageTripDays = averageTripDays / sortedDate.length
    return { tripDays, averageTripDays }
}
