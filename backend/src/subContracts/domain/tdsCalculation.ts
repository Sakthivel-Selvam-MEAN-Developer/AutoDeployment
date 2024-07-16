import { findTrip } from '../findTripType'
import overallTripProps from './overallTripsTypes'

export const tdsCalculation = (overallTrip: overallTripProps) => {
    const { trip } = findTrip(overallTrip)
    const tdsPercentage = overallTrip.truck?.transporter.tdsPercentage ?? 0
    let totalTransporterAmount = trip.totalTransporterAmount
    if (overallTrip.stockPointToUnloadingPointTrip) {
        totalTransporterAmount += overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount
    }
    return totalTransporterAmount * (tdsPercentage / 100)
}
