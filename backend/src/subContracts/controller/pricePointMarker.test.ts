import supertest from 'supertest'
import { app } from '../../app.ts'

const mockCreatePricePointMarker = vi.fn()

vi.mock('../models/pricePointMarker', () => ({
    create: (inputs: any) => mockCreatePricePointMarker(inputs)
}))

describe('PricePoint Controller', () => {
    test('should able to create pricePoint', async () => {
        mockCreatePricePointMarker.mockResolvedValue({
            loaction: 'UltraTech Cements'
        })
        await supertest(app).post('/api/point-marker').expect(200)
        expect(mockCreatePricePointMarker).toHaveBeenCalledTimes(1)
    })
})
