import dayjs from 'dayjs'

const fuelLogics = async (fuel: any, trip: any, bunkname: any, vehicleNumber: string) => {
    let a: any
    if (trip.loadingPointToStockPointTrip) {
        a = trip.loadingPointToStockPointTrip
    } else if (trip.loadingPointToUnloadingPointTrip) {
        a = trip.loadingPointToUnloadingPointTrip
    }
    const paymentDues = [
        {
            name: a.truck.transporter.name,
            type: 'initial pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            payableAmount: (a.totalTransporterAmount * 70) / 100 - fuel.totalprice,
            tripId: a.id,
            vehicleNumber
        },
        {
            name: bunkname,
            type: 'fuel pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            payableAmount: fuel.totalprice,
            tripId: a.id,
            vehicleNumber
        }
    ]

    if (fuel.overallTripId !== null) {
        return paymentDues
    }
}

export default fuelLogics

export function fuelDues(
    bunkname: string,
    vehicleNumber: string,
    fuel: {
        id: number
        pricePerliter: number
        quantity: number
        totalprice: number
        vehicleNumber: string
        loadingPointToStockPointTripId: number | null
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
