import supertest from 'supertest'
import { NextFunction } from 'express'
import { app } from '../../app.ts'

const mockListOverallTrip = vi.fn()
const mockOverallTripByFiltrer = vi.fn()
const mockgetTripByUnloadDate = vi.fn()
const mockGetAllDiscrepancyReport = vi.fn()
const mockTripStatusFilterCount = vi.fn()
const mockGetInvoiceNumbers = vi.fn()
const mockGetStockPointInvoiceNumbers = vi.fn()
const mockGetStockToUnloadingPointInvoiceNumbers = vi.fn()
const mockGetUnloadingPointInvoiceNumbers = vi.fn()
const mockGetOverAllTripid = vi.fn()
const mockGetPricePoint = vi.fn()
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
    getAllDiscrepancyReport: (from: number, to: number) => mockGetAllDiscrepancyReport(from, to),
    getOverAllTripByArrayOfId: (ids: number[], month: string) => mockGetOverAllTripid(ids, month)
}))

vi.mock('../models/loadingToUnloadingTrip.ts', () => ({
    getAllStockPointInvoiceNumbers: () => mockGetInvoiceNumbers(),
    getAllStockToUnloadingPointInvoiceNumbers: () => mockGetInvoiceNumbers(),
    getAllUnloadingPointInvoiceNumbers: () => mockGetInvoiceNumbers()
}))
vi.mock('../models/pricePoint.ts', () => ({
    getPricePoint: () => mockGetPricePoint()
}))

vi.mock('../models/loadingToStockPointTrip.ts', () => ({
    getAllStockPointInvoiceNumbers: () => mockGetStockPointInvoiceNumbers()
}))

vi.mock('../models/stockPointToUnloadingPoint.ts', () => ({
    getAllStockToUnloadingPointInvoiceNumbers: () => mockGetStockToUnloadingPointInvoiceNumbers()
}))

vi.mock('../models/loadingToUnloadingTrip.ts', () => ({
    getAllUnloadingPointInvoiceNumbers: () => mockGetUnloadingPointInvoiceNumbers()
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
        stockPointToUnloadingPointTrip: {
            id: 1,
            billingRate: 1000,
            startDate: 1700764200,
            filledLoad: 40,
            invoiceNumber: 'ABC123',
            loadingPointId: 1,
            unloadingPointId: 1,
            unloadingPoint: {
                id: 1,
                name: 'Chennai-south'
            }
        },
        loadingPointToUnloadingPointTripId: 1,
        fuel: [],
        fuelId: null,
        paymentDues: [
            {
                type: 'gst pay',
                payableAmount: 100
            },
            {
                type: 'initial pay',
                payableAmount: 100
            }
        ],
        paymentDuesId: null,
        shortageQuantityId: [],
        truckId: 1,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporterId: 1,
            transporter: {
                id: 1,
                csmName: 'newName',
                name: 'Barath Logistics'
            }
        },
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
        loadingPointToStockPointTrip: {
            id: 1,
            startDate: 1700764200,
            billingRate: 1000,
            filledLoad: 40,
            loadingPoint: {
                id: 1,
                name: 'Chennai-south'
            },
            stockPoint: {
                id: 1,
                name: 'Salem'
            }
        },
        loadingPointToUnloadingPointTrip: {
            id: 1,
            startDate: 1700764200,
            billingRate: 1000,
            filledLoad: 40,
            loadingPointId: 1,
            unloadingPointId: 1,
            truckId: 1,
            loadingPoint: {
                id: 1,
                name: 'Chennai-south'
            },
            unloadingPoint: {
                id: 1,
                name: 'Salem'
            }
        }
    }
]
const mockTripStatusFilterCountData = {
    filterData: mockOverallTripData,
    count: 1
}
const mockTripData = [
    { id: 1, name: 'Trip 1' },
    { id: 2, name: 'Trip 2' }
]
const pricePointData = {
    transporterPercentage: 8
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
    test('should able to get discrepancy report for direct trip', async () => {
        const input = [
            {
                ...mockOverallTripData[0],
                loadingPointToStockPointTrip: null,
                stockPointToUnloadingPointTrip: null
            }
        ]
        mockGetAllDiscrepancyReport.mockResolvedValue(input)
        mockGetPricePoint.mockResolvedValue(pricePointData)
        await supertest(app)
            .get('/api/overalltrip/report/discrepancy/1700764200/1700764200')
            .expect(200)
        expect(mockGetAllDiscrepancyReport).toBeCalledTimes(1)
    })
    test('should able to get discrepancy report for stock trip', async () => {
        const input = [{ ...mockOverallTripData[0], loadingPointToUnloadingPointTrip: null }]
        mockGetPricePoint.mockResolvedValue(pricePointData)
        mockGetAllDiscrepancyReport.mockResolvedValue(input)
        await supertest(app)
            .get('/api/overalltrip/report/discrepancy/1700764200/1700764200')
            .expect(200)
        expect(mockGetAllDiscrepancyReport).toBeCalledTimes(2)
    })
    test('should not able to get all invoice numbers', async () => {
        mockGetInvoiceNumbers.mockResolvedValue(invoiceNumbers)
        const response = await supertest(app).get('/api/invoiceNumber').expect(500)
        expect(response.body).toEqual({ error: 'Internal Server Error' })
    })
    test('should be able to get trips by array of ids', async () => {
        const ids = JSON.stringify([1, 2])
        const month = '2024-07'

        mockGetOverAllTripid.mockResolvedValue(mockTripData)

        const response = await supertest(app)
            .get(`/api/overalltrip/ids?ids=${ids}&month=${month}`)
            .expect(200)

        expect(response.body).toEqual(mockTripData)
        expect(mockGetOverAllTripid).toBeCalledWith([1, 2], month)
        expect(mockGetOverAllTripid).toBeCalledTimes(1)
    })

    test('should handle error when getting trips by array of ids', async () => {
        const ids = JSON.stringify([1, 2])
        const month = '2024-07'

        mockGetOverAllTripid.mockRejectedValue(new Error('Internal Server Error'))

        const response = await supertest(app)
            .get(`/api/overalltrip/ids?ids=${ids}&month=${month}`)
            .expect(500)

        expect(response.status).toBe(500)
        expect(mockGetOverAllTripid).toBeCalledWith([1, 2], month)
        expect(mockGetOverAllTripid).toBeCalledTimes(2)
    })
})

describe('Invoice Controller', () => {
    test('should be able to get all invoice numbers', async () => {
        mockGetStockPointInvoiceNumbers.mockResolvedValue(invoiceNumbers)
        mockGetStockToUnloadingPointInvoiceNumbers.mockResolvedValue(invoiceNumbers)
        mockGetUnloadingPointInvoiceNumbers.mockResolvedValue(invoiceNumbers)

        const response = await supertest(app).get('/api/invoiceNumber').expect(200)
        const expectedInvoiceNumbers = [...invoiceNumbers, ...invoiceNumbers, ...invoiceNumbers]
        expect(response.body).toEqual(expectedInvoiceNumbers)
        expect(mockGetStockPointInvoiceNumbers).toBeCalledTimes(2)
        expect(mockGetStockToUnloadingPointInvoiceNumbers).toBeCalledTimes(1)
        expect(mockGetUnloadingPointInvoiceNumbers).toBeCalledTimes(1)
    })

    test('should handle error when getting all invoice numbers', async () => {
        mockGetStockPointInvoiceNumbers.mockRejectedValue(new Error('Internal Server Error'))
        mockGetStockToUnloadingPointInvoiceNumbers.mockRejectedValue(
            new Error('Internal Server Error')
        )
        mockGetUnloadingPointInvoiceNumbers.mockRejectedValue(new Error('Internal Server Error'))

        const response = await supertest(app).get('/api/invoiceNumber').expect(500)
        expect(response.body).toEqual({ error: 'Internal Server Error' })
        expect(mockGetStockPointInvoiceNumbers).toBeCalledTimes(3)
        expect(mockGetStockToUnloadingPointInvoiceNumbers).toBeCalledTimes(1)
        expect(mockGetUnloadingPointInvoiceNumbers).toBeCalledTimes(1)
    })
})
