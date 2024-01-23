import dayjs from 'dayjs'

const finalDueLogic = async (overallTrip: any) => {
    let dueDetails
    if (overallTrip !== null) {
        if (overallTrip.stockPointToUnloadingPointTrip !== null) {
            dueDetails = overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
        } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
            dueDetails = overallTrip.loadingPointToUnloadingPointTrip
        }

        const paymentDues = [
            {
                name: dueDetails.truck.transporter.name,
                type: 'final pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                tripId: overallTrip.id,
                vehicleNumber: dueDetails.truck.vehicleNumber,
                payableAmount: 1
            }
        ]

        return paymentDues
    }
}

export default finalDueLogic
