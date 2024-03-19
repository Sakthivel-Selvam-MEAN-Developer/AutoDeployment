import supertest from 'supertest'
import { app } from '../../app.ts'

const mockLoadingPoint = vi.fn()
const mockLoadingPointByCompany = vi.fn()
const mockCreateLoadingPoint = vi.fn()
const mockCreatePricePointMarker = vi.fn()
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
let actualRole = ''
vi.mock('../../authorization', () => ({
    hasRole: (role: string) => (_req: any, _res: any, next: any) => {
        actualRole = role
        next()
    }
}))
vi.mock('../models/loadingPoint', () => ({
    getAllLoadingPoint: () => mockLoadingPoint(),
    getLoadingPointByCompany: () => mockLoadingPointByCompany(),
    create: (inputs: any) => mockCreateLoadingPoint(inputs)
}))
vi.mock('../models/pricePointMarker', () => ({
    create: (inputs: any) => mockCreatePricePointMarker(inputs)
}))

describe('Factory Controller', () => {
    test('should able to get all factory', async () => {
        mockLoadingPoint.mockResolvedValue({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        await supertest(app).get('/api/loading-point').expect({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        expect(mockLoadingPoint).toBeCalledWith()
    })
    test('should get only the factory by cement company name', async () => {
        mockLoadingPointByCompany.mockResolvedValue({
            name: 'UltraTech Cements'
        })
        await supertest(app).get('/api/loading-point/Barath').expect({
            name: 'UltraTech Cements'
        })
        expect(mockLoadingPointByCompany).toBeCalledWith()
    })
    test('should be able to create a loadingPoint', async () => {
        mockCreatePricePointMarker.mockResolvedValue({
            loaction: 'UltraTech Cements'
        })
        mockCreateLoadingPoint.mockResolvedValue({
            name: 'UltraTech Cements',
            cementCompanyId: 1,
            pricePointMarkerId: 1
        })
        await supertest(app).post('/api/loading-point').expect(200)
        expect(mockCreatePricePointMarker).toBeCalledTimes(1)
    })
    test('should have super admin role for loadingPoint', async () => {
        await supertest(app).post('/api/loading-point').expect(200)
        expect(actualRole).toBe('SuperAdmin')
    })
})
