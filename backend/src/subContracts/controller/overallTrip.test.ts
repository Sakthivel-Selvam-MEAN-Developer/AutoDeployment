import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockListOverallTrip = vi.fn()
const mockOverallTripByFiltrer = vi.fn()
const mockgetTripByUnloadDate = vi.fn()
const mockGetAllDiscrepancyReport = vi.fn()
const mockGetTripDetailsByCompanyName = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverallTrip: () => mockListOverallTrip(),
    getTripByUnloadDate: (inputs: any) => mockgetTripByUnloadDate(inputs),
    overallTripByFilter: (id1: number, id2: number, id3: number, id4: number, id5: number) =>
        mockOverallTripByFiltrer(id1, id2, id3, id4, id5),
    getAllDiscrepancyReport: (from: number, to: number) => mockGetAllDiscrepancyReport(from, to),
    getTripDetailsByCompanyName: (from: number, to: number) =>
        mockGetTripDetailsByCompanyName(from, to)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockOverallTripData = [
    {
        id: 1,
        acknowledgementStatus: true,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        stockPointToUnloadingPointTrip: null,
        loadingPointToUnloadingPointTripId: 1,
        fuel: [],
        fuelId: null,
        paymentDues: [],
        paymentDuesId: null,
        shortageQuantityId: [],
        shortageQuantity: null,
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
                cementCompanyId: 1,
                cementCompany: {
                    name: 'UltraTech Cements'
                }
            },
            truck: {
                vehicleNumber: 'TN93D5512',
                transporterId: 1,
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
    test('should able to filter trip data', async () => {
        mockOverallTripByFiltrer.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/1/1/1/1700764200/1700764200').expect(200)
        expect(mockOverallTripByFiltrer).toBeCalledTimes(1)
    })
    test('should able to filter trip by unloadDate', async () => {
        mockgetTripByUnloadDate.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/acknowledgement/0').expect(200)
        expect(mockgetTripByUnloadDate).toBeCalledTimes(1)
    })
    test('should able to filter trip by unloadDate', async () => {
        mockGetTripDetailsByCompanyName.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/1/1700764200/1700764200').expect(200)
        expect(mockGetTripDetailsByCompanyName).toBeCalledTimes(1)
    })
    test('should able to get discrepancy report', async () => {
        mockGetAllDiscrepancyReport.mockResolvedValue(mockOverallTripData)
        await supertest(app)
            .get('/api/overalltrip/report/discrepancy/1700764200/1700764200')
            .expect(200)
        expect(mockGetAllDiscrepancyReport).toBeCalledTimes(1)
    })
})
