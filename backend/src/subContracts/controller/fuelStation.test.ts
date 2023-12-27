import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { createFuelStation, listAllFuelStationByBunk } from './fuelStation.ts'

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
        app.post('/station', createFuelStation)
        mockCreateFuelStation.mockResolvedValue(mockFuelStation)
        await supertest(app).post('/station').expect(200)
        expect(mockCreateFuelStation).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        app.get('/station/:bunkId', listAllFuelStationByBunk)
        mockFuelStationDetails.mockResolvedValue({ location: 'Erode' })
        await supertest(app).get('/station/1').expect({ location: 'Erode' })
        expect(mockFuelStationDetails).toBeCalledWith()
    })
})
