import dayjs from 'dayjs'
import overallTripProps from './overallTripsTypes.ts'
import { findTrip } from '../findTripType.ts'

interface dataProps {
    payableAmount: number
}
const finalDueLogic = async (
    overallTrip: overallTripProps,
    paymentDueDetails: dataProps[],
    shortageAmount: number,
    tdsPercentage: number | null
) => {
    const { trip } = findTrip(overallTrip)
    let paidAmount = 0
    let totalTransporterAmount = 0
    let remainingAmount = 0
    let negativePay = 0
    paymentDueDetails.forEach((data: dataProps) => {
        paidAmount += data.payableAmount
        negativePay = data.payableAmount < 0 ? data.payableAmount : 0
    })
    totalTransporterAmount = trip.totalTransporterAmount
    if (overallTrip.stockPointToUnloadingPointTrip) {
        totalTransporterAmount += overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount
    }
    const tdsAmount = totalTransporterAmount * (tdsPercentage !== null ? tdsPercentage / 100 : 0)
    remainingAmount =
        totalTransporterAmount - (paidAmount + shortageAmount + tdsAmount) + negativePay
    const acknowledgementDate = dayjs.unix(
        overallTrip.acknowledgementDate ? overallTrip.acknowledgementDate : 0
    )
    const paymentDues = [
        {
            name: overallTrip?.truck?.transporter.name,
            type: 'final pay',
            dueDate: acknowledgementDate
                .add(overallTrip.finalPayDuration ? overallTrip.finalPayDuration : 0, 'day')
                .unix(),
            overallTripId: overallTrip.id,
            vehicleNumber: overallTrip?.truck?.vehicleNumber,
            payableAmount: parseFloat(remainingAmount.toFixed(2))
        }
    ]
    return paymentDues
}
export default finalDueLogic
