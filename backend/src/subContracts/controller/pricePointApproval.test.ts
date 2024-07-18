import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetTripForPricePointApproval = vi.fn()
const mockUpdatePricePointApprovalStatus = vi.fn()
const mockGetPricePoint = vi.fn()
const mockUpdateFreightInDirectTrip = vi.fn()
const mockUpdateFreightInStockTrip = vi.fn()
const mockCreatePaymentDues = vi.fn()

const mockAuth = vi.fn()
vi.mock('../models/overallTrip.ts', () => ({
    getTripForPricePointApproval: () => mockGetTripForPricePointApproval(),
    updatePricePointApprovalStatus: () => mockUpdatePricePointApprovalStatus()
}))
vi.mock('../models/pricePoint.ts', () => ({
    getPricePoint: () => mockGetPricePoint()
}))
vi.mock('../models/loadingToUnloadingTrip.ts', () => ({
    updateFreightInDirectTrip: () => mockUpdateFreightInDirectTrip()
}))
vi.mock('../models/loadingToStockPointTrip.ts', () => ({
    updateFreightInStockTrip: () => mockUpdateFreightInStockTrip()
}))
vi.mock('../models/paymentDues.ts', () => ({
    create: () => mockCreatePaymentDues()
}))
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))

const overallTrip = [
    {
        id: 1,
        fuel: [],
        paymentDues: [],
        truck: {
            vehicleNumber: 'TN20C1234',
            transporter: {
                name: 'Barath Logistics Pvt Ltd',
                csmName: 'Sakthi',
                transporterType: 'Market',
                gstPercentage: 2,
                employee: {
                    name: 'Sakthi'
                }
            }
        },
        loadingPointToStockPointTrip: {
            id: 1,
            startDate: 123213231,
            invoiceNumber: 'abcd',
            filledLoad: 10,
            freightAmount: 1000,
            transporterAmount: 900,
            wantFuel: false,
            acknowledgeDueTime: 234567,
            totalTransporterAmount: 9000,
            tripStatus: false,
            loadingPointId: 1,
            stockPointId: 1,
            loadingPoint: {
                name: 'erode'
            },
            stockPoint: { name: 'salem' },
            truck: {
                vehicleNumber: 'TN20C1234',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    csmName: 'Sakthi',
                    transporterType: 'Market',
                    gstPercentage: 2,
                    employee: {
                        name: 'Sakthi'
                    }
                }
            }
        },
        loadingPointToUnloadingPointTrip: {
            id: 1,
            startDate: 1234567,
            invoiceNumber: 'abcd',
            filledLoad: 10,
            freightAmount: 1000,
            transporterAmount: 900,
            wantFuel: false,
            acknowledgeDueTime: 234567,
            totalTransporterAmount: 9000,
            tripStatus: false,
            loadingPointId: 1,
            unloadingPointId: 1,
            loadingPoint: {
                name: 'erode'
            },
            unloadingPoint: { name: 'salem' },
            truck: {
                vehicleNumber: 'TN20C1234',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    csmName: 'Sakthi',
                    transporterType: 'Market',
                    gstPercentage: 2,
                    employee: {
                        name: 'Sakthi'
                    }
                }
            }
        }
    }
]
const pricePointData = {
    transporterPercentage: 10,
    transporterAdvancePercentage: 70
}
const updatedData = {
    totalTransporterAmount: 10001,
    wantFuel: true,
    truck: {
        vehicleNumber: 'TN20C1234',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market'
        }
    }
}
describe('PricePointApproval Controller', () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    test('should get trips for PricePointApproval', async () => {
        mockGetTripForPricePointApproval.mockResolvedValue(overallTrip)
        const response = await supertest(app).get('/api/pricepointapproval')
        expect(response.status).toBe(200)
        expect(mockGetTripForPricePointApproval).toHaveBeenCalledTimes(1)
        expect(response.body).toHaveLength(1)
    })

    test('should update trips for PricePointApproval with LoadingToStock trip', async () => {
        mockUpdatePricePointApprovalStatus.mockResolvedValue(overallTrip[0])
        mockGetPricePoint.mockResolvedValue(pricePointData)
        mockUpdateFreightInStockTrip.mockResolvedValue(updatedData)
        await supertest(app)
            .put('/api/pricepointapproval')
            .send({ id: 1, transporterPercentage: 10, freight: 1000 })
            .expect(200)
        expect(mockUpdatePricePointApprovalStatus).toHaveBeenCalledTimes(1)
        expect(mockUpdateFreightInStockTrip).toHaveBeenCalledTimes(1)
        expect(mockCreatePaymentDues).toHaveBeenCalledTimes(1)
    })
    test('should return internal server error when priccePoint is null', async () => {
        mockUpdatePricePointApprovalStatus.mockResolvedValue(overallTrip[0])
        mockGetPricePoint.mockResolvedValue(null)
        mockUpdateFreightInStockTrip.mockResolvedValue(updatedData)
        await supertest(app)
            .put('/api/pricepointapproval')
            .send({ id: 1, transporterPercentage: 10, freight: 1000 })
            .expect(500)
        expect(mockUpdatePricePointApprovalStatus).toHaveBeenCalledTimes(1)
        expect(mockUpdateFreightInStockTrip).toHaveBeenCalledTimes(0)
        expect(mockCreatePaymentDues).toHaveBeenCalledTimes(0)
    })

    test('should update trips for PricePointApproval with LoadingToUnloading trip', async () => {
        const overallTripWithUnloading = {
            ...overallTrip[0],
            loadingPointToStockPointTrip: null,
            loadingPointToUnloadingPointTrip: overallTrip[0].loadingPointToStockPointTrip
        }
        mockUpdatePricePointApprovalStatus.mockResolvedValue(overallTripWithUnloading)
        mockGetPricePoint.mockResolvedValue(pricePointData)
        mockUpdateFreightInDirectTrip.mockResolvedValue(updatedData)
        await supertest(app)
            .put('/api/pricepointapproval')
            .send({ id: 1, transporterPercentage: 10, freight: 1000 })
            .expect(200)
        expect(mockUpdatePricePointApprovalStatus).toHaveBeenCalledTimes(1)
        expect(mockUpdateFreightInDirectTrip).toHaveBeenCalledTimes(1)
        expect(mockCreatePaymentDues).toHaveBeenCalledTimes(1)
    })

    test('should handle initialPayAvailable being true', async () => {
        mockUpdatePricePointApprovalStatus.mockResolvedValue({
            ...overallTrip[0],
            loadingPointToUnloadingPointTrip: null
        })
        mockGetPricePoint.mockResolvedValue(pricePointData)
        await supertest(app)
            .put('/api/pricepointapproval')
            .send({ id: 1, transporterPercentage: 10, freight: 1000 })
            .expect(200)
        expect(mockUpdatePricePointApprovalStatus).toHaveBeenCalledTimes(1)
        expect(mockUpdateFreightInStockTrip).toHaveBeenCalledTimes(1)
        expect(mockCreatePaymentDues).toHaveBeenCalledTimes(1)
    })

    test('should handle overallTrip being null', async () => {
        mockUpdatePricePointApprovalStatus.mockResolvedValue(null)
        await supertest(app)
            .put('/api/pricepointapproval')
            .send({ id: 1, transporterPercentage: 10, freight: 1000 })
            .expect(500)
        expect(mockUpdatePricePointApprovalStatus).toHaveBeenCalledTimes(1)
    })

    test('should handle errors gracefully', async () => {
        mockUpdatePricePointApprovalStatus.mockRejectedValue(new Error('Something went wrong'))
        await supertest(app)
            .put('/api/pricepointapproval')
            .send({ id: 1, transporterPercentage: 10, freight: 1000 })
            .expect(500)
        expect(mockUpdatePricePointApprovalStatus).toHaveBeenCalledTimes(1)
    })
})
