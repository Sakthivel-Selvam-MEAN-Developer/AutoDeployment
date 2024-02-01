import supertest from 'supertest'
import { app } from '../../app.ts'

const mockListOverallTrip = vi.fn()
const mockOverallTripByFiltrer = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverallTrip: () => mockListOverallTrip(),
    overallTripByFiltrer: (id1: number, id2: number, id3: number) =>
        mockOverallTripByFiltrer(id1, id2, id3)
}))
const mockOverallTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        fuel: [],
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 1,
            startDate: 1700764200,
            filledLoad: 40,
            wantFuel: null,
            tripStatus: false,
            acknowledgeDueTime: null,
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 40000,
            totalTransporterAmount: 36000,
            margin: 4000,
            invoiceNumber: 'ABC123',
            loadingPointId: 1,
            unloadingPointId: 1,
            truckId: 1,
            loadingPoint: {
                id: 1,
                name: 'Chennai-south',
                cementCompany: {
                    name: 'UltraTech Cements'
                }
            },
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    id: 1,
                    name: 'Barath Logistics'
                }
            }
        }
    }
]
describe('OverallTrip Controller', () => {
    test('should able to access overalltrip data', async () => {
        mockListOverallTrip.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip').expect(200)
        expect(mockListOverallTrip).toBeCalledTimes(1)
    })
    test('should able to filter trip data', async () => {
        mockOverallTripByFiltrer.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/1/1/1').expect(200)
        expect(mockOverallTripByFiltrer).toBeCalledTimes(1)
    })
})
