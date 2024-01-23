import supertest from 'supertest'
import { app } from '../../app.ts'

const mockPricePoint = vi.fn()
const mockCreatePricePoint = vi.fn()

vi.mock('../models/pricePoint', () => ({
    getPricePoint: (loadingPointId: number, unloadingPointId: number, stockPointId: null) =>
        mockPricePoint(loadingPointId, unloadingPointId, stockPointId),
    create: (inputs: any) => mockCreatePricePoint(inputs)
}))

describe('PricePoint Controller', () => {
    test('should able to access', async () => {
        mockPricePoint.mockResolvedValue({ freightAmount: 1000, transporterAmount: 900 })
        await supertest(app).get('/api/price-point/1/1/null').expect({
            freightAmount: 1000,
            transporterAmount: 900
        })
        expect(mockPricePoint).toHaveBeenCalledTimes(1)
    })
    test('should able to create pricePoint', async () => {
        mockCreatePricePoint.mockResolvedValue({
            loadingPointId: 1,
            unloadingPointId: null,
            stockPointId: 1,
            freightAmount: 1007,
            transporterPercentage: 8,
            transporterAmount: 926.44
        })
        await supertest(app).post('/api/price-point').expect(200)
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(1)
    })
})
