import dayjs from 'dayjs'

const fuelLogics = async (fuel: any, trip: any, bunkname: any) => {
    if (fuel.loadingPointToUnloadingPointTripId !== null) {
        const paymentDues = [
            {
                name: trip.truck.transporter.name,
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: (trip.totalTransporterAmount * 70) / 100 - fuel.totalprice,
                tripId: trip.id
            },
            {
                name: bunkname,
                type: 'fuel pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: fuel.totalprice,
                tripId: trip.id
            }
        ]
        return paymentDues
    }
}

export default fuelLogics
