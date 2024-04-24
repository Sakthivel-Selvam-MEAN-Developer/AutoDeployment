import dayjs from 'dayjs'

const gstDueLogic = async (
    gstPercentage: number,
    transporterAmount: number,
    transporterName: string,
    vehicleNumber: string,
    overallTripId: number
) => {
    const amount = parseFloat(((gstPercentage / 100) * transporterAmount).toFixed(2))
    return [
        {
            name: transporterName,
            type: 'gst pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            payableAmount: amount,
            overallTripId,
            vehicleNumber
        }
    ]
}

export default gstDueLogic
