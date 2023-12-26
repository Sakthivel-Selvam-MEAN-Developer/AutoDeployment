import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { createFuel, listAllFuel } from './fuel.ts'

const mockCreateFuel = vi.fn()
const mockFuelDetails = vi.fn()

vi.mock('../models/fuel', () => ({
    create: (inputs: Prisma.fuelCreateInput) => mockCreateFuel(inputs),
    getAllFuel: () => mockFuelDetails()
}))

const mockFuel = {
    pricePerliter: 102.5,
    quantity: 60.754,
    totalprice: 6227.285,
    loadingPointToUnloadingPointTripId: 1
}

describe('Bunk Controller', () => {
    test('should able to create Bunk', async () => {
        app.post('/fuel', createFuel)
        mockCreateFuel.mockResolvedValue(mockFuel)
        await supertest(app).post('/fuel').expect(200)
        expect(mockCreateFuel).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        app.get('/fuel', listAllFuel)
        mockFuelDetails.mockResolvedValue({ pricePerliter: 102 })
        await supertest(app).get('/fuel').expect({ pricePerliter: 102 })
        expect(mockFuelDetails).toBeCalledWith()
    })
})
