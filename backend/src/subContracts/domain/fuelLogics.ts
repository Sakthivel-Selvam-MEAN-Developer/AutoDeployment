import dayjs from 'dayjs'

const fuelLogics = async (fuel: any, trip: any, bunkname: string, vehicleNumber: string) => {
    let tripDetails
    if (trip !== null) {
        if (trip.loadingPointToStockPointTrip !== null) {
            tripDetails = trip.loadingPointToStockPointTrip
        } else if (trip.loadingPointToUnloadingPointTrip !== null) {
            tripDetails = trip.loadingPointToUnloadingPointTrip
        }

        const paymentDues = [
            {
                name: tripDetails.truck.transporter.name,
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: parseFloat(
                    ((tripDetails.totalTransporterAmount * 70) / 100 - fuel.totalprice).toFixed(2)
                ),
                overallTripId: trip.id,
                vehicleNumber
            },
            {
                name: bunkname,
                type: 'fuel pay',
                fuelId: fuel.id,
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: parseFloat(fuel.totalprice.toFixed(2)),
                overallTripId: trip.id,
                vehicleNumber
            }
        ]
        if (fuel.overallTripId !== null) {
            return paymentDues
        }
    }
}

export default fuelLogics

export function fuelDues(
    bunkname: string,
    vehicleNumber: string,
    fuel: {
        id: number
        fueledDate: number
        invoiceNumber: string
        pricePerliter: number
        quantity: number
        totalprice: number
        paymentStatus: boolean
        vehicleNumber: string
        bunkId: number
        createdAt: Date
        updatedAt: Date
    }
) {
    return [
        {
            name: bunkname,
            type: 'fuel pay',
            vehicleNumber,
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            payableAmount: fuel.totalprice
        }
    ]
}
