import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetTripForAcknowlegementApproval = vi.fn()
const mockGetShortageQuantityByOverallTripId = vi.fn()
const mockUpdateShortageInOverallTrip = vi.fn()
const mockUpdateAcknowledgementApproval = vi.fn()
const mockcreatePaymentDues = vi.fn()
vi.mock('../models/overallTrip', () => ({
    getTripForAcknowlegementApproval: () => mockGetTripForAcknowlegementApproval(),
    updateAcknowledgementApproval: () => mockUpdateAcknowledgementApproval()
}))
vi.mock('../models/shortageQuantity', () => ({
    updateShortageByOverallTripId: (id: number) => mockUpdateShortageInOverallTrip(id),
    getShortageQuantityByOverallTripId: (inputs: any) =>
        mockGetShortageQuantityByOverallTripId(inputs)
}))
vi.mock('../models/paymentDues', () => ({
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs)
}))
const mockAuth = vi.fn()
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
const mockOverAllTrip = [
    {
        id: 1,
        shortageQuantity: [
            {
                id: 1,
                overallTripId: 1,
                shortageQuantity: 1000,
                shortageAmount: 8000,
                approvalStatus: false,
                reason: 'Test reason',
                filledLoad: 40,
                unloadedQuantity: 39000
            }
        ],
        paymentDues: [],
        acknowledgementStatus: false,
        acknowledgementDate: 1707244200,
        finalPayDuration: 2,
        acknowledgementApprovalStatus: true,
        transporterInvoice: 'dfghj',
        stockPointToUnloadingPointTripId: null,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTripId: null,
        stockPointToUnloadingPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 1,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Muthu Logistics',
                    transporterType: 'Market',
                    tdsPercentage: 5
                }
            },
            loadingPoint: {
                id: 1,
                name: 'Salem'
            },
            stockPoint: {
                id: 1,
                name: 'Salem'
            },
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 40000,
            totalTransporterAmount: 36000
        }
    }
]
const shortage = {
    unloadedQuantity: 2900,
    shortageQuantity: 101,
    shortageAmount: 808,
    filledLoad: 2100,
    approvalStatus: true
}
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
const shortageQuantity = { id: 1, unloadedQuantity: 1899, approvalStatus: true }
describe('Acknowledgement Approval Controller', () => {
    test('should able to get overAllTrip for Acknowledgement Approval', async () => {
        mockGetTripForAcknowlegementApproval.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowlegementapproval').expect(200)
        expect(mockGetTripForAcknowlegementApproval).toBeCalledTimes(1)
    })
    test.only('should able to update Acknowledgement Approval in overAllTrip', async () => {
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(shortage)
        mockUpdateShortageInOverallTrip.mockResolvedValue(shortage)
        mockUpdateAcknowledgementApproval.mockResolvedValue(mockOverAllTrip[0])
        mockcreatePaymentDues.mockResolvedValue(mockGetDuesData)
        await supertest(app).put('/api/acknowlegementapproval').send(shortageQuantity).expect(200)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(1)
        expect(mockUpdateShortageInOverallTrip).toBeCalledTimes(1)
        expect(mockcreatePaymentDues).toBeCalledTimes(1)
    })
})
