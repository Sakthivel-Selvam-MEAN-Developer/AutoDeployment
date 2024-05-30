import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetTripByTransporterInvoice = vi.fn()
const mockUpdateTransporterInvoice = vi.fn()
const mockGetPercentageByTransporter = vi.fn()
const mockcreatePaymentDues = vi.fn()
const mockGetDueByOverallTripId = vi.fn()
const mockGetShortageQuantityByOverallTripId = vi.fn()

vi.mock('../models/overallTrip', () => ({
    getTripByTransporterInvoice: () => mockGetTripByTransporterInvoice(),
    updateTransporterInvoice: (inputs: any) => mockUpdateTransporterInvoice(inputs)
}))
vi.mock('../models/paymentDues', () => ({
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs),
    getDueByOverallTripId: (id: number) => mockGetDueByOverallTripId(id)
}))
vi.mock('../models/shortageQuantity', () => ({
    getShortageQuantityByOverallTripId: (inputs: any) =>
        mockGetShortageQuantityByOverallTripId(inputs)
}))
vi.mock('../models/transporter', () => ({
    getPercentageByTransporter: (tds: any) => mockGetPercentageByTransporter(tds)
}))
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../../keycloak-config.ts', () => ({
    default: {
        protect: () => (_req: any, _resp: any, next: any) => {
            next()
        },
        middleware: () => (_req: any, _resp: any, next: any) => {
            next()
        }
    }
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const transporterInvoiceData = [
    {
        id: 4,
        acknowledgementStatus: true,
        finalPayDuration: 0,
        transporterInvoice: '',
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        paymentDues: [],
        stockPointToUnloadingPointTrip: null,
        loadingPointToUnloadingPointTripId: 3,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 3,
            startDate: 1715193000,
            filledLoad: 2,
            wantFuel: false,
            tripStatus: false,
            acknowledgeDueTime: null,
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 2000,
            totalTransporterAmount: 1800,
            margin: 200,
            invoiceNumber: '21ed23qw',
            loadingPointId: 1,
            unloadingPointId: 1,
            truckId: 4,
            billNo: null,
            loadingPoint: {
                name: 'Chennai-south'
            },
            unloadingPoint: {
                name: 'Salem'
            },
            truck: {
                vehicleNumber: 'TN22E3456',
                transporter: {
                    id: 2,
                    name: 'Deepak Logistics Pvt Ltd',
                    csmName: 'Barath'
                }
            }
        }
    }
]
const mockgetPercentageByTransporterData = { tdsPercentage: 2 }
const mockGetDueByOverallTripIdData = { shortageAmount: 4000 }
const mockGetDuesData = [
    {
        name: 'Deepak Logistics Pvt Ltd',
        type: 'final pay',
        dueDate: 1707244200,
        payableAmount: 3600,
        overallTripId: 1,
        vehicleNumber: 'TN22E3456'
    }
]
describe('Transporter Invoice Controller', () => {
    test('should able to get Transporter Invoice', async () => {
        mockGetTripByTransporterInvoice.mockResolvedValue(transporterInvoiceData)
        await supertest(app).get('/api/transporterinvoice').expect(200)
        expect(mockGetTripByTransporterInvoice).toBeCalledTimes(1)
    })
    test('should able to update Transporter Invoice in overallTrip', async () => {
        mockUpdateTransporterInvoice.mockResolvedValue(transporterInvoiceData[0])
        mockGetPercentageByTransporter.mockResolvedValue(mockgetPercentageByTransporterData)
        mockGetDueByOverallTripId.mockResolvedValue([{ ...mockGetDuesData, overallTripId: 1 }])
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(mockGetDueByOverallTripIdData)
        mockcreatePaymentDues.mockResolvedValue(mockGetDuesData)
        await supertest(app)
            .put('/api/transporterinvoice')
            .send({ invoice: 'abcd', id: 4 })
            .expect(200)
        expect(mockUpdateTransporterInvoice).toBeCalledTimes(1)
        expect(mockGetPercentageByTransporter).toBeCalledTimes(1)
        expect(mockGetDueByOverallTripId).toBeCalledTimes(1)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(1)
        expect(mockcreatePaymentDues).toBeCalledTimes(1)
    })
})
