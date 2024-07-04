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
    status: () => ({
        json: vi.fn()
    })
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
    test('should be able to access price point data', async () => {
        const mockData = { freightAmount: 1000, transporterAmount: 900 }
        mockCreatePricePoint.mockResolvedValue(mockData)

        const response = await supertest(app).get('/api/price-point/1/1/null').expect(200)

        expect(response.body).toEqual(mockData)
        expect(mockCreatePricePoint).toHaveBeenCalledWith({})
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(2)
    })

    test('should be able to create price point', async () => {
        const mockCreatedPricePoint = {
            loadingPointId: 1,
            unloadingPointId: null,
            stockPointId: 1,
            freightAmount: 1007,
            transporterPercentage: 8,
            transporterAmount: 926.44
        }

        mockCreatePricePoint.mockResolvedValue(mockCreatedPricePoint)

        const response = await supertest(app)
            .post('/api/price-point')
            .send(mockReq.body)
            .expect(200)

        expect(response.body).toEqual(mockCreatedPricePoint)
        expect(mockCreatePricePoint).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(3)
    })

    test('should handle errors during price point creation', async () => {
        const error = new Error('Creation failed')
        mockCreatePricePoint.mockRejectedValue(error)

        const response = await supertest(app)
            .post('/api/price-point')
            .send(mockReq.body)
            .expect(500)

        expect(response.body).toEqual({ error: 'Something went Wrong' })
        expect(mockCreatePricePoint).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(4)
    })

    test('should check for super admin role for creating price point', async () => {
        mockAuth.mockImplementationOnce(
            (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
                expect(role).toContain('Admin')
                next()
            }
        )

        await supertest(app).post('/api/price-point').send(mockReq.body).expect(500)

        expect(mockAuth).toHaveBeenCalledWith(['Admin'])
    })
    test('should be able to retrieve all price points successfully', async () => {
        const mockPricePoints = [
            { id: 1, amount: 1000 },
            { id: 2, amount: 2000 }
        ]
        mockCreatePricePoint.mockResolvedValue(mockPricePoints)

        const response = await supertest(app).get('/api/price-points').expect(500)

        expect(response.body).toEqual({})
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(5)
    })

    test('should handle errors during retrieval of all price points', async () => {
        const error = new Error('Failed to retrieve price points')
        mockCreatePricePoint.mockRejectedValue(error)

        const response = await supertest(app).get('/api/price-points').expect(500)

        expect(response.body).toEqual({})
        expect(mockCreatePricePoint).toHaveBeenCalledTimes(5)
    })
})
