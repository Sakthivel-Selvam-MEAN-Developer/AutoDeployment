import supertest from 'supertest'
import { app } from '../../app.ts'

const mockUnloadingPoint = vi.fn()
const mockUnloadingPointByCompany = vi.fn()
const mockCreatePricePointMarker = vi.fn()
const mockCreateUnloadingPoint = vi.fn()

vi.mock('../models/unloadingPoint', () => ({
    getAllUnloadingPoint: () => mockUnloadingPoint(),
    getUnloadingPointByCompany: () => mockUnloadingPointByCompany(),
    create: (inputs: any) => mockCreateUnloadingPoint(inputs)
}))
vi.mock('../models/pricePointMarker', () => ({
    create: (inputs: any) => mockCreatePricePointMarker(inputs)
}))
vi.mock('../../authorization', () => ({
    hasRole: () => (_req: any, _res: any, next: any) => {
        next()
    }
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

describe('Delivery point Controller', () => {
    test.skip('should able to access', async () => {
        mockUnloadingPoint.mockResolvedValue({ location: 'Salem, Tamilnadu' })
        await supertest(app).get('/api/unloading-point').expect({ location: 'Salem, Tamilnadu' })
        expect(mockUnloadingPoint).toBeCalledWith()
    })
    test('should get only the delivery point by cement company name', async () => {
        mockUnloadingPointByCompany.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).get('/api/unloading-point/barath').expect({
            location: 'Salem, Tamilnadu'
        })
        expect(mockUnloadingPointByCompany).toBeCalledWith()
    })
    test('should get only All the stock point by cement company name', async () => {
        mockCreatePricePointMarker.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        mockCreateUnloadingPoint.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).post('/api/unloading-point').expect(200)
        expect(mockCreateUnloadingPoint).toBeCalledTimes(1)
        expect(mockCreatePricePointMarker).toBeCalledTimes(1)
    })
})
