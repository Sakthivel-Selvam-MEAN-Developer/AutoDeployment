import dayjs from 'dayjs'

interface Truck {
    vehicleNumber: string
    transporter: {
        name: string
        transporterType: string
        gstPercentage: number | null
    }
}
interface LoadingPointToStockPointTrip {
    filledLoad?: number
    totalTransporterAmount: number
    truck: Truck
}
interface TripDetails {
    id: number
    filledLoad?: number
    totalTransporterAmount: number
    truck: Truck
}
interface stockPointToUnloadingPointTrip {
    id: number
    totalTransporterAmount: number
    filledLoad?: number
    loadingPointToStockPointTrip?: LoadingPointToStockPointTrip
}
export interface allTrips {
    id: number
    loadingPointToStockPointTrip: LoadingPointToStockPointTrip | null
    stockPointToUnloadingPointTrip: stockPointToUnloadingPointTrip | null
    loadingPointToUnloadingPointTrip: TripDetails | null
}
interface shortageProp {
    shortageAmount: number
    approvalStatus: boolean
}
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
const findTrip = (overallTrip: allTrips) => {
    if (overallTrip.stockPointToUnloadingPointTrip !== null) {
        return overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
            ? overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
            : undefined
    }
    if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        return overallTrip.loadingPointToUnloadingPointTrip
    }
}
export const gstCalculation = async (
    shortage: shortageProp,
    gstPercentage: number | null,
    overAllTripData: allTrips
) => {
    const trip = findTrip(overAllTripData)
    if (
        trip === undefined ||
        gstPercentage === null ||
        trip.truck.transporter.transporterType === 'Own'
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
    const vehicleNumber = trip?.truck?.vehicleNumber || ''
    return gstDueLogic(
        gstPercentage,
        transporterAmount,
        trip.truck.transporter.name,
        vehicleNumber,
        overAllTripData.id
    )
}
