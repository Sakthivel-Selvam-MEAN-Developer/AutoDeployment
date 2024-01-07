import supertest from 'supertest'
import { app } from '../../app.ts'

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
        mockCreateUnloadingPointTrip.mockResolvedValue(mockTripData)
        await supertest(app).post('/api/unloading-trip').expect(200)
        expect(mockCreateUnloadingPointTrip).toBeCalledTimes(1)
    })
})
