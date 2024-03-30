import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockCreateUnloadingPointTrip = vi.fn()
const mockgetOverAllTripIdByLoadingToStockId = vi.fn()
const mockupdateStockToUnloadingInOverall = vi.fn()
const mockCloseStockTrip = vi.fn()

vi.mock('../models/stockPointToUnloadingPoint', () => ({
    create: (inputs: any) => mockCreateUnloadingPointTrip(inputs)
}))
vi.mock('../models/loadingToStockPointTrip', () => ({
    closeStockTrip: (inputs: any) => mockCloseStockTrip(inputs)
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
    id: 1
}

describe('Trip Controller', () => {
    test('should able to create trip', async () => {
        mockCreateUnloadingPointTrip.mockResolvedValue(mockTripData)
        mockgetOverAllTripIdByLoadingToStockId.mockResolvedValue(
            mockOverAllTripIdByLoadingToStockId
        )
        await supertest(app).post('/api/unloading-trip').expect(200)
        expect(mockCreateUnloadingPointTrip).toBeCalledTimes(1)
        expect(mockupdateStockToUnloadingInOverall).toHaveBeenCalledWith(
            mockOverAllTripIdByLoadingToStockId.id,
            mockTripData.id
        )
        expect(mockCloseStockTrip).toHaveBeenCalledWith(mockTripData.loadingPointToStockPointTripId)
    })
})
