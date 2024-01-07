import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { app } from '../../app.ts'
import { groupDataByName } from './paymentDues.ts'

const mockgetOnlyActiveDuesByName = vi.fn()
const mockfindTripWithActiveDues = vi.fn()
const mockGetAllTrip = vi.fn()
const mockcreatePaymentDues = vi.fn()
const mockUpdatePayment = vi.fn()

vi.mock('../models/paymentDues', () => ({
    getOnlyActiveDuesByName: () => mockgetOnlyActiveDuesByName(),
    findTripWithActiveDues: () => mockfindTripWithActiveDues(),
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs),
    updatePaymentDues: () => mockUpdatePayment()
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockGetAllTrip()
}))

const mockTripWithDues = [
    {
        _count: { tripId: 2 },
        _sum: { payableAmount: 88709 },
        name: 'Barath Logistics Pvt Ltd'
    }
]

const mockAllTrip = [
    {
        id: 1,
        startDate: 1700764200,
        filledLoad: 40,
        wantFuel: null,
        tripStatus: false,
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 40000,
        totalTransporterAmount: 36000,
        transporterBalance: 0,
        margin: 4000,
        loadingPointId: 1,
        invoiceNumber: 'ABC123',
        unloadingPointId: 1,
        truckId: 1,
        loadingPoint: { name: 'Chennai' },
        unloadingPoint: { name: 'Salem' },
        truck: { vehicleNumber: 'TN93D5512', transporter: [Object] }
    }
]
const mockGroupedDueDetails = [
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: {
            count: 2,
            totalPayableAmount: 50000
        },
        tripDetails: [
            {
                id: 1,
                tripId: 1,
                payableAmount: 20000,
                type: 'initial pay',
                number: 'TN93D5512',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem'
            },
            {
                id: 2,
                tripId: 1,
                payableAmount: 68709,
                type: 'fuel pay',
                number: 'TN29B3246',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                stationLocation: {
                    fuelStation: {
                        location: 'Pondicherry'
                    }
                }
            }
        ]
    }
]
const mockActiveTrip = [
    {
        id: 1,
        payableAmount: 20000,
        tripId: 1,
        type: 'initial pay',
        name: 'Barath Logistics Pvt Ltd'
    },
    {
        id: 2,
        payableAmount: 68709,
        tripId: 2,
        type: 'initial pay',
        name: 'Barath Logistics Pvt Ltd'
    }
]

const mockUpdateData = {
    id: 1,
    transactionId: 'hgf43',
    paidAt: dayjs().unix()
}

const mockCreateDues = {
    id: 1,
    tripId: 1,
    payableAmount: 20000,
    type: 'initial pay',
    dueDate: dayjs().unix(),
    vehicleNumber: 'TN93D5512'
}

describe('Payment Due Controller', () => {
    test.skip('should group the payment dues by name', async () => {
        const data = groupDataByName(mockTripWithDues, mockActiveTrip, mockAllTrip)
        // await supertest(app).get('/api/payment-dues/1704220200/initial%20pay')
        // .expect(mockGroupedDueDetails)
        expect(mockGroupedDueDetails).toMatchObject(data)
    })
    test('should update the paymentDue with transactionId', async () => {
        mockUpdatePayment.mockResolvedValue(mockUpdateData)
        await supertest(app).put('/api/payment-dues')
        expect(mockUpdatePayment).toHaveBeenCalledTimes(1)
    })
    test('should create the paymentDue with transactionId', async () => {
        mockcreatePaymentDues.mockResolvedValue(mockCreateDues)
        await supertest(app).post('/api/payment-dues')
        expect(mockcreatePaymentDues).toHaveBeenCalledTimes(1)
    })
})
