import { IncomingHttpHeaders } from 'http'
import { fuelTypes } from '../controller/driverTrip.ts'
import { getPreviousFuel } from '../controller/getPreviousFuel.ts'

const getFullTankFuel = (fullTankFuels: fuelTypes[]) => {
    let currentFuelKm = 0
    const currentQuantity: number[] = []
    fullTankFuels.forEach((fuel: fuelTypes) => {
        currentFuelKm += fuel.dieselkilometer
        currentQuantity.push(fuel.quantity)
    })
    return { currentFuelKm, currentQuantity: Math.max(...currentQuantity) }
}
const getPartialFuels = (partialFuels: fuelTypes[]) => {
    let partialQuantity = 0
    if (partialFuels.length === 0) partialQuantity = 0
    partialFuels.forEach((fuel) => {
        partialQuantity += fuel.quantity
    })
    return { partialQuantity }
}
type mileageTypes = (
    fullTankFuels: fuelTypes[],
    partialFuels: fuelTypes[],
    previousFuels: fuelTypes | null
) => number
export const mileageCalculation: mileageTypes = (fullTankFuels, partialFuels, previousFuels) => {
    if (previousFuels === null) return 0
    if (fullTankFuels.length === 0) return 0
    const { currentFuelKm, currentQuantity } = getFullTankFuel(fullTankFuels)
    const { partialQuantity } = getPartialFuels(partialFuels)
    const kilometer = currentFuelKm - previousFuels.dieselkilometer
    return parseFloat((kilometer / (currentQuantity - partialQuantity)).toFixed(2))
}
interface trips {
    id: number
    fuel: fuelTypes[]
}
const seperationOfFuel = (trip: trips) => {
    const fullFuledDates: number[] = []
    const partialFuels = trip.fuel.filter((fuel) => fuel.fuelType === 'Partial fill')
    const fullTankFuels = trip.fuel.filter((fuel) => {
        fullFuledDates.push(fuel.fueledDate)
        return fuel.fuelType === 'Full tank'
    })
    return { partialFuels, fullTankFuels, maxDate: Math.max(...fullFuledDates) }
}
type getPerandCurrFuelTypes = (
    headers: IncomingHttpHeaders,
    trip: { id: number; fuel: fuelTypes[] }
) => Promise<{ id: number; mileage: number }>
export const getPerviousAndCurrentFuel: getPerandCurrFuelTypes = async (headers, trip) => {
    if (trip.fuel.length === 0) return { id: trip.id, mileage: 0 }
    const { partialFuels, fullTankFuels, maxDate } = seperationOfFuel(trip)
    const previousFuel = await getPreviousFuel(headers, maxDate, trip.fuel)
    const mileage = mileageCalculation(fullTankFuels, partialFuels, previousFuel)
    return { id: trip.id, mileage }
}
