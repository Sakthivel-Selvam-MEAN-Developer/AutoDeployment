import supertest from 'supertest'
import { app } from '../../app.ts'
import { createTrip, listAllTrip } from './loadingToUnloadingTrip.ts'

const mockgetTrip = vi.fn()
const mockCreateTrip = vi.fn()
const mockActiveTrip = vi.fn()

vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockgetTrip(),
    create: (inputs: any) => mockCreateTrip(inputs),
    getOnlyActiveTrip: () => mockActiveTrip()
}))

const mockTripData = {
    truckId: 1,
    loadingPointId: 1,
    unloadingPointId: 1,
    startDate: 1703679340,
    filledLoad: 48,
    invoiceNumber: 'AGTH5312WE',
    freightAmount: 1000,
    transporterAmount: 900,
    totalFreightAmount: 48000,
    totalTransporterAmount: 43200,
    margin: 4800,
    wantFuel: false
}

describe('Trip Controller', () => {
    test('should able to access all trip', async () => {
        app.get('/trip', listAllTrip)
        mockgetTrip.mockResolvedValue([
            {
                filledLoad: 40,
                invoiceNumber: 'ABC123'
            }
        ])
        await supertest(app)
            .get('/trip')
            .expect([
                {
                    filledLoad: 40,
                    invoiceNumber: 'ABC123'
                }
            ])
        expect(mockgetTrip).toBeCalledWith()
    })
    test('should able to create trip', async () => {
        app.post('/trip', createTrip)
        mockCreateTrip.mockResolvedValue(mockTripData)
        await supertest(app).post('/trip').expect(mockTripData)
        expect(mockCreateTrip).toBeCalledTimes(1)
    })
})
