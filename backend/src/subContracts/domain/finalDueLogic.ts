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
    paymentDueDetails.forEach((data: dataProps) => {
        amount += data.payableAmount
    })
    if (overallTrip !== null) {
        if (overallTrip.stockPointToUnloadingPointTrip !== null ) {
            tdsAmount =
                (overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount +
                    overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                        .totalTransporterAmount) *
                (tdsPercentage !== null ? tdsPercentage / 100 : 0)
            dueDetails = overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
            amount =
                dueDetails.totalTransporterAmount +
                overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount -
                (amount + shortageAmount + tdsAmount)
        } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
            tdsAmount =
                overallTrip.loadingPointToUnloadingPointTrip.totalTransporterAmount *
                (tdsPercentage !== null ? tdsPercentage / 100 : 0)
            dueDetails = overallTrip.loadingPointToUnloadingPointTrip
            amount = dueDetails.totalTransporterAmount - (amount + shortageAmount + tdsAmount)
        } else if (
            overallTrip.loadingPointToUnloadingPointTrip.totalTransporterAmount === 0 &&
            overallTrip.loadingPointToStockPointTrip.totalTransporterAmount === 0
        ) {
            return null
        }
        const paymentDues = [
            {
                name: dueDetails.truck.transporter.name,
                type: 'final pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: overallTrip.id,
                vehicleNumber: dueDetails.truck.vehicleNumber,
                payableAmount: parseFloat(amount.toFixed(2))
            }
        ]
        return paymentDues
    }
}
export default finalDueLogic
