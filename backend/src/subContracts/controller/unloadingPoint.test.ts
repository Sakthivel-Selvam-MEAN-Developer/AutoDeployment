import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockUnloadingPointByCementCompanyId = vi.fn()
const mockUnloadingPointByCompany = vi.fn()
const mockCreatePricePointMarker = vi.fn()
const mockCreateUnloadingPoint = vi.fn()

vi.mock('../models/unloadingPoint', () => ({
    getAllUnloadingPoint: (id: number) => mockUnloadingPointByCementCompanyId(id),
    getUnloadingPointByCompany: () => mockUnloadingPointByCompany(),
    create: (inputs: any) => mockCreateUnloadingPoint(inputs)
}))
vi.mock('../models/pricePointMarker', () => ({
    create: (inputs: any) => mockCreatePricePointMarker(inputs)
}))
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
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

const mockAllUnloadingPoint = [
    {
        location: 'Salem'
    }
]

describe('Delivery point Controller', () => {
    test('should able to get all unloading point by cement company id', async () => {
        mockUnloadingPointByCementCompanyId.mockResolvedValue(mockAllUnloadingPoint)
        await supertest(app).get('/api/unloading/1').expect(200)
        expect(mockUnloadingPointByCementCompanyId).toBeCalledWith(1)
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
    test('should have super admin role for unloadingPoint', async () => {
        await supertest(app).post('/api/unloading-point').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
})
