import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { createBunk } from './bunk.ts'
import seedBunk from '../seed/bunk.ts'

const mockCreateBunk = vi.fn()
const mockBunkDetails = vi.fn()
const mockGetAllBunkName = vi.fn()

vi.mock('../models/bunk', () => ({
    create: (inputs: Prisma.bunkCreateInput, id: number) => mockCreateBunk(inputs, id),
    getAllBunk: () => mockBunkDetails(),
    getAllBunkName: () => mockGetAllBunkName()
}))

vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockBunk = {
    body: { details: seedBunk }
}
const mockBunkWithoutId = {
    body: { ...seedBunk }
}
const mockReq = {
    body: { details: seedBunk, id: 0 }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn()
} as unknown as Response

describe('Bunk Controller', () => {
    test('should able to create Bunk', async () => {
        mockCreateBunk.mockResolvedValue({ ...mockBunk.body, id: 1 })
        createBunk(mockReq, mockRes)
        expect(mockCreateBunk).toHaveBeenCalledWith(mockReq.body.details, 0)
        await supertest(app).post('/api/bunk').expect(200)
        expect(mockCreateBunk).toBeCalledTimes(2)
    })
    test('should able to access', async () => {
        mockBunkDetails.mockResolvedValue({ bunkName: 'Bharath Petroleum' })
        await supertest(app).get('/api/bunk').expect({ bunkName: 'Bharath Petroleum' })
        expect(mockBunkDetails).toBeCalledWith()
    })
    test('should return all bunk names', async () => {
        mockGetAllBunkName.mockResolvedValue(mockBunkWithoutId.body)
        await supertest(app)
            .get('/api/bunk_name')
            .expect({ ...seedBunk })
        expect(mockGetAllBunkName).toBeCalledWith()
    })
})
