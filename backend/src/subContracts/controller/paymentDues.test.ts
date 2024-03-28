import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { app } from '../../app.ts'
import { groupDataByName, groupGstDue } from './paymentDues.ts'

const mockgetOnlyActiveDuesByName = vi.fn()
const mockfindTripWithActiveDues = vi.fn()
const mockGetAllTrip = vi.fn()
const mockcreatePaymentDues = vi.fn()
const mockUpdatePayment = vi.fn()
const mockOverAllTrip = vi.fn()
const mockTransporterAccountDetails = vi.fn()
const mockBunkAccountDetails = vi.fn()
const mockFuelDetails = vi.fn()
const mockgetUpcomingDuesByFilter = vi.fn()
const mockgetGstDuesGroupByName = vi.fn()
const mockgetTransporterAccountByName = vi.fn()
const mockgetGstPaymentDues = vi.fn()
const mockGetUpcomingPaymentDues = vi.fn()
const mockGeCompletedPaymentDues = vi.fn()
const mockUpdateNEFTStatus = vi.fn()

vi.mock('../models/paymentDues', () => ({
    getOnlyActiveDuesByName: () => mockgetOnlyActiveDuesByName(),
    findTripWithActiveDues: () => mockfindTripWithActiveDues(),
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs),
    updatePaymentDues: () => mockUpdatePayment(),
    getUpcomingDuesByFilter: (name: string, from: number, to: number) =>
        mockgetUpcomingDuesByFilter(name, from, to),
    getGstDuesGroupByName: () => mockgetGstDuesGroupByName(),
    getTransporterAccountByName: () => mockgetTransporterAccountByName(),
    getGstPaymentDues: () => mockgetGstPaymentDues(),
    getUpcomingDuesByDefault: () => mockGetUpcomingPaymentDues(),
    updatePaymentNEFTStatus: (dueId: number[]) => mockUpdateNEFTStatus(dueId),
    getCompletedDues: (name: string, from: number, to: number, page: number) =>
        mockGeCompletedPaymentDues(name, from, to, page)
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
        fuelId: null,
        name: 'Barath Logistics Pvt Ltd',
        status: false,
        vehicleNumber: 'TN93D5512'
    },
    {
        id: 3,
        payableAmount: 2300,
        overallTripId: 2,
        type: 'fuel pay',
        fuelId: 1,
        name: 'Barath Petroleum',
        status: false,
        vehicleNumber: 'TN29B3246'
    },
    {
        id: 4,
        payableAmount: 27940,
        overallTripId: 2,
        type: 'initial pay',
        fuelId: null,
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
                branchName: 'Salem',
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
                branchName: 'Erode',
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
                branchName: 'Erode',
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
        branchName: 'Salem',
        accountTypeNumber: 10
    },
    {
        name: 'Barath Logistics Pvt Ltd',
        accountNumber: '43534523',
        ifsc: 'ICIC1234',
        branchName: 'Erode',
        accountTypeNumber: 10
    }
]
const mockBunkAccountData = [
    {
        bunkName: 'Barath Petroleum',
        branchName: 'Erode',
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
const mockTransporterDuesDues = {
    id: 1,
    overallId: 1,
    name: 'Barath Logistics Pvt Ltd',
    payableAmount: 20000,
    type: 'final pay',
    dueDate: 1706725800,
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

const mockgroupedGSTDues = [
    {
        _count: { status: 1 },
        _sum: { payableAmount: 2376 },
        name: 'Dalmia Cements'
    }
]

const mockBankDetails = [
    {
        name: 'Dalmia Cements',
        accountNumber: '3242343',
        ifsc: '234',
        branchName: '34234',
        accountTypeNumber: 12
    }
]

const mockGstPaymentDues = [
    {
        id: 9,
        payableAmount: 2376,
        overallTripId: 4,
        type: 'gst pay',
        name: 'Dalmia Cements',
        vehicleNumber: 'KR10S1290',
        status: false,
        fuelId: null
    }
]

const mockGroupedGSTDetails = [
    {
        name: 'Dalmia Cements',
        dueDetails: {
            count: 1,
            payableAmount: 2376
        },
        bankDetails: [
            {
                name: 'Dalmia Cements',
                accountNumber: '3242343',
                ifsc: '234',
                branchName: '34234',
                accountTypeNumber: 12
            }
        ],
        tripDetails: [
            {
                id: 9,
                vehicleNumber: 'KR10S1290',
                type: 'gst pay',
                amount: 2376
            }
        ]
    }
]

const mockUpcomigPaymentDuesData = [
    {
        overallTrip: {
            loadingPointToStockPointTrip: {
                truck: {
                    transporter: {
                        csmName: 'Bharath'
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                truck: {
                    transporter: {
                        csmName: 'Sakthivel'
                    }
                }
            }
        }
    }
]
const mockCompletedPaymentDuesData = [
    {
        name: 'Bharath Petroleum',
        paidAt: 1708335851,
        transactionId: '123ABC',
        type: 'fuel pay',
        payableAmount: 12000,
        overallTrip: {
            loadingPointToStockPointTrip: {
                truck: {
                    transporter: {
                        csmName: 'Bharath'
                    }
                }
            },
            loadingPointToUnloadingPointTrip: {
                truck: {
                    transporter: {
                        csmName: 'Sakthivel'
                    }
                }
            }
        }
    }
]
const mockUpdateNEFTStatusData = {
    NEFTStatus: true
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
    test('should list all upcoming payment dues', async () => {
        mockgetUpcomingDuesByFilter.mockResolvedValue(mockTransporterDuesDues)
        await supertest(app).get(
            '/api/payment-dues/Barath%20Logistics%20Pvt%20Ltd/1706725800/1706725800'
        )
        expect(mockgetUpcomingDuesByFilter).toHaveBeenCalledTimes(1)
    })
    test('should get the active transporter payment dues', async () => {
        mockgetOnlyActiveDuesByName.mockResolvedValue(mockGroupedDuesData)
        mockfindTripWithActiveDues.mockResolvedValue(mockTripDuesData)
        mockOverAllTrip.mockResolvedValue(mockOverallTripData)
        mockFuelDetails.mockResolvedValue(mockFuelData)
        mockTransporterAccountDetails.mockResolvedValue(mockTransporterAccountData)
        mockBunkAccountDetails.mockResolvedValue(mockBunkAccountData)
        const actual = await groupDataByName(
            mockGroupedDuesData,
            mockTripDuesData,
            mockOverallTripData,
            mockFuelData,
            mockTransporterAccountData,
            mockBunkAccountData
        )
        expect(actual).toEqual(mockGroupedDueDetails)
        await supertest(app).get('/api/payment-dues/1706340529/true').expect(200)
        expect(mockgetOnlyActiveDuesByName).toHaveBeenCalledTimes(1)
        expect(mockfindTripWithActiveDues).toHaveBeenCalledTimes(1)
        expect(mockOverAllTrip).toHaveBeenCalledTimes(1)
    })
    test('should get active gst payment dues', async () => {
        mockgetGstDuesGroupByName.mockResolvedValue(mockgroupedGSTDues)
        mockgetTransporterAccountByName.mockResolvedValue(mockBankDetails)
        mockgetGstPaymentDues.mockResolvedValue(mockGstPaymentDues)
        await supertest(app).get('/api/payment-dues/false').expect(200)
        const actual = await groupGstDue(mockgroupedGSTDues, mockGstPaymentDues, mockBankDetails)
        expect(actual).toEqual(mockGroupedGSTDetails)
        expect(mockgetGstDuesGroupByName).toHaveBeenCalledTimes(1)
        expect(mockgetGstPaymentDues).toHaveBeenCalledTimes(1)
    })
    test('should list all upcoming payment dues by default', async () => {
        mockGetUpcomingPaymentDues.mockResolvedValue(mockUpcomigPaymentDuesData)
        await supertest(app)
            .get('/api/upcoming-payment-dues/default')
            .expect(mockUpcomigPaymentDuesData)
        await supertest(app).get('/api/upcoming-payment-dues/default').expect(200)
        expect(mockGetUpcomingPaymentDues).toHaveBeenCalledTimes(2)
    })
    test('should get upcoming payment dues', async () => {
        mockGeCompletedPaymentDues.mockResolvedValue(mockCompletedPaymentDuesData)
        await supertest(app)
            .get('/api/completed-payment-dues/Bharath Petroleum/1710840451/1710841451/1')
            .expect(mockCompletedPaymentDuesData)
        await supertest(app)
            .get('/api/completed-payment-dues/Bharath Petroleum/1710840451/1710841451/1')
            .expect(200)
        expect(mockGeCompletedPaymentDues).toHaveBeenCalledTimes(2)
    })
    test('should update NEFT Status', async () => {
        mockUpdateNEFTStatus.mockResolvedValue(mockUpdateNEFTStatusData)
        await supertest(app).put('/api/payment-dues/NEFT').expect(200)
        expect(mockUpdateNEFTStatus).toHaveBeenCalledTimes(1)
    })
})
