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
const mockTransporterAccountDetails = vi.fn()
const mockBunkAccountDetails = vi.fn()
const mockFuelDetails = vi.fn()

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
vi.mock('../models/transporter', () => ({
    getTransporterAccountByName: (name: string[]) => mockTransporterAccountDetails(name)
}))
vi.mock('../models/bunk', () => ({
    getBunkAccountByName: (name: string[]) => mockBunkAccountDetails(name)
}))
vi.mock('../models/fuel', () => ({
    getFuelDetailsWithoutTrip: () => mockFuelDetails()
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
        overallTripId: 1,
        type: 'initial pay',
        name: 'Barath Logistics Pvt Ltd',
        status: false,
        vehicleNumber: 'TN93D5512'
    },
    {
        id: 3,
        payableAmount: 2300,
        overallTripId: 2,
        type: 'fuel pay',
        name: 'Barath Petroleum',
        status: false,
        vehicleNumber: 'TN29B3246'
    },
    {
        id: 4,
        payableAmount: 27940,
        overallTripId: 2,
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
        bankDetails: [
            {
                name: 'Deepak Logistics Pvt Ltd',
                accountNumber: '12334523',
                ifsc: 'HDFC1234',
                address: 'Salem',
                accountTypeNumber: 10
            }
        ],
        tripDetails: [
            {
                id: 4,
                overallTripId: 2,
                payableAmount: 27940,
                type: 'initial pay',
                number: 'TN29B3246',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                invoiceNumber: 'FDGT',
                date: 1706339785,
                fuelId: undefined,
                location: undefined
            }
        ]
    },
    {
        name: 'Barath Petroleum',
        dueDetails: {
            count: 1,
            totalPayableAmount: 2300
        },
        bankDetails: [
            {
                bunkName: 'Barath Petroleum',
                location: 'Erode',
                accountHolder: 'Barath',
                accountNumber: '156038718',
                ifsc: 'HDFC0005627',
                accountTypeNumber: 11
            }
        ],
        tripDetails: [
            {
                id: 3,
                overallTripId: 2,
                payableAmount: 2300,
                type: 'fuel pay',
                number: 'TN29B3246',
                loadingPoint: undefined,
                unloadingPoint: undefined,
                invoiceNumber: 'FDGT',
                date: 1706339785,
                fuelId: 1,
                location: 'Erode'
            }
        ]
    },
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: { count: 1, totalPayableAmount: 20000 },
        bankDetails: [
            {
                name: 'Barath Logistics Pvt Ltd',
                accountNumber: '43534523',
                ifsc: 'ICIC1234',
                address: 'Erode',
                accountTypeNumber: 10
            }
        ],
        tripDetails: [
            {
                id: 1,
                overallTripId: 1,
                payableAmount: 20000,
                type: 'initial pay',
                number: 'TN93D5512',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                invoiceNumber: 'ABC123',
                date: 1700764200,
                fuelId: undefined,
                location: undefined
            }
        ]
    }
]

const mockTransporterAccountData = [
    {
        name: 'Deepak Logistics Pvt Ltd',
        accountNumber: '12334523',
        ifsc: 'HDFC1234',
        address: 'Salem',
        accountTypeNumber: 10
    },
    {
        name: 'Barath Logistics Pvt Ltd',
        accountNumber: '43534523',
        ifsc: 'ICIC1234',
        address: 'Erode',
        accountTypeNumber: 10
    }
]
const mockBunkAccountData = [
    {
        bunkName: 'Barath Petroleum',
        location: 'Erode',
        accountHolder: 'Barath',
        accountNumber: '156038718',
        ifsc: 'HDFC0005627',
        accountTypeNumber: 11
    }
]

const mockUpdateData = {
    id: 1,
    transactionId: 'hgf43',
    paidAt: dayjs().unix()
}

const mockCreateDues = {
    id: 1,
    overallId: 1,
    payableAmount: 20000,
    type: 'initial pay',
    dueDate: dayjs().unix(),
    vehicleNumber: 'TN93D5512'
}
const mockFuelData = [
    {
        id: 1,
        fueledDate: 1706339785,
        invoiceNumber: 'FDGT',
        pricePerliter: 90,
        quantity: 10,
        totalprice: 900,
        paymentStatus: false,
        vehicleNumber: 'TN29B3246',
        bunkId: 1,
        overallTripId: null,
        bunk: {
            id: 1,
            bunkName: 'Barath Petroleum',
            location: 'Erode',
            accountHolder: 'Barath',
            accountNumber: '156038718',
            ifsc: 'HDFC0005627',
            accountTypeNumber: 11
        }
    }
]
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
        mockTransporterAccountDetails.mockResolvedValue(mockTransporterAccountData)
        mockBunkAccountDetails.mockResolvedValue(mockBunkAccountData)
        mockFuelDetails.mockResolvedValue(mockFuelData)
        await supertest(app).get('/api/payment-dues/1706340529').expect(200)
        const actual = await groupDataByName(
            mockGroupedDuesData,
            mockTripDuesData,
            mockOverallTripData,
            mockFuelData,
            mockTransporterAccountData,
            mockBunkAccountData
        )
        expect(actual).toEqual(mockGroupedDueDetails)
        expect(mockgetOnlyActiveDuesByName).toHaveBeenCalledTimes(1)
        expect(mockfindTripWithActiveDues).toHaveBeenCalledTimes(1)
        expect(mockOverAllTrip).toHaveBeenCalledTimes(1)
    })
})
