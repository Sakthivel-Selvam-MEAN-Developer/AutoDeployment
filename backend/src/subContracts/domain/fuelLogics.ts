import dayjs from 'dayjs'

const fuelLogics = async (fuel: any, trip: any, bunkname: any, vehicleNumber: string) => {
    if (fuel.loadingPointToUnloadingPointTripId !== null) {
        const paymentDues = [
            {
                name: trip.truck.transporter.name,
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: (trip.totalTransporterAmount * 70) / 100 - fuel.totalprice,
                tripId: trip.id,
                vehicleNumber
            },
            {
                name: bunkname,
                type: 'fuel pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: fuel.totalprice,
                tripId: trip.id,
                vehicleNumber
            }
        ]
        return paymentDues
    }
}

export default fuelLogics

export function fuelDues(
    bunkname: string,
    vehicleNumber: any,
    fuel: {
        id: number
        pricePerliter: number
        quantity: number
        totalprice: number
        vehicleNumber: string
        loadingPointToStockPointTripId: number | null
        stockPointToUnloadingPointTripId: number | null
        loadingPointToUnloadingPointTripId: number | null
        fuelStationId: number
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
