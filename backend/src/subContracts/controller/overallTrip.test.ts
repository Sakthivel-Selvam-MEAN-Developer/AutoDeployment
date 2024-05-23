import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockListOverallTrip = vi.fn()
const mockOverallTripByFiltrer = vi.fn()
const mockgetTripByUnloadDate = vi.fn()
const mockGetAllDiscrepancyReport = vi.fn()
const mockTripStatusFilterCount = vi.fn()
const mockGetInvoiceNumbers = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getOverallTrip: () => mockListOverallTrip(),
    getTripByUnloadDate: (inputs: any) => mockgetTripByUnloadDate(inputs),
    tripStatusFilter: (
        id1: number,
        id2: number,
        id3: number,
        id4: number,
        id5: number,
        pageNumber: number
    ) => mockOverallTripByFiltrer(id1, id2, id3, id4, id5, pageNumber),
    tripStatusFilterCount: (id1: number, id2: number, id3: number, id4: number, id5: number) =>
        mockTripStatusFilterCount(id1, id2, id3, id4, id5),
    getAllDiscrepancyReport: (from: number, to: number) => mockGetAllDiscrepancyReport(from, to)
}))
vi.mock('../models/loadingToUnloadingTrip.ts', () => ({
    getAllStockPointInvoiceNumbers: () => mockGetInvoiceNumbers(),
    getAllStockToUnloadingPointInvoiceNumbers: () => mockGetInvoiceNumbers(),
    getAllUnloadingPointInvoiceNumbers: () => mockGetInvoiceNumbers()
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
        shortageQuantity: [
            {
                id: 1,
                overallTripId: 1,
                shortageQuantity: 1000,
                shortageAmount: 8000,
                approvalStatus: false,
                reason: 'Test reason',
                filledLoad: 40,
                unloadedQuantity: 39000,
                unloadedDate: Date.now(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
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
            unloadingPoint: {
                id: 1,
                name: 'Salem',
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
const mockTripStatusFilterCountData = {
    filterData: mockOverallTripData,
    count: 1
}
const invoiceNumbers = [{ invoiceNumber: 'ABC001' }]
describe('OverallTrip Controller', () => {
    test('should able to access overalltrip data', async () => {
        mockListOverallTrip.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip').expect(200)
        expect(mockListOverallTrip).toBeCalledTimes(1)
    })
    test('should able to filter trip data', async () => {
        mockOverallTripByFiltrer.mockResolvedValue(mockOverallTripData)
        mockTripStatusFilterCount.mockResolvedValue(mockTripStatusFilterCountData)
        await supertest(app).get('/api/overalltrip/tripstatusreport').expect(200)
        expect(mockOverallTripByFiltrer).toBeCalledTimes(1)
    })
    test('should able to filter trip by unloadDate', async () => {
        mockgetTripByUnloadDate.mockResolvedValue(mockOverallTripData)
        await supertest(app).get('/api/overalltrip/acknowledgement/0').expect(200)
        expect(mockgetTripByUnloadDate).toBeCalledTimes(1)
    })
    test('should able to get discrepancy report', async () => {
        mockGetAllDiscrepancyReport.mockResolvedValue(mockOverallTripData)
        await supertest(app)
            .get('/api/overalltrip/report/discrepancy/1700764200/1700764200')
            .expect(200)
        expect(mockGetAllDiscrepancyReport).toBeCalledTimes(1)
    })
    test('should able to get all invoice numbers', async () => {
        mockGetInvoiceNumbers.mockResolvedValue(invoiceNumbers)
        const expectedInvoiceNumbers = [...invoiceNumbers]
        const response = await supertest(app).get('/api/invoiceNumber').expect(200)
        expect(response.body).toEqual(expectedInvoiceNumbers)
        expect(mockGetInvoiceNumbers).toBeCalledTimes(1)
    })
})
