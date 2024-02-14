import supertest from 'supertest'
import { app } from '../../app.ts'

const mockListOverallTrip = vi.fn()
const mockOverallTripByFiltrer = vi.fn()
const mockgetTripByUnloadDate = vi.fn()
const mockGetAllDiscrepancyReport = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverallTrip: () => mockListOverallTrip(),
    getTripByUnloadDate: (inputs: any) => mockgetTripByUnloadDate(inputs),
    overallTripByFiltrer: (id1: number, id2: number, id3: number, id4: number, id5: number) =>
        mockOverallTripByFiltrer(id1, id2, id3, id4, id5),
    getAllDiscrepancyReport: (from: number, to: number) => mockGetAllDiscrepancyReport(from, to)
}))
const mockOverallTripData = [
    {
        id: 1,
        acknowledgementStatus: true,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        fuel: [],
        paymentDues: [],
        shortageQuantity: [],
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
                    csmName: 'newName',
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
    test.skip('should able to filter trip data', async () => {
        mockOverallTripByFiltrer.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/overalltrip/1/1/1/1700764100/1700764300').expect(200)
        expect(mockOverallTripByFiltrer).toBeCalledTimes(1)
    })
    test('should able to filter trip by unloadDate', async () => {
        mockgetTripByUnloadDate.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/acknowledgement/0').expect(200)
        expect(mockgetTripByUnloadDate).toBeCalledTimes(1)
    })
    test.skip('should able to get discrepancy report', async () => {
        mockGetAllDiscrepancyReport.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/report/1700764200/1700764200').expect(200)
        expect(mockGetAllDiscrepancyReport).toBeCalledTimes(1)
    })
})
