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
const mockOverAllTrip = vi.fn()

vi.mock('../models/paymentDues', () => ({
    getOnlyActiveDuesByName: () => mockgetOnlyActiveDuesByName(),
    findTripWithActiveDues: () => mockfindTripWithActiveDues(),
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs),
    updatePaymentDues: () => mockUpdatePayment()
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockGetAllTrip()
}))
vi.mock('../models/overallTrip', () => ({
    getOverallTrip: () => mockOverAllTrip()
}))

const mockGroupedDuesData = [
    {
        _count: { status: 1 },
        _sum: { payableAmount: 27940 },
        name: 'Deepak Logistics Pvt Ltd'
    },
    {
        _count: { status: 1 },
        _sum: { payableAmount: 2300 },
        name: 'Barath Petroleum'
    },
    {
        _count: { status: 1 },
        _sum: { payableAmount: 20000 },
        name: 'Barath Logistics Pvt Ltd'
    }
]
const mockTripDuesData = [
    {
        id: 1,
        payableAmount: 20000,
        tripId: 1,
        type: 'initial pay',
        name: 'Barath Logistics Pvt Ltd',
        status: false,
        vehicleNumber: 'TN93D5512'
    },
    {
        id: 3,
        payableAmount: 2300,
        tripId: 2,
        type: 'fuel pay',
        name: 'Barath Petroleum',
        status: false,
        vehicleNumber: 'TN29B3246'
    },
    {
        id: 4,
        payableAmount: 27940,
        tripId: 2,
        type: 'initial pay',
        name: 'Deepak Logistics Pvt Ltd',
        status: false,
        vehicleNumber: 'TN29B3246'
    }
]
const mockOverallTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 1,
            startDate: 1700764200,
            filledLoad: 40,
            wantFuel: null,
            tripStatus: false,
            unloadedWeight: null,
            acknowledgeDueTime: null,
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 40000,
            totalTransporterAmount: 36000,
            margin: 4000,
            loadingPointId: 1,
            invoiceNumber: 'ABC123',
            unloadingPointId: 1,
            truckId: 1,
            loadingPoint: { name: 'Chennai' },
            unloadingPoint: { name: 'Salem' },
            truck: { vehicleNumber: 'TN93D5512', transporter: { name: 'Barath Logistics Pvt Ltd' } }
        }
    },
    {
        id: 2,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 2,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 2,
            startDate: 1706339785,
            filledLoad: 48,
            wantFuel: false,
            tripStatus: false,
            unloadedWeight: null,
            acknowledgeDueTime: null,
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 48000,
            totalTransporterAmount: 43200,
            margin: 4800,
            loadingPointId: 1,
            invoiceNumber: 'FDGT',
            unloadingPointId: 1,
            truckId: 3,
            loadingPoint: { name: 'Chennai' },
            unloadingPoint: { name: 'Salem' },
            truck: { vehicleNumber: 'TN29B3246', transporter: { name: 'Deepak Logistics Pvt Ltd' } }
        }
    }
]

const mockGroupedDueDetails = [
    {
        name: 'Deepak Logistics Pvt Ltd',
        dueDetails: {
            count: 1,
            totalPayableAmount: 27940
        },
        tripDetails: [
            {
                id: 4,
                tripId: 2,
                payableAmount: 27940,
                type: 'initial pay',
                number: 'TN29B3246',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                invoiceNumber: 'FDGT',
                date: 1706339785
            }
        ]
    },
    {
        name: 'Barath Petroleum',
        dueDetails: {
            count: 1,
            totalPayableAmount: 2300
        },
        tripDetails: [
            {
                id: 3,
                tripId: 2,
                payableAmount: 2300,
                type: 'fuel pay',
                number: 'TN29B3246',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                invoiceNumber: 'FDGT',
                date: 1706339785
            }
        ]
    },
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: { count: 1, totalPayableAmount: 20000 },
        tripDetails: [
            {
                id: 1,
                tripId: 1,
                payableAmount: 20000,
                type: 'initial pay',
                number: 'TN93D5512',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                invoiceNumber: 'ABC123',
                date: 1700764200
            }
        ]
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
    test('should get the active transporter payment dues', async () => {
        mockgetOnlyActiveDuesByName.mockResolvedValue(mockGroupedDuesData)
        mockfindTripWithActiveDues.mockResolvedValue(mockTripDuesData)
        mockOverAllTrip.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/payment-dues/1706340529').expect(200)
        const actual = await groupDataByName(
            mockGroupedDuesData,
            mockTripDuesData,
            mockOverallTripData
        )
        expect(actual).toEqual(mockGroupedDueDetails)
        expect(mockgetOnlyActiveDuesByName).toHaveBeenCalledTimes(1)
        expect(mockfindTripWithActiveDues).toHaveBeenCalledTimes(1)
        expect(mockOverAllTrip).toHaveBeenCalledTimes(1)
    })
})
