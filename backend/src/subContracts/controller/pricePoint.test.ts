import supertest from 'supertest'
import { app } from '../../app.ts'

const mockPricePoint = jest.fn()

jest.mock('../models/pricePoint', () => ({
    getPricePoint: (factoryId: number, deliveryPointId: number) =>
        mockPricePoint(factoryId, deliveryPointId)
}))

describe('PricePoint Controller', () => {
    test('should able to access', async () => {
        mockPricePoint.mockResolvedValue({ freightAmount: 1000, transporterAmount: 900 })
        await supertest(app).get('/price-point/1/1').expect({
            freightAmount: 1000,
            transporterAmount: 900
        })
        expect(mockPricePoint).toBeCalledWith(1, 1)
    })
})
