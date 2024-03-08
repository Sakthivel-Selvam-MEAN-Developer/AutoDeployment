import supertest from 'supertest'
import { app } from '../../app.ts'

const mockCreatePricePointMarker = vi.fn()

vi.mock('../models/pricePointMarker', () => ({
    create: (inputs: any) => mockCreatePricePointMarker(inputs)
}))

vi.mock('../../keycloak-config.ts', () => ({
    default: {
        protect: () => (_req: any, _resp: any, next: any) => {
            next()
        },
        middleware: () => (_req: any, _resp: any, next: any) => {
            next()
        }
    }
}))
vi.mock('../../authorization', () => ({
    hasRole: () => (_req: any, _res: any, next: any) => {
        next()
    }
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
