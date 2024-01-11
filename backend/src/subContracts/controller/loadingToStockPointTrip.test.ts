import supertest from 'supertest'
import { app } from '../../app.ts'
import { createStockPointTrip, listAllStockPointTrip } from './loadingToStockPointTrip.ts'

const mockCreateTrip = vi.fn()
const mockStockPointTrip = vi.fn()

vi.mock('../models/loadingToStockPointTrip', () => ({
    create: (inputs: any) => mockCreateTrip(inputs),
    getAllStockPointTrip: () => mockStockPointTrip()
}))
const mockGetTripData = [
    {
        id: 1,
        startDate: 1703679340,
        filledLoad: 48,
        wantFuel: false,
        tripStatus: false,
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 48000,
        totalTransporterAmount: 43200,
        margin: 4800,
        loadingPointId: 1,
        invoiceNumber: 'AGTH5312WE',
        stockPointId: 1,
        truckId: 1,
        loadingPoint: {
            name: 'Chennai'
        },
        stockPoint: {
            name: 'StockPoint'
        },
        truck: {
            vehicleNumber: 'TN22E3456',
            transporter: {
                name: 'Deepak Logistics Pvt Ltd'
            }
        },
        stockPointToUnloadingPointTrip: []
    }
]
const mockTripData = {
    truckId: 1,
    loadingPointId: 1,
    stockPointId: 1,
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
        app.get('/stock-trip', listAllStockPointTrip)
        mockStockPointTrip.mockResolvedValue(mockGetTripData)
        await supertest(app).get('/stock-trip').expect(mockGetTripData)
        expect(mockStockPointTrip).toBeCalledTimes(1)
        expect(mockStockPointTrip).toBeCalledWith()
    })
    test.skip('should able to create trip', async () => {
        app.post('/stock-trip', createStockPointTrip)
        mockCreateTrip.mockResolvedValue(mockTripData)
        await supertest(app).post('/stock-trip').expect(200)
        expect(mockCreateTrip).toBeCalledTimes(1)
    })
})
