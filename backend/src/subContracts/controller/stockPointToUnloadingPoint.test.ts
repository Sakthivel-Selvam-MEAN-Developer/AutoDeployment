import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockCreateUnloadingPointTrip = vi.fn()
const mockgetOverAllTripIdByLoadingToStockId = vi.fn()
const mockupdateStockToUnloadingInOverall = vi.fn()
const mockCloseStockTrip = vi.fn()
const mockGetDriverIdByTripId = vi.fn()
const mockGetTripSalaryDetailsByLoactionId = vi.fn()
const mockCeateDriverTrip = vi.fn()

vi.mock('../models/stockPointToUnloadingPoint', () => ({
    create: (inputs: any) => mockCreateUnloadingPointTrip(inputs)
}))
vi.mock('../models/loadingToStockPointTrip', () => ({
    closeStockTrip: (inputs: any) => mockCloseStockTrip(inputs)
}))
vi.mock('../../driverSalary/models/driverTrip', () => ({
    create: (inputs: any) => mockCeateDriverTrip(inputs),
    getDriverIdByTripId: (inputs: any) => mockGetDriverIdByTripId(inputs)
}))
vi.mock('../../driverSalary/models/tripSalary', () => ({
    getTripSalaryDetailsByLoactionId: (input1: any, input2: any, input3: any) =>
        mockGetTripSalaryDetailsByLoactionId(input1, input2, input3)
}))
vi.mock('../models/overallTrip', () => ({
    getOverAllTripIdByLoadingToStockId: (inputs: any) =>
        mockgetOverAllTripIdByLoadingToStockId(inputs),
    updateStockToUnloadingInOverall: (inputs: any, data: any) =>
        mockupdateStockToUnloadingInOverall(inputs, data)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))

const mockTripData = {
    id: 1,
    startDate: 1703679340,
    invoiceNumber: 'DSJKHABFJKD',
    freightAmount: 3000,
    transporterAmount: 2500,
    loadingPointToStockPointTripId: 1,
    unloadingPointId: 1
}

const mockOverAllTripIdByLoadingToStockId = {
    id: 1,
    loadingPointToStockPointTrip: {
        stockPointId: 1
    }
}
const mockGetTripSalaryDetailsByLoactionIdData = {
    id: 3,
    dailyBetta: 350,
    driverAdvance: 1200,
    tripBetta: 4500
}
const mockGetDriverIdByTripIdData = { driverId: 1 }

const mockBody = {
    startDate: 1714501800,
    invoiceNumber: 'asdas',
    freightAmount: 3000,
    transporterAmount: 2640,
    totalFreightAmount: 36000,
    totalTransporterAmount: 31680,
    unloadingPointId: 1,
    loadingPointToStockPointTripId: 3,
    truckId: 6
}
const mockCreateDriverTripData = {
    id: 10,
    tripId: 44,
    driverId: 34,
    tripSalaryId: 3
}
describe('Trip Controller', () => {
    test('should able to create trip', async () => {
        mockCreateUnloadingPointTrip.mockResolvedValue(mockTripData)
        mockgetOverAllTripIdByLoadingToStockId.mockResolvedValue(
            mockOverAllTripIdByLoadingToStockId
        )
        await supertest(app)
            .post('/api/unloading-trip')
            .send(mockBody)
            .query({ type: 'Market Transporter', stockPointId: 1 })
            .expect(200)
        expect(mockCreateUnloadingPointTrip).toBeCalledTimes(1)
        expect(mockupdateStockToUnloadingInOverall).toHaveBeenCalledWith(
            mockOverAllTripIdByLoadingToStockId.id,
            mockTripData.id
        )
        expect(mockCloseStockTrip).toHaveBeenCalledWith(mockTripData.loadingPointToStockPointTripId)
    })
    test('should able to create driver trip for stock - unloading trip', async () => {
        mockCreateUnloadingPointTrip.mockResolvedValue(mockTripData)
        mockgetOverAllTripIdByLoadingToStockId.mockResolvedValue(
            mockOverAllTripIdByLoadingToStockId
        )
        mockGetDriverIdByTripId.mockResolvedValue(mockGetDriverIdByTripIdData)
        mockGetTripSalaryDetailsByLoactionId.mockResolvedValue(
            mockGetTripSalaryDetailsByLoactionIdData
        )
        mockCeateDriverTrip.mockResolvedValue(mockCreateDriverTripData)
        await supertest(app)
            .post('/api/unloading-trip')
            .send(mockBody)
            .query({ type: 'Own', stockPointId: 1 })
            .expect(200)

        expect(mockCreateUnloadingPointTrip).toBeCalledTimes(2)
        expect(mockupdateStockToUnloadingInOverall).toHaveBeenCalledWith(
            mockOverAllTripIdByLoadingToStockId.id,
            mockTripData.id
        )
        expect(mockCloseStockTrip).toHaveBeenCalledWith(mockTripData.loadingPointToStockPointTripId)
        expect(mockGetDriverIdByTripId).toHaveBeenCalledWith(mockOverAllTripIdByLoadingToStockId.id)
        expect(mockGetTripSalaryDetailsByLoactionId).toHaveBeenCalledWith(
            '',
            mockBody.unloadingPointId.toString(),
            mockOverAllTripIdByLoadingToStockId.loadingPointToStockPointTrip.stockPointId.toString()
        )

        expect(mockGetTripSalaryDetailsByLoactionId).toHaveBeenCalledTimes(1)
        expect(mockGetDriverIdByTripId).toHaveBeenCalledTimes(1)

        expect(mockCeateDriverTrip).toHaveBeenCalledWith({
            tripId: mockOverAllTripIdByLoadingToStockId.id,
            tripStartDate: mockBody.startDate,
            driverId: mockGetDriverIdByTripIdData.driverId,
            tripSalaryId: mockGetTripSalaryDetailsByLoactionIdData.id
        })
    })
})
