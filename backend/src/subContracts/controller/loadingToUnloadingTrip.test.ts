import supertest from 'supertest'
import dayjs from 'dayjs'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { loadingToUnloadingTripLogic } from '../domain/loadingToUnloadingTripLogic.ts'

const mockgetTrip = vi.fn()
const mockCreateTrip = vi.fn()
const mockGetTripByVehicleNumber = vi.fn()
const mockCreateOverallTrip = vi.fn()
const mockGetNumberByTruckId = vi.fn()
const mockCreatePaymentDues = vi.fn()
const mockGetPaymentDuesWithoutTripId = vi.fn()
const mockUpdatePaymentDuesWithTripId = vi.fn()
const mockGetFuelWithoutTrip = vi.fn()
const mockUpdateFuelWithTripId = vi.fn()
const mockGetCementCompanyByLocation = vi.fn()

vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockgetTrip(),
    create: (inputs: any) => mockCreateTrip(inputs),
    getTripByVehicleNumber: () => mockGetTripByVehicleNumber()
}))
vi.mock('../models/overallTrip', () => ({
    create: (inputs: any) => mockCreateOverallTrip(inputs)
}))
vi.mock('../models/truck', () => ({
    getNumberByTruckId: (truckId: any) => mockGetNumberByTruckId(truckId)
}))
vi.mock('../models/paymentDues', () => ({
    create: (inputs: any) => mockCreatePaymentDues(inputs),
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
const mockTripData1 = {
    id: 1,
    truckId: 1,
    loadingPointId: 1,
    unloadingPointId: 1,
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
    unloadingPointId: 1,
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

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

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
    stockPointId: 1
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
    stockPointId: 1
}
const mockFuelDetails = {
    id: 1,
    fueledDate: 1718908200,
    invoiceNumber: 'axsdcrtysdfcu',
    pricePerliter: 100,
    quantity: 120,
    totalprice: 12000,
    dieselkilometer: 0,
    fuelType: '',
    paymentStatus: false,
    vehicleNumber: 'TN29B3246',
    bunkId: 2,
    overallTripId: null,
    bunk: { bunkName: 'Sakthivel Barath Petroleum' }
}
describe('Trip Controller', () => {
    test('should able to access all trip', async () => {
        mockgetTrip.mockResolvedValue({
            filledLoad: 40,
            invoiceNumber: 'ABC123'
        })
        await supertest(app).get('/api/trip').expect({
            filledLoad: 40,
            invoiceNumber: 'ABC123'
        })
        expect(mockgetTrip).toBeCalledWith()
    })
    test('should able to create trip with payment dues without fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData1)
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData1)
        mockGetPaymentDuesWithoutTripId.mockResolvedValue(null)
        mockGetFuelWithoutTrip.mockResolvedValue(null)
        await supertest(app).post('/api/trip').send(mockReq).expect(200)
        const acutal = await loadingToUnloadingTripLogic(
            mockTripData1.truck.transporter.transporterType,
            mockReq,
            null,
            mockTripData1.truck.transporter.name,
            mockTripData1.id,
            mockTripData1.truck.vehicleNumber,
            'LoadingToUnloading',
            mockTripData1.loadingPoint.cementCompany.advanceType,
            mockRes
        )
        expect(acutal).toEqual(mockcreatePaymentDuesData1)
        expect(mockCreateTrip).toBeCalledTimes(1)
        expect(mockCreateOverallTrip).toBeCalledTimes(1)
        expect(mockCreatePaymentDues).toBeCalledTimes(1)
        expect(mockGetFuelWithoutTrip).toBeCalledTimes(1)
    })
    test('should able to create trip with payment dues with fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData2)
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData2)
        await supertest(app).post('/api/trip').send(mockReq2).expect(200)
        const acutal = await loadingToUnloadingTripLogic(
            mockTripData2.truck.transporter.transporterType,
            mockReq,
            mockFuelDetails,
            mockTripData2.truck.transporter.name,
            mockTripData2.id,
            mockTripData2.truck.vehicleNumber,
            'LoadingToUnloading',
            mockTripData2.loadingPoint.cementCompany.advanceType,
            mockRes
        )
        expect(acutal).toEqual(mockcreatePaymentDuesData2)
        expect(mockCreateTrip).toBeCalledTimes(2)
        expect(mockCreateOverallTrip).toBeCalledTimes(2)
        expect(mockGetFuelWithoutTrip).toBeCalledTimes(2)
    })
})
