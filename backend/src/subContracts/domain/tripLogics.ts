import dayjs from 'dayjs'
import { tripLogicTripProps } from './types.ts'

const tripLogic = async (trip: tripLogicTripProps, overallTrip: any, tripType: string) => {
    if (overallTrip.truck.transporter.transporterType === 'Own') return
    const fuelDetails = overallTrip.fuel[0]
    if (trip.wantFuel === true && fuelDetails === null) return
    let transporterPercentage = 70 / 100
    if (tripType === 'LoadingToStock' && trip.loadingPoint.cementCompany.advanceType === 100) {
        transporterPercentage = 1
    }
    const fuelAmount = fuelDetails ? fuelDetails.totalprice : 0
    const payableAmount = parseFloat(
        (trip.totalTransporterAmount * transporterPercentage - fuelAmount).toFixed(2)
    )
    return [
        {
            name: overallTrip.truck.transporter.name,
            type: 'initial pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            overallTripId: overallTrip.id,
            vehicleNumber: overallTrip.truck.vehicleNumber,
            payableAmount,
            NEFTStatus: payableAmount < 0,
            transactionId: payableAmount < 0 ? '0' : '',
            paidAt: 0
        }
    ]
}
export default tripLogic
