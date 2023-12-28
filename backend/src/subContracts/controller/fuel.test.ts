import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { createFuel, listAllFuel, listFuelWithoutTripId, updateFuelWithTrip } from './fuel.ts'

const mockCreateFuel = vi.fn()
const mockFuelDetails = vi.fn()
const mockFuelWithoutTrip = vi.fn()
const mockUpdateFuelWithTrip = vi.fn()

vi.mock('../models/fuel', () => ({
    create: (inputs: Prisma.fuelCreateInput) => mockCreateFuel(inputs),
    getAllFuel: () => mockFuelDetails(),
    updateFuelWithTripId: ({ id, tripId }: { id: number; tripId: number }) =>
        mockUpdateFuelWithTrip({ id, tripId }),
    getFuelWithoutTrip: (vehiclenumber: string) => mockFuelWithoutTrip(vehiclenumber)
}))

const mockFuel = {
    vehicleNumber: 'TN93D5512',
    pricePerliter: 102.5,
    quantity: 60.754,
    totalprice: 6227.285
}
const mockFuelWithoutTripData = {
    vehicleNumber: 'TN93D5512',
    pricePerliter: 102.5,
    quantity: 60.754,
    totalprice: 6227.285,
    loadingPointToUnloadingPointTripId: null
}
const mockUpdateFuelWithTripData = {
    vehicleNumber: 'TN93D5512',
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
    test('should able to get the fuel without tripId', async () => {
        app.get('/fuel/:vehiclenumber', listFuelWithoutTripId)
        mockFuelWithoutTrip.mockResolvedValue(mockFuelWithoutTripData)
        await supertest(app).get('/fuel/TN93D5512').expect(mockFuelWithoutTripData)
        expect(mockFuelWithoutTrip).toBeCalledTimes(1)
    })
    test('should able to update fuel with tripId', async () => {
        app.put('/fuel-update', updateFuelWithTrip)
        mockUpdateFuelWithTrip.mockResolvedValue(mockUpdateFuelWithTripData)
        await supertest(app).put('/fuel-update').expect(mockUpdateFuelWithTripData)
        expect(mockUpdateFuelWithTrip).toBeCalledTimes(1)
    })
})
