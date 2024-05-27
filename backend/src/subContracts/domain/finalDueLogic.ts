import dayjs from 'dayjs'

interface dataProps {
    payableAmount: number
}
const finalDueLogic = async (
    overallTrip: any,
    paymentDueDetails: dataProps[],
    shortageAmount: number,
    tdsPercentage: number | null
) => {
    let amount = 0
    let dueDetails
    let tdsAmount
    let totalAmount = 0
    paymentDueDetails.forEach((data: dataProps) => {
        totalAmount += data.payableAmount
        if (data.payableAmount < 0) amount = data.payableAmount
    })
    if (overallTrip === null) return
    if (
        overallTrip.stockPointToUnloadingPointTrip !== null &&
        overallTrip.loadingPointToStockPointTrip?.totalTransporterAmount !== 0
    ) {
        tdsAmount =
            (overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount +
                overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                    .totalTransporterAmount) *
            (tdsPercentage !== null ? tdsPercentage / 100 : 0)
        dueDetails = overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
        amount =
            totalAmount !== dueDetails.totalTransporterAmount
                ? dueDetails.totalTransporterAmount * 0.3 +
                  overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount -
                  (-amount + shortageAmount + tdsAmount)
                : overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount -
                  (-amount + shortageAmount + tdsAmount)
    } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        tdsAmount =
            overallTrip.loadingPointToUnloadingPointTrip.totalTransporterAmount *
            (tdsPercentage !== null ? tdsPercentage / 100 : 0)
        dueDetails = overallTrip.loadingPointToUnloadingPointTrip
        amount = dueDetails.totalTransporterAmount * 0.3 - (-amount + shortageAmount + tdsAmount)
    } else if (
        overallTrip.loadingPointToUnloadingPointTrip.totalTransporterAmount === 0 &&
        overallTrip.loadingPointToStockPointTrip.totalTransporterAmount === 0
    ) {
        return null
    }
    if (amount === 0) return
    const acknowledgementDate = dayjs.unix(overallTrip.acknowledgementDate)
    const paymentDues = [
        {
            name: dueDetails.truck.transporter.name,
            type: 'final pay',
            dueDate: acknowledgementDate
                .add(overallTrip.finalPayDuration, 'day')
                // .startOf('day')
                .unix(),
            overallTripId: overallTrip.id,
            vehicleNumber: dueDetails.truck.vehicleNumber,
            payableAmount: parseFloat(amount.toFixed(2))
        }
    ]
    return paymentDues
}
export default finalDueLogic
