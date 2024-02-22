import dayjs from 'dayjs'
import fuelLogics from './fuelLogics.ts'

describe('Fuel Logics Test', async () => {
    test('Should get both initial & fuel pay with fuel after trip started', async () => {
        const fuel = {
            totalprice: 5000,
            vehicleNumber: 'TN29BA3211',
            overallTripId: 1,
            id: 1,
            fueledDate: 1704781636,
            invoiceNumber: 'FDGT564',
            pricePerliter: 123,
            quantity: 12,
            paymentStatus: false,
            bunkId: 1
        }
        const trip = {
            id: 3,
            loadingPointToStockPointTripId: null,
            stockPointToUnloadingPointTripId: null,
            loadingPointToUnloadingPointTripId: 1,
            loadingPointToStockPointTrip: null,
            loadingPointToUnloadingPointTrip: {
                id: 1,
                startDate: 1704781636,
                filledLoad: 60,
                wantFuel: true,
                tripStatus: false,
                freightAmount: 1000,
                transporterAmount: 900,
                totalFreightAmount: 60000,
                totalTransporterAmount: 54000,
                margin: 6000,
                loadingPointId: 1,
                invoiceNumber: 'FDGT564',
                unloadingPointId: 1,
                truckId: 5,
                truck: { transporter: { name: 'Barath Logistics Pvt Ltd' } }
            }
        }
        const bunkname = 'Barath Petroleum'
        const vehicleNumber = 'TN29BA3211'

        const actual = await fuelLogics(fuel, trip, bunkname, vehicleNumber)
        expect(actual).toEqual([
            {
                name: 'Barath Logistics Pvt Ltd',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 3,
                vehicleNumber: 'TN29BA3211',
                payableAmount: 32800
            },
            {
                name: 'Barath Petroleum',
                type: 'fuel pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 3,
                vehicleNumber: 'TN29BA3211',
                payableAmount: 5000
            }
        ])
    })
})
