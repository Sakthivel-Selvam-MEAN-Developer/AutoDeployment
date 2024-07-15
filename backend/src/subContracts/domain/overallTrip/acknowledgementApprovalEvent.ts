import finalDueLogic from '../finalDueLogic.ts'
import overallTripProps from '../overallTripsTypes.ts'

export const finalDueCreation = async (overallTrip: overallTripProps) => {
    const finalPay = overallTrip.paymentDues.filter((due) => due.type === 'final pay')
    if (
        overallTrip.acknowledgementApproval === false ||
        overallTrip.transporterInvoice === '' ||
        finalPay.length > 0
    ) {
        return false
    }
    const tdsPercentage = overallTrip?.truck?.transporter.tdsPercentage || null
    const paymentDueDetails = overallTrip.paymentDues.filter((pay) => pay.type !== 'gst pay')
    const { shortageAmount } = overallTrip.shortageQuantity[0]
    if (
        overallTrip?.truck?.transporter.transporterType === 'Own' ||
        overallTrip?.truck?.transporter.transporterType === 'Own'
    ) {
        return false
    }
    return finalDueLogic(overallTrip, paymentDueDetails, shortageAmount, tdsPercentage).then(
        (finalDue) => {
            if (finalDue !== null && finalDue !== undefined) return finalDue
        }
    )
}
