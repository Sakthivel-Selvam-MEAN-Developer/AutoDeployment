import dayjs from 'dayjs'

interface dataProps {
    wantFuel: boolean
    totalTransporterAmount: number
}
interface fuelProps {
    totalprice: number
}

const tripLogic = async (
    data: dataProps,
    fuelDetails: fuelProps | null,
    transporterName: string,
    id: number,
    vehicleNumber: string,
    tripType: string,
    advanceType: number | undefined
) => {
    let transporterPercentage = 70 / 100
    if (tripType === 'LoadingToStock' && advanceType === 100) transporterPercentage = 1
    const fuelAmount = fuelDetails ? fuelDetails.totalprice : 0
    if (data.wantFuel === true && fuelDetails === null) return
    return [
        {
            name: transporterName,
            type: 'initial pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            overallTripId: id,
            vehicleNumber,
            payableAmount: parseFloat(
                (data.totalTransporterAmount * transporterPercentage - fuelAmount).toFixed(2)
            )
        }
    ]
}

export default tripLogic
