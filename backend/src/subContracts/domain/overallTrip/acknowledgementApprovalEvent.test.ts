import dayjs from 'dayjs'
import { finalDueCreation } from './acknowledgementApprovalEvent.ts'

const truck = {
    vehicleNumber: 'TN93D5512',
    transporterId: 1,
    transporter: {
        id: 1,
        csmName: 'newName',
        name: 'Barath Logistics',
        tdsPercentage: null,
        transporterType: 'Market',
        gstPercentage: 10
    }
}
const loadingPoint = {
    id: 1,
    name: 'Chennai-south',
    cementCompanyId: 1,
    cementCompany: {
        name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
    }
}

const overallTrip = {
    id: 1,
    acknowledgementStatus: true,
    acknowledgementApproval: true,
    transporterInvoice: 'default-invoice',
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
            NEFTStatus: false,
            transactionId: null,
            paidAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
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
    truckId: 1,
    truck,
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
        loadingPoint,
        unloadingPoint: {
            id: 1,
            name: 'Salem',
            cementCompanyId: 1,
            cementCompany: {
                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
            }
        },
        truck
    }
}
const acknowledgementDate = dayjs.unix(
    overallTrip.acknowledgementDate ? overallTrip.acknowledgementDate : 0
)
describe('For an overall trip when ack approved event is called', () => {
    test('when acknowledgementApproval is equal to false final pay should not be created', async () => {
        const overAllTrip = { ...overallTrip, acknowledgementApproval: false }
        const finalPay = false
        const actual = await finalDueCreation(overAllTrip)
        expect(actual).toStrictEqual(finalPay)
    })

    test('when transporterInvoice is equal to "" final pay should not be created', async () => {
        const overAllTrip = { ...overallTrip, transporterInvoice: '' }
        const finalPay = false
        const actual = await finalDueCreation(overAllTrip)
        expect(actual).toStrictEqual(finalPay)
    })

    test('when transporter type is equal to own final pay should not be created', async () => {
        const overalltrip = {
            ...overallTrip,
            truck: { ...truck, transporter: { ...truck.transporter, transporterType: 'Own' } },
            loadingPointToUnloadingPointTrip: {
                totalTransporterAmount: 100000,
                truck: { ...truck, transporter: { ...truck.transporter, transporterType: 'Own' } }
            }
        }
        const finalPay = false
        const actual = await finalDueCreation(overalltrip)
        expect(actual).toStrictEqual(finalPay)
    })

    test('should be able to generate final pay for loading to stock trip', async () => {
        const overAllTrip = {
            ...overallTrip,
            truck,
            loadingPointToUnloadingPointTrip: null,
            stockPointToUnloadingPointTrip: {
                totalTransporterAmount: 100000,
                loadingPointToStockPointTrip: { totalTransporterAmount: 100000 }
            },
            loadingPointToStockPointTrip: {
                totalTransporterAmount: 100000,
                id: 1,
                filledLoad: 100,
                truck,
                loadingPointToUnloadingPointTrip: null
            }
        }
        const finalPay = [
            {
                payableAmount: 122000,
                overallTripId: 1,
                type: 'final pay',
                name: 'Barath Logistics',
                vehicleNumber: 'TN93D5512',
                dueDate: acknowledgementDate
                    .add(overallTrip.finalPayDuration ? overallTrip.finalPayDuration : 0, 'day')
                    .unix()
            }
        ]
        const actual = await finalDueCreation(overAllTrip)
        expect(actual).toStrictEqual(finalPay)
    })

    test('should be able to generate final pay for loading to unloading trip', async () => {
        const overAllTrip = overallTrip
        const finalPay = [
            {
                payableAmount: 22000,
                overallTripId: 1,
                type: 'final pay',
                name: 'Barath Logistics',
                vehicleNumber: 'TN93D5512',
                dueDate: acknowledgementDate
                    .add(overallTrip.finalPayDuration ? overallTrip.finalPayDuration : 0, 'day')
                    .unix()
            }
        ]
        const actual = await finalDueCreation(overAllTrip)
        expect(actual).toStrictEqual(finalPay)
    })
})
