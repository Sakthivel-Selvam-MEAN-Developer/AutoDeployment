import dayjs from 'dayjs'
import fuelLogics from './fuelLogics.ts'

describe('Fuel Logics Test', async () => {
    test('Should get both initial & fuel pay with fuel after trip started', async () => {
        const fuel = {
            totalprice: 100000,
            vehicleNumber: 'TN29BA3211',
            overallTripId: 1,
            id: 1,
            fueledDate: 1704781636,
            invoiceNumber: 'FDGT564',
            pricePerliter: 1000,
            quantity: 100,
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
                filledLoad: 100,
                wantFuel: true,
                tripStatus: false,
                freightAmount: 1000,
                transporterAmount: 900,
                totalFreightAmount: 100000,
                totalTransporterAmount: 90000,
                margin: 10000,
                loadingPointId: 1,
                invoiceNumber: 'FDGT564',
                unloadingPointId: 1,
                truckId: 5,
                truck: { transporter: { name: 'Barath Logistics Pvt Ltd' } }
            }
        }
        const bunkname = 'Barath Petroleum'
        const vehicleNumber = 'TN29BA3211'

        const actual = await fuelLogics(fuel, trip.id, bunkname, vehicleNumber)
        expect(actual).toEqual([
            {
                name: 'Barath Petroleum',
                type: 'fuel pay',
                fuelId: 1,
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: 3,
                vehicleNumber: 'TN29BA3211',
                payableAmount: 100000
            }
        ])
    })
})
