import { finalDueCreation } from './acknowledgementApprovalEvent.ts'

describe('For a overall trip when ack approved event is called', async () => {
    test('when acknowledgementApproval is equal to false final pay should not be created', async () => {})
    test('when transporterInvoice is equal to "" final pay should not be created', async () => {})
    test('when transporter type is equal to own final pay should not created', async () => {})
    test('should able to generate final pay for loading to stock trip', async () => {})
    test('should able to generate final pay for loading to unloading trip', async () => {
        const overAllTrip = {
            id: 1,
            acknowledgementStatus: true,
            finalPayDuration: 5,
            acknowledgementDate: 1700764200,
            loadingPointToStockPointTripId: null,
            stockPointToUnloadingPointTripId: null,
            stockPointToUnloadingPointTrip: null,
            loadingPointToUnloadingPointTripId: 1,
            fuel: [],
            fuelId: null,
            paymentDues: [
                {
                    id: 1,
                    payableAmount: 70000,
                    overallTripId: 1,
                    type: 'initial pay',
                    fuelId: null,
                    name: 'Barath Logistics Pvt Ltd',
                    status: false,
                    vehicleNumber: 'TN93D5512',
                    dueDate: 1700764200
                }
            ],
            paymentDuesId: null,
            shortageQuantityId: [],
            shortageQuantity: [
                {
                    id: 1,
                    overallTripId: 1,
                    shortageQuantity: 1000,
                    shortageAmount: 8000,
                    approvalStatus: false,
                    reason: 'Test reason',
                    filledLoad: 40,
                    unloadedQuantity: 39000,
                    unloadedDate: Date.now(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            loadingPointToStockPointTrip: null,
            loadingPointToUnloadingPointTrip: {
                id: 1,
                startDate: 1700764200,
                filledLoad: 100,
                wantFuel: null,
                tripStatus: false,
                acknowledgeDueTime: null,
                freightAmount: 1100,
                transporterAmount: 1000,
                totalFreightAmount: 110000,
                totalTransporterAmount: 100000,
                margin: 4000,
                invoiceNumber: 'ABC123',
                loadingPointId: 1,
                unloadingPointId: 1,
                truckId: 1,
                loadingPoint: {
                    id: 1,
                    name: 'Chennai-south',
                    cementCompanyId: 1,
                    cementCompany: {
                        name: 'UltraTech Cements'
                    }
                },
                unloadingPoint: {
                    id: 1,
                    name: 'Salem',
                    cementCompanyId: 1,
                    cementCompany: {
                        name: 'UltraTech Cements'
                    }
                },
                truck: {
                    vehicleNumber: 'TN93D5512',
                    transporterId: 1,
                    transporter: {
                        id: 1,
                        csmName: 'newName',
                        name: 'Barath Logistics',
                        tdsPercentage: null,
                        transporterType: 'Market'
                    }
                }
            }
        }
        const finalPay = [
            {
                payableAmount: 22000,
                overallTripId: 1,
                type: 'final pay',
                name: 'Barath Logistics',
                vehicleNumber: 'TN93D5512',
                dueDate: 1701196200
            }
        ]
        const actual = await finalDueCreation(overAllTrip)
        expect(actual).toEqual(finalPay)
    })
})
