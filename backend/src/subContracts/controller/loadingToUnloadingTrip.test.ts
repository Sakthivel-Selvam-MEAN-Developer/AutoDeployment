import supertest from 'supertest'
import dayjs from 'dayjs'
import { app } from '../../app.ts'
import tripLogic from '../domain/tripLogics.ts'

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
    wantFuel: false
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
    wantFuel: true
}
const mockgetNumberByTruckIdData = {
    vehicleNumber: 'TN93D5512',
    transporter: {
        name: 'Barath Logistics Pvt Ltd'
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
        payableAmount: 30240
    }
]
const mockcreatePaymentDuesData2 = [
    {
        name: 'Barath Logistics Pvt Ltd',
        type: 'initial pay',
        dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
        overallTripId: 1,
        vehicleNumber: 'TN93D5512',
        payableAmount: 29240
    }
]

const tripdata1 = {
    wantFuel: false,
    totalTransporterAmount: 43200
}
const tripdata2 = {
    wantFuel: false,
    totalTransporterAmount: 43200
}
const mockFuelData = {
    id: 1,
    totalprice: 1000
}
const mockCemenCompanyData = {
    cementCompany: {
        advanceType: 70
    }
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
        mockGetNumberByTruckId.mockResolvedValue(mockgetNumberByTruckIdData)
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData1)
        mockGetPaymentDuesWithoutTripId.mockResolvedValue(null)
        mockGetFuelWithoutTrip.mockResolvedValue(null)
        mockGetCementCompanyByLocation.mockResolvedValue(mockCemenCompanyData)
        await supertest(app).post('/api/trip').expect(200)
        const acutal = await tripLogic(
            tripdata1,
            null,
            'Barath Logistics Pvt Ltd',
            1,
            'TN93D5512',
            'LoadingToUnloading',
            0
        )
        expect(acutal).toEqual(mockcreatePaymentDuesData1)
        expect(mockCreateTrip).toBeCalledTimes(1)
        expect(mockGetNumberByTruckId).toBeCalledTimes(1)
        expect(mockCreateOverallTrip).toBeCalledTimes(1)
        expect(mockCreatePaymentDues).toBeCalledTimes(1)
        expect(mockGetFuelWithoutTrip).toBeCalledTimes(1)
    })
    test('should able to create trip with payment dues with fuel', async () => {
        mockCreateTrip.mockResolvedValue(mockTripData2)
        mockGetNumberByTruckId.mockResolvedValue(mockgetNumberByTruckIdData)
        mockCreateOverallTrip.mockResolvedValue(mockcreateOverallTripData)
        mockCreatePaymentDues.mockResolvedValue(mockcreatePaymentDuesData2)
        mockGetCementCompanyByLocation.mockResolvedValue(mockCemenCompanyData)
        await supertest(app).post('/api/trip').expect(200)
        const acutal = await tripLogic(
            tripdata2,
            mockFuelData,
            'Barath Logistics Pvt Ltd',
            1,
            'TN93D5512',
            'LoadingToUnloading',
            0
        )
        expect(acutal).toEqual(mockcreatePaymentDuesData2)
        expect(mockCreateTrip).toBeCalledTimes(2)
        expect(mockGetNumberByTruckId).toBeCalledTimes(2)
        expect(mockCreateOverallTrip).toBeCalledTimes(2)
        expect(mockCreatePaymentDues).toBeCalledTimes(2)
        expect(mockGetFuelWithoutTrip).toBeCalledTimes(2)
    })
})
