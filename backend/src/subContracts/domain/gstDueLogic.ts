import dayjs from 'dayjs'
import overallTripProps from './overallTripsTypes.ts'

export const gstDueLogic = (
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
const findTrip = (overallTrip: overallTripProps) => {
    if (overallTrip.stockPointToUnloadingPointTrip !== null) {
        return overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
            ? overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
            : undefined
    }
    if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        return overallTrip.loadingPointToUnloadingPointTrip
    }
}
export const gstCalculation = async (overAllTripData: overallTripProps) => {
    const trip = findTrip(overAllTripData)
    const gstPercentage = overAllTripData.truck?.transporter.gstPercentage
    const shortage = overAllTripData?.shortageQuantity[0]
    if (
        trip === undefined ||
        gstPercentage === null ||
        gstPercentage === undefined ||
        overAllTripData?.truck?.transporter.transporterType === 'Own'
    ) {
        return
    }
    let transporterAmount = 0
    let stockToUnloadingTransporterAmount = 0
    if (overAllTripData.stockPointToUnloadingPointTrip !== null) {
        stockToUnloadingTransporterAmount =
            overAllTripData.stockPointToUnloadingPointTrip.totalTransporterAmount
    }
    if (shortage.approvalStatus) {
        transporterAmount = trip.totalTransporterAmount + stockToUnloadingTransporterAmount || 0
    } else if (!shortage.approvalStatus) {
        transporterAmount =
            (trip.totalTransporterAmount + stockToUnloadingTransporterAmount || 0) -
            shortage.shortageAmount
    }
    const vehicleNumber = overAllTripData?.truck?.vehicleNumber || ''
    return gstDueLogic(
        gstPercentage,
        transporterAmount,
        overAllTripData.truck ? overAllTripData.truck.transporter.name : '',
        vehicleNumber,
        overAllTripData.id
    )
}
