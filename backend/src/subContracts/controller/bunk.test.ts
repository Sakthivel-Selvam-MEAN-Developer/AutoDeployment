import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'

const mockCreateBunk = vi.fn()
const mockBunkDetails = vi.fn()

vi.mock('../models/bunk', () => ({
    create: (inputs: Prisma.bunkCreateInput) => mockCreateBunk(inputs),
    getAllBunk: () => mockBunkDetails()
}))

const mockBunk = {
    bunkName: 'Bharath Petroleum'
}

describe('Bunk Controller', () => {
    test('should able to create Bunk', async () => {
        mockCreateBunk.mockResolvedValue(mockBunk)
        await supertest(app).post('/api/bunk').expect(200)
        expect(mockCreateBunk).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        mockBunkDetails.mockResolvedValue({ bunkName: 'Bharath Petroleum' })
        await supertest(app).get('/api/bunk').expect({ bunkName: 'Bharath Petroleum' })
        expect(mockBunkDetails).toBeCalledWith()
    })
})
