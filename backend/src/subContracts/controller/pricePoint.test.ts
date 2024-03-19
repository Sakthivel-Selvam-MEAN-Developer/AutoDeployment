import supertest from 'supertest'
import { Request, Response } from 'express'
import { app } from '../../app.ts'
import { createPricePoint } from './pricePoint.ts'

const mockPricePoint = vi.fn()
const mockCreatePricePoint = vi.fn()

vi.mock('../models/pricePoint', () => ({
    getPricePoint: (loadingPointId: number, unloadingPointId: number, stockPointId: null) =>
        mockPricePoint(loadingPointId, unloadingPointId, stockPointId),
    create: (inputs: any) => mockCreatePricePoint(inputs)
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

let actualRole = ''
vi.mock('../../authorization', () => ({
    hasRole: (role: string) => (_req: any, _res: any, next: any) => {
        actualRole = role
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
    test('should have super admin role for pricePoint', async () => {
        await supertest(app).post('/api/price-point').expect(200)
        expect(actualRole).toBe('SuperAdmin')
    })
})
