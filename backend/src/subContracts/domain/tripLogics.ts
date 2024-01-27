import dayjs from 'dayjs'

interface dataProps {
    wantFuel: boolean
    totalTransporterAmount: number
}
interface fuelProps {
    totalprice: number
}
const transporterPercentage = 70 / 100

const tripLogic = async (
    data: dataProps,
    fuelDetails: fuelProps | null,
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
                payableAmount: Math.round(data.totalTransporterAmount * transporterPercentage)
            }
        ]
        return paymentDues
    }
    if (data.wantFuel === false && fuelDetails !== null) {
        return [
            {
                name: transporterName,
                type: 'initial pay',
                dueDate: dayjs().startOf('day').unix(),
                tripId: id,
                vehicleNumber,
                payableAmount: Math.round(
                    data.totalTransporterAmount * transporterPercentage - fuelDetails.totalprice
                )
            }
        ]
    }
}

export default tripLogic
