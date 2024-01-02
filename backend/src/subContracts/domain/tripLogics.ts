import dayjs from 'dayjs'

const transporterPercentage = 70 / 100

const tripLogic = async (data: any, fuelDetails: any, transporterName: any, id: number) => {
    if (data.wantFuel === false && fuelDetails === null) {
        const paymentDues = [
            {
                name: transporterName,
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                tripId: id,
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
                payableAmount:
                    data.totalTransporterAmount * transporterPercentage - fuelDetails.totalprice
            },
            {
                name: fuelDetails.fuelStation.bunk.bunkName,
                type: 'fuel pay',
                dueDate: dayjs().startOf('day').unix(),
                tripId: id,
                payableAmount: fuelDetails.totalprice
            }
        ]
        return paymentDues
    }
}

export default tripLogic
