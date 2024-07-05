import supertest from 'supertest'
import dayjs from 'dayjs'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'

const mockCreateTrip = vi.fn()
const mockStockPointTrip = vi.fn()
const mockCreateOverallTrip = vi.fn()
const mockGetNumberByTruckId = vi.fn()
const mockCreatePaymentDues = vi.fn()
const mockGetPaymentDuesWithoutTripId = vi.fn()
const mockUpdatePaymentDuesWithTripId = vi.fn()
const mockGetFuelWithoutTrip = vi.fn()
const mockUpdateFuelWithTripId = vi.fn()
const mockGetCementCompanyByLocation = vi.fn()
const mockGetPricePoint = vi.fn()
const mockUnbilledTrip = vi.fn()

vi.mock('../models/loadingToStockPointTrip', () => ({
    create: (inputs: any) => mockCreateTrip(inputs),
    getAllStockPointTrip: () => mockStockPointTrip(),
    getAllStockPointUnbilledTrips: () => mockUnbilledTrip()
}))
vi.mock('../models/overallTrip', () => ({
    create: (inputs: any) => mockCreateOverallTrip(inputs)
}))
vi.mock('../models/pricePoint', () => ({
    getPricePoint: (input1: any, input2: any, input3: any) =>
        mockGetPricePoint(input1, input2, input3)
}))
vi.mock('../models/truck', () => ({
    getNumberByTruckId: (truckId: any) => mockGetNumberByTruckId(truckId)
}))
vi.mock('../models/paymentDues', () => ({
    getPaymentDuesWithoutTripId: (vehicleNumber: any) =>
        mockGetPaymentDuesWithoutTripId(vehicleNumber),
    updatePaymentDuesWithTripId: (inputs: any) => mockUpdatePaymentDuesWithTripId(inputs)
}))
vi.mock('../models/fuel', () => ({
    getFuelWithoutTrip: (vehicleNumber: any) => mockGetFuelWithoutTrip(vehicleNumber),
    updateFuelWithTripId: (inputs: any) => mockUpdateFuelWithTripId(inputs)
}))
vi.mock('../models/loadingPoint', () => ({
    getCementCompanyByLocation: (vehicleNumber: any) =>
        mockGetCementCompanyByLocation(vehicleNumber)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockGetTripData = [
    {
        id: 1,
        startDate: 1703679340,
        filledLoad: 48,
        wantFuel: false,
        tripStatus: false,
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 48000,
        totalTransporterAmount: 43200,
        margin: 4800,
        loadingPointId: 1,
        invoiceNumber: 'AGTH5312WE',
        stockPointId: 1,
        truckId: 1,
        loadingPoint: {
            name: 'Chennai'
        },
        stockPoint: {
            name: 'StockPoint'
        },
        truck: {
            vehicleNumber: 'TN22E3456',
            transporter: {
                name: 'Deepak Logistics Pvt Ltd'
            }
        },
        stockPointToUnloadingPointTrip: []
    }
]
const mockTripData1 = {
    id: 1,
    truckId: 1,
    loadingPointId: 1,
    stockPointId: 1,
    startDate: 1703679340,
    filledLoad: 48,
    invoiceNumber: 'AGTH5312WE',
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 48000,
    totalTransporterAmount: 43200,
    margin: 4800,
    wantFuel: false,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market'
        }
    },
    loadingPoint: {
        cementCompany: { advanceType: 70 }
    }
}
const mockTripData2 = {
    id: 1,
    truckId: 1,
    loadingPointId: 1,
    stockPointId: 1,
    startDate: 1703679340,
    filledLoad: 48,
    invoiceNumber: 'AGTH5312WE',
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 48000,
    totalTransporterAmount: 43200,
    margin: 4800,
    wantFuel: true,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market'
        }
    },
    loadingPoint: {
        cementCompany: { advanceType: 70 }
    }
}

const mockcreateOverallTripData = {
    id: 1
}
const mockcreatePaymentDuesData1 = [
    {
        name: 'Barath Logistics Pvt Ltd',
        type: 'initial pay',
        dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
        overallTripId: 1,
        vehicleNumber: 'TN93D5512',
        payableAmount: 35280,
        transactionId: '',
        NEFTStatus: false,
        paidAt: 0
    }
]
const mockcreatePaymentDuesData2 = [
    {
        name: 'Barath Logistics Pvt Ltd',
        type: 'initial pay',
        dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
        overallTripId: 1,
        vehicleNumber: 'TN93D5512',
        payableAmount: 23280,
        transactionId: '',
        NEFTStatus: false,
        paidAt: 0
    }
]
const mockUnbilledTripData = [
    {
        id: 1,
        invoiceNumber: 'ABC123',
        startDate: 1703679340,
        acknowledgeDueTime: 1703679340,
        truck: {
            vehicleNumber: 'TN93D5512'
        },
        loadingPoint: {
            name: 'chennai',
            cementCompany: {
                name: 'XYZ Cements'
            }
        },
        stockPoint: {
            name: 'Stock Point'
        }
    }
]

const mockReq = {
    truckId: 2,
    loadingPointId: 1,
    startDate: 1717525800,
    filledLoad: 56,
    invoiceNumber: 'zaxc',
    loadingKilometer: 0,
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 56000,
    totalTransporterAmount: 50400,
    margin: 3920,
    wantFuel: false,
    partyName: 'zxczx',
    lrNumber: 'zxczxc',
    stockPointId: 1,
    vehicleNumber: 'TN93D5512'
}
const mockReq2 = {
    truckId: 2,
    loadingPointId: 1,
    startDate: 1717525800,
    filledLoad: 56,
    invoiceNumber: 'zaxc',
    loadingKilometer: 0,
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 56000,
    totalTransporterAmount: 50400,
    margin: 3920,
    wantFuel: true,
    partyName: 'zxczx',
    lrNumber: 'zxczxc',
    stockPointId: 1,
    vehicleNumber: 'TN93D5512'
}
describe('Trip Controller', () => {
    test('should be able to access all stock point trips', async () => {
        mockStockPointTrip.mockResolvedValue(mockGetTripData)
        const res = await supertest(app).get('/api/stock-trip')
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockGetTripData)
        expect(mockStockPointTrip).toHaveBeenCalledTimes(1)
    })

    test('should create trip with payment dues without fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData1)
        mockGetPricePoint.mockResolvedValue({
            freightAmount: 1000,
            transporterAmount: 900,
            transporterPercentage: 70,
            payGeneratingDuration: 0
        })
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData1)
        mockGetFuelWithoutTrip.mockResolvedValue(null)
        const res = await supertest(app).post('/api/stock-trip').send(mockReq)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({ id: mockcreateOverallTripData.id })
        expect(mockCreateTrip).toHaveBeenCalledTimes(1)
        expect(mockCreateOverallTrip).toHaveBeenCalledTimes(1)
        expect(mockCreatePaymentDues).toHaveBeenCalledTimes(0)
        expect(mockGetFuelWithoutTrip).toHaveBeenCalledTimes(1)
    })
    test('should create trip with payment dues with fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData2)
        mockGetPricePoint.mockResolvedValue({
            freightAmount: 1000,
            transporterAmount: 900,
            transporterPercentage: 70,
            payGeneratingDuration: 0
        })
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData2)
        mockGetFuelWithoutTrip.mockResolvedValue({ id: 1, vehicleNumber: 'TN93D5512' })
        const res = await supertest(app).post('/api/stock-trip').send(mockReq2)
        expect(res.status).toBe(500)
        expect(mockCreateTrip).toHaveBeenCalledTimes(2)
        expect(mockCreateOverallTrip).toHaveBeenCalledTimes(2)
        expect(mockCreatePaymentDues).toHaveBeenCalledTimes(0)
        expect(mockGetFuelWithoutTrip).toHaveBeenCalledTimes(2)
        expect(mockUpdateFuelWithTripId).toHaveBeenCalledTimes(1)
    })

    test('should return all stock point unbilled trips', async () => {
        mockUnbilledTrip.mockResolvedValue(mockUnbilledTripData)
        const res = await supertest(app).get('/api/stock-point-unbilled-trips')
        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockUnbilledTripData)
        expect(mockUnbilledTrip).toHaveBeenCalledTimes(1)
    })

    test('should handle error when creating trip', async () => {
        mockCreateTrip.mockRejectedValue(new Error('Creation failed'))
        const res = await supertest(app).post('/api/stock-trip').send(mockReq)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Something went Wrong')
    })

    test('should handle error when fetching price point', async () => {
        mockGetPricePoint.mockRejectedValue(new Error('Price point fetch failed'))
        const res = await supertest(app).post('/api/stock-trip').send(mockReq)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Something went Wrong')
    })

    test('should handle error when creating overall trip', async () => {
        mockCreateOverallTrip.mockRejectedValue(new Error('Overall trip creation failed'))
        const res = await supertest(app).post('/api/stock-trip').send(mockReq)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Something went Wrong')
    })

    test('should handle error when updating payment dues', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData2)
        mockGetPricePoint.mockResolvedValue({
            freightAmount: 1000,
            transporterAmount: 900,
            transporterPercentage: 70,
            payGeneratingDuration: 0
        })
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData2)
        mockGetFuelWithoutTrip.mockResolvedValue({ id: 1, vehicleNumber: 'TN93D5512' })
        mockUpdatePaymentDuesWithTripId.mockRejectedValue(new Error('Payment dues update failed'))
        const res = await supertest(app).post('/api/stock-trip').send(mockReq2)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('error', 'Something went Wrong')
    })
})
