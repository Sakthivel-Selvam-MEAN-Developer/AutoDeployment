import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { app } from '../../app.ts'
import { createBunk } from './bunk.ts'

const mockCreateBunk = vi.fn()
const mockBunkDetails = vi.fn()

vi.mock('../models/bunk', () => ({
    create: (inputs: Prisma.bunkCreateInput) => mockCreateBunk(inputs),
    getAllBunk: () => mockBunkDetails()
}))

const mockBunk = {
    body: {
        bunkName: 'Bharath Petroleum',
        location: 'London',
        accountHolder: 'Barath',
        accountNumber: '123ABC',
        ifsc: '1234XYZA',
        accountTypeNumber: 121212
    }
}
const mockReq = {
    body: {
        bunkName: 'Bharath Petroleum',
        location: 'London',
        accountHolder: 'Barath',
        accountNumber: '123ABC',
        ifsc: '1234XYZA',
        accountTypeNumber: 121212
    }
} as Request
const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn()
} as unknown as Response
describe('Bunk Controller', () => {
    test('should able to create Bunk', async () => {
        mockCreateBunk.mockResolvedValue(mockBunk)
        createBunk(mockReq, mockRes)
        expect(mockCreateBunk).toHaveBeenCalledWith(mockReq.body)
        await supertest(app).post('/api/bunk').expect(200)
        expect(mockCreateBunk).toBeCalledTimes(2)
    })
    test('should able to access', async () => {
        mockBunkDetails.mockResolvedValue({ bunkName: 'Bharath Petroleum' })
        await supertest(app).get('/api/bunk').expect({ bunkName: 'Bharath Petroleum' })
        expect(mockBunkDetails).toBeCalledWith()
    })
})
