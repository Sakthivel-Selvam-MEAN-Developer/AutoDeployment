import dayjs from 'dayjs'
import finalDueLogic from './finalDueLogic.ts'

describe('Final Due Logics Test', async () => {
    test('Should create final due for loading to unloading', async () => {
        const overallTrip = {
            id: 12,
            acknowledgementStatus: false,
            loadingPointToStockPointTrip: null,
            stockPointToUnloadingPointTrip: null,
            loadingPointToUnloadingPointTrip: {
                startDate: new Date(2023, 10, 24).getTime() / 1000,
                filledLoad: 40,
                invoiceNumber: 'ABC123',
                freightAmount: 1000,
                transporterAmount: 900,
                totalFreightAmount: 40000,
                totalTransporterAmount: 36000,
                margin: 4000,
                tripStatus: false,
                wantFuel: false,
                truck: {
                    vehicleNumber: 'TN30S7777',
                    transporter: {
                        name: 'Muthu Logistics'
                    }
                }
            }
        }
        const paymentDueDetails = [
            {
                payableAmount: 24200
            },
            {
                payableAmount: 1000
            }
        ]
        const shortageAmount = 100
        const tdsPercentage = 2.3
        const actual = await finalDueLogic(
            overallTrip,
            paymentDueDetails,
            shortageAmount,
            tdsPercentage
        )
        expect(actual).toEqual([
            {
                name: 'Muthu Logistics',
                type: 'final pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: overallTrip.id,
                vehicleNumber: 'TN30S7777',
                payableAmount: 9872
            }
        ])
    })
    test('Should create final due for loading to stock to unloading', async () => {
        const overallTrip = {
            id: 2,
            acknowledgementStatus: true,
            loadingPointToUnloadingPointTripId: null,
            loadingPointToUnloadingPointTrip: null,
            stockPointToUnloadingPointTrip: {
                freightAmount: 50,
                transporterAmount: 45,
                totalFreightAmount: 500,
                totalTransporterAmount: 450,
                unloadingPointId: 1,
                loadingPointToStockPointTripId: 1,
                loadingPointToStockPointTrip: {
                    freightAmount: 100,
                    filledLoad: 10,
                    transporterAmount: 90,
                    totalFreightAmount: 1000,
                    totalTransporterAmount: 900,
                    truck: {
                        vehicleNumber: 'TN30S7777',
                        transporter: {
                            name: 'Muthu Logistics'
                        }
                    }
                }
            }
        }
        const paymentDueDetails = [
            {
                payableAmount: 630
            }
        ]
        const shortageAmount = 100
        const tdsPercentage = 2.3
        const actual = await finalDueLogic(
            overallTrip,
            paymentDueDetails,
            shortageAmount,
            tdsPercentage
        )
        expect(actual).toEqual([
            {
                name: 'Muthu Logistics',
                type: 'final pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                overallTripId: overallTrip.id,
                vehicleNumber: 'TN30S7777',
                payableAmount: 588.95
            }
        ])
    })
})
