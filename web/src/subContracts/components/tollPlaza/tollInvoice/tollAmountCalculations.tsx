import { useState, useEffect } from 'react'
import { overallTrip } from '../type'
import { props } from './alignTripDetails'
const getTollDetails = (toll: overallTrip['tollPayment']) => {
    const locations: { [key: string]: number } = {}
    toll.forEach(
        (detail) =>
            (locations[detail.tollPlazaLocation.location.toLocaleLowerCase()] = detail.amount)
    )
    return locations
}
const getTollSums = (computedTripDetails: props['trip']) => {
    const tollAmountsArray = computedTripDetails.map((trip) => trip.tollDetails)
    return tollAmountsArray.reduce((acc: { [key: string]: number }, toll) => {
        if (!toll) return acc
        Object.keys(toll).forEach((tollPlaza) => {
            acc[tollPlaza] = (acc[tollPlaza] || 0) + toll[tollPlaza]
        })
        return acc
    }, {})
}
const TripAmountCalculation = (trips: props['trip']) => {
    const [filledLoad, setFilledLoad] = useState<number>(0)
    const [tollTotal, setTollTotal] = useState<{ [key: string]: number } | undefined>(
        {} as { [key: string]: number }
    )
    const [tripDetails, setTripDetails] = useState<props['trip']>([])
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(() => {
        const computedTripDetails = trips.map((trip) => {
            setFilledLoad((prev) => prev + trip.trip.filledLoad)
            return { ...trip, tollDetails: getTollDetails(trip.toll) }
        })
        setTripDetails(computedTripDetails)
        const tollPlazaSums = getTollSums(computedTripDetails)
        setTollTotal(tollPlazaSums)
        setTotalAmount(Object.values(tollPlazaSums || {}).reduce((sum, amount) => sum + amount, 0))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { filledLoad, tollTotal, tripDetails, totalAmount }
}
export default TripAmountCalculation
