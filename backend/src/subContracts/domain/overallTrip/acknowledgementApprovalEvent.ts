import finalDueLogic from '../finalDueLogic.ts'
import overallTripProps from '../overallTripsTypes.ts'

export const finalDueCreation = async (overallTrip: overallTripProps, tdsAmount: number) => {
    const finalPay = overallTrip.paymentDues.filter((due) => due.type === 'final pay')
    if (
        overallTrip.acknowledgementApproval === false ||
        overallTrip.transporterInvoice === '' ||
        finalPay.length > 0
    ) {
        return false
    }
    const paymentDueDetails = overallTrip.paymentDues.filter((pay) => pay.type !== 'gst pay')
    const { shortageAmount } = overallTrip.shortageQuantity[0]
    if (
        overallTrip?.truck?.transporter.transporterType === 'Own' ||
        overallTrip?.truck?.transporter.transporterType === 'Own'
    ) {
        return false
    }
    return finalDueLogic(overallTrip, paymentDueDetails, shortageAmount, tdsAmount).then(
        (finalDue) => {
            if (finalDue !== null && finalDue !== undefined) return finalDue
        }
    )
}
