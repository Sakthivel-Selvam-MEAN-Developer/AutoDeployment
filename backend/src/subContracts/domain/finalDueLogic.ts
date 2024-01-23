import dayjs from 'dayjs'

interface dataProps {
    payableAmount: number
}

const finalDueLogic = async (overallTrip: any, paymentDueDetails: dataProps[]) => {
    let amount = 0
    let dueDetails
    paymentDueDetails.forEach((data: dataProps) => {
        amount += data.payableAmount
    })
    if (overallTrip !== null) {
        if (overallTrip.stockPointToUnloadingPointTrip !== null) {
            dueDetails = overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
            amount =
                dueDetails.totalTransporterAmount +
                overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount -
                amount
        } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
            dueDetails = overallTrip.loadingPointToUnloadingPointTrip
            amount = dueDetails.totalTransporterAmount - amount
        }

        const paymentDues = [
            {
                name: dueDetails.truck.transporter.name,
                type: 'final pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                tripId: overallTrip.id,
                vehicleNumber: dueDetails.truck.vehicleNumber,
                payableAmount: amount
            }
        ]

        return paymentDues
    }
}

export default finalDueLogic
