import supertest from 'supertest'
import { Request, Response } from 'express'
import { app } from '../../app.ts'
import { createPricePointMarker } from './pricePointMarker.ts'

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
let actualRole = ''
vi.mock('../../authorization', () => ({
    hasRole: (role: string) => (_req: any, _res: any, next: any) => {
        actualRole = role
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
        expect(actualRole).toBe('SuperAdmin')
    })
})
