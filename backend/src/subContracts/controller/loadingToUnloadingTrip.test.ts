import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'

const mockgetTrip = vi.fn()
const mockCreateTrip = vi.fn()
const mockGetTripByVehicleNumber = vi.fn()
const mockCreateOverallTrip = vi.fn()
const mockGetPaymentDuesWithoutTripId = vi.fn()
const mockUpdatePaymentDuesWithTripId = vi.fn()
const mockGetFuelWithoutTrip = vi.fn()
const mockUpdateFuelWithTripId = vi.fn()
const mockGetCementCompanyByLocation = vi.fn()
const mockGetNumberByTruckId = vi.fn()
const mockUnbilledTrip = vi.fn()
const mockGetPricePoint = vi.fn()

vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockgetTrip(),
    create: (inputs: any) => mockCreateTrip(inputs),
    getTripByVehicleNumber: () => mockGetTripByVehicleNumber(),
    getAllUnloadingPointUnbilledTrips: () => mockUnbilledTrip()
}))
vi.mock('../models/overallTrip', () => ({
    create: (inputs: any) => mockCreateOverallTrip(inputs),
    getNumberByTruckId: (inputs: any) => mockGetNumberByTruckId(inputs)
}))
vi.mock('../models/truck', () => ({
    getNumberByTruckId: (truckId: any) => mockGetNumberByTruckId(truckId)
}))
vi.mock('../models/pricePoint', () => ({
    getPricePoint: (truckId: any) => mockGetPricePoint(truckId)
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
    }
}
const mockcreateOverallTripData = {
    id: 1
}
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
        unloadingPoint: {
            name: 'salem'
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
    stockPointId: 1
}
const paymentDuesData = {
    id: 1,
    payableAmount: 2000,
    overallTripId: null,
    type: 'fuel pay',
    fuelId: null,
    name: 'Barath Logistics Pvt Ltd',
    status: false,
    vehicleNumber: 'TN93D5512',
    dueDate: 1700764200
}
const fuelData = {
    id: 1,
    vehicleNumber: 'TN93D5512',
    pricePerliter: 100,
    quantity: 20,
    fuelStationId: 1,
    totalprice: 2000,
    overallTripId: null
}
describe('Trip Controller', () => {
    test('should able to access all trip', async () => {
        const input = { filledLoad: 40, invoiceNumber: 'ABC123' }
        mockgetTrip.mockResolvedValue(input)
        await supertest(app).get('/api/trip').expect(input)
        expect(mockgetTrip).toBeCalledWith()
    })
    test('should able to create trip with payment dues without fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData1)
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockGetPaymentDuesWithoutTripId.mockResolvedValue(null)
        mockGetFuelWithoutTrip.mockResolvedValue(null)
        await supertest(app).post('/api/trip').send(mockReq).expect(200)
        expect(mockCreateTrip).toBeCalledTimes(1)
        expect(mockCreateOverallTrip).toBeCalledTimes(1)
        expect(mockGetFuelWithoutTrip).toBeCalledTimes(1)
    })
    test('should able to create trip with payment dues with fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData2)
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockUpdateFuelWithTripId.mockResolvedValue(0)
        mockGetPaymentDuesWithoutTripId.mockResolvedValue(paymentDuesData)
        mockGetFuelWithoutTrip.mockResolvedValue(fuelData)
        const body = { ...mockReq, wantFuel: true }
        await supertest(app).post('/api/trip').send(body).expect(200)
        expect(mockCreateTrip).toBeCalledTimes(2)
        expect(mockCreateOverallTrip).toBeCalledTimes(2)
        expect(mockGetFuelWithoutTrip).toBeCalledTimes(2)
    })
    test('should return all unloading point unbilled trips', async () => {
        mockUnbilledTrip.mockResolvedValue(mockUnbilledTripData)
        await supertest(app).get('/api/unloading-point-unbilled-trips').expect(mockUnbilledTripData)
        expect(mockUnbilledTrip).toBeCalledTimes(1)
        expect(mockUnbilledTrip).toBeCalledWith()
    })
    test('should return trips by vehicle number', async () => {
        mockGetTripByVehicleNumber.mockResolvedValue([mockTripData1])
        const res = await supertest(app).get('/api/trip/TN93D5512')
        expect(res.status).toBe(200)
        expect(res.body).toEqual([mockTripData1])
        expect(mockGetTripByVehicleNumber).toHaveBeenCalledTimes(1)
    })
    test('should handle errors in creating trip', async () => {
        mockCreateTrip.mockRejectedValue(new Error('Creation failed'))
        const res = await supertest(app).post('/api/trip').send(mockReq)
        expect(res.status).toBe(500)
        expect(mockCreateTrip).toHaveBeenCalledTimes(3)
    })
})
