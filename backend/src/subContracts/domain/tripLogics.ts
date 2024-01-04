import dayjs from 'dayjs'

const transporterPercentage = 70 / 100

const tripLogic = async (
    data: any,
    fuelDetails: any,
    transporterName: string,
    id: number,
    vehicleNumber: string
) => {
    if (data.wantFuel === false && fuelDetails === null) {
        const paymentDues = [
            {
                name: transporterName,
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                tripId: id,
                vehicleNumber,
                payableAmount: data.totalTransporterAmount * transporterPercentage
            }
        ]
        return paymentDues
    }
    if (data.wantFuel === false && fuelDetails !== null) {
        const paymentDues = [
            {
                name: transporterName,
                type: 'initial pay',
                dueDate: dayjs().startOf('day').unix(),
                tripId: id,
                vehicleNumber,
                payableAmount:
                    data.totalTransporterAmount * transporterPercentage - fuelDetails.totalprice
            }
        ]
        return paymentDues
    }
}

export default tripLogic
