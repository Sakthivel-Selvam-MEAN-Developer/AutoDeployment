import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { createPricePoint } from './pricePoint.ts'
import { Role } from '../roles.ts'

const mockPricePoint = vi.fn()
const mockCreatePricePoint = vi.fn()

vi.mock('../models/pricePoint', () => ({
    getPricePoint: (loadingPointId: number, unloadingPointId: number, stockPointId: null) =>
        mockPricePoint(loadingPointId, unloadingPointId, stockPointId),
    create: (inputs: any) => mockCreatePricePoint(inputs)
}))
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))

const mockReq = {
    body: {
        loadingPointId: 1,
        unloadingPointId: null,
        stockPointId: 1,
        freightAmount: 1007,
        transporterPercentage: 8,
        transporterAmount: 926.44
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn()
} as unknown as Response

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
        mockCreatePricePoint.mockResolvedValue(mockReq.body)
        createPricePoint(mockReq, mockRes)
        await supertest(app).post('/api/price-point').expect(200)
        expect(mockCreatePricePoint).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(2)
    })
    test.skip('should have super admin role for pricePoint', async () => {
        await supertest(app).post('/api/price-point').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
})
