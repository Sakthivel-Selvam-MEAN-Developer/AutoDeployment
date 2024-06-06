import dayjs from 'dayjs'

export interface dataProps {
    wantFuel: boolean
    totalTransporterAmount: number
}
export interface fuelProps {
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
    const payableAmount = parseFloat(
        (data.totalTransporterAmount * transporterPercentage - fuelAmount).toFixed(2)
    )
    return [
        {
            name: transporterName,
            type: 'initial pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            overallTripId: id,
            vehicleNumber,
            payableAmount,
            NEFTStatus: payableAmount < 0,
            transactionId: payableAmount < 0 ? '0' : '',
            paidAt: payableAmount < 0 ? 0 : 0
        }
    ]
}

export default tripLogic
