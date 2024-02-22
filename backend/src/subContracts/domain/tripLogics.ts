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
                overallTripId: id,
                vehicleNumber,
                payableAmount: parseFloat(
                    (data.totalTransporterAmount * transporterPercentage).toFixed(2)
                )
            }
        ]
        return paymentDues
    }
    if (data.totalTransporterAmount !== 0 && data.wantFuel === false && fuelDetails !== null) {
        return [
            {
                name: transporterName,
                type: 'initial pay',
                dueDate: dayjs().startOf('day').unix(),
                overallTripId: id,
                vehicleNumber,
                payableAmount: parseFloat(
                    (
                        data.totalTransporterAmount * transporterPercentage -
                        fuelDetails.totalprice
                    ).toFixed(2)
                )
            }
        ]
    }
}

export default tripLogic
