import supertest from 'supertest'
import { app } from '../../app.ts'
import { createStockPointToUnloadingPointTrip } from './stockPointToUnloadingPoint.ts'

const mockCreateUnloadingPointTrip = vi.fn()

vi.mock('../models/stockPointToUnloadingPoint', () => ({
    create: (inputs: any) => mockCreateUnloadingPointTrip(inputs)
}))

const mockTripData = {
    startDate: 1703679340,
    invoiceNumber: 'DSJKHABFJKD',
    freightAmount: 3000,
    transporterAmount: 2500,
    loadingPointToStockPointTripId: 1,
    unloadingPointId: 1
}

describe('Trip Controller', () => {
    test('should able to create trip', async () => {
        app.post('/unloading-trip', createStockPointToUnloadingPointTrip)
        mockCreateUnloadingPointTrip.mockResolvedValue(mockTripData)
        await supertest(app).post('/unloading-trip').expect(200)
        expect(mockCreateUnloadingPointTrip).toBeCalledTimes(1)
    })
})
