import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { createBunk, listAllBunk } from './bunk.ts'

const mockCreateBunk = jest.fn()
const mockBunkDetails = jest.fn()

jest.mock('../models/bunk', () => ({
    create: (inputs: Prisma.bunkCreateInput) => mockCreateBunk(inputs),
    getAllBunk: () => mockBunkDetails()
}))

const mockBunk = {
    bunkName: 'Bharath Petroleum',
    bunkLocation: 'Erode'
}

describe('Bunk Controller', () => {
    test('should able to create Bunk', async () => {
        app.post('/bunk', createBunk)
        mockCreateBunk.mockResolvedValue(mockBunk)
        await supertest(app).post('/bunk').expect(200)
        expect(mockCreateBunk).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        app.get('/bunk', listAllBunk)
        mockBunkDetails.mockResolvedValue({ name: 'Bharath Petroleum' })
        await supertest(app).get('/bunk').expect({ name: 'Bharath Petroleum' })
        expect(mockBunkDetails).toBeCalledWith()
    })
})
