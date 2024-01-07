import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'

const mockCreateFuelStation = vi.fn()
const mockFuelStationDetails = vi.fn()

vi.mock('../models/fuelStation', () => ({
    create: (inputs: Prisma.fuelStationCreateInput) => mockCreateFuelStation(inputs),
    getAllFuelStationByBunk: () => mockFuelStationDetails()
}))

const mockFuelStation = {
    location: 'Erode'
}

describe('Fuel Station Controller', () => {
    test('should able to create Bunk', async () => {
        mockCreateFuelStation.mockResolvedValue(mockFuelStation)
        await supertest(app).post('/api/station').expect(200)
        expect(mockCreateFuelStation).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        mockFuelStationDetails.mockResolvedValue({ location: 'Erode' })
        await supertest(app).get('/api/station/1').expect({ location: 'Erode' })
        expect(mockFuelStationDetails).toBeCalledWith()
    })
})
