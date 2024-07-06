import finalDueLogic from './finalDueLogic.ts'

describe('Final Due Logics Test', async () => {
    test('Should create final due for loading to unloading', async () => {
        const overallTrip = {
            id: 12,
            finalPayDuration: 1,
            paymentDues: [],
            shortageQuantity: [],
            acknowledgementStatus: false,
            acknowledgementApproval: true,
            transporterInvoice: 'default-invoice',
            acknowledgementDate: 1716595200,
            loadingPointToStockPointTrip: null,
            stockPointToUnloadingPointTrip: null,
            truck: {
                vehicleNumber: 'TN30S7777',
                transporter: {
                    name: 'Muthu Logistics',
                    tdsPercentage: null,
                    transporterType: 'Market',
                    gstPercentage: 1
                }
            },
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
                        name: 'Muthu Logistics',
                        tdsPercentage: null,
                        transporterType: 'Market',
                        gstPercentage: 1
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
                dueDate: 1716681600,
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
            acknowledgementDate: 1716595200,
            finalPayDuration: 1,
            paymentDues: [],
            shortageQuantity: [],
            acknowledgementApproval: true,
            transporterInvoice: 'default-invoice',
            loadingPointToStockPointTrip: null,
            loadingPointToUnloadingPointTripId: null,
            loadingPointToUnloadingPointTrip: null,
            truck: {
                vehicleNumber: 'TN30S7777',
                transporter: {
                    name: 'Muthu Logistics',
                    tdsPercentage: null,
                    transporterType: 'Market',
                    gstPercentage: 1
                }
            },
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
                            name: 'Muthu Logistics',
                            tdsPercentage: null,
                            transporterType: 'Market',
                            gstPercentage: 1
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
                dueDate: 1716681600,
                overallTripId: overallTrip.id,
                vehicleNumber: 'TN30S7777',
                payableAmount: 588.95
            }
        ])
    })
})
