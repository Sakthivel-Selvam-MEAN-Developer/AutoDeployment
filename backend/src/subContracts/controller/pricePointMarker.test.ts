import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { createPricePointMarker } from './pricePointMarker.ts'
import { Role } from '../roles.ts'

const mockCreatePricePointMarker = vi.fn()

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
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockReq = {
    body: {
        loaction: 'UltraTech Cements'
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn()
} as unknown as Response

describe('PricePoint Controller', () => {
    test('should able to create pricePoint', async () => {
        mockCreatePricePointMarker.mockResolvedValue(mockReq.body)
        await supertest(app).post('/api/point-marker').expect(200)
        createPricePointMarker(mockReq, mockRes)
        expect(mockCreatePricePointMarker).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreatePricePointMarker).toHaveBeenCalledTimes(2)
    })
    test('should have super admin role for pricePoint', async () => {
        await supertest(app).post('/api/point-marker').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
})
