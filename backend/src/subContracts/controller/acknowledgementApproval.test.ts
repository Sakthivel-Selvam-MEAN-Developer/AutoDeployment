import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetTripForAcknowlegementApproval = vi.fn()
const mockGetShortageQuantityByOverallTripId = vi.fn()
const mockUpdateShortageInOverallTrip = vi.fn()
const mockUpdateAcknowledgementApproval = vi.fn()
const mockCreateShortageQuantity = vi.fn()
const mockGetPercentageByTransporter = vi.fn()
const mockcreatePaymentDues = vi.fn()
const mockGetDueByOverallTripId = vi.fn()
vi.mock('../models/overallTrip', () => ({
    getTripForAcknowlegementApproval: () => mockGetTripForAcknowlegementApproval(),
    updateAcknowledgementApproval: () => mockUpdateAcknowledgementApproval()
}))
vi.mock('../models/shortageQuantity', () => ({
    updateShortageInOverallTrip: (id: number) => mockUpdateShortageInOverallTrip(id),
    create: (inputs: any) => mockCreateShortageQuantity(inputs),
    getShortageQuantityByOverallTripId: (inputs: any) =>
        mockGetShortageQuantityByOverallTripId(inputs)
}))
vi.mock('../models/transporter', () => ({
    getPercentageByTransporter: (tds: any) => mockGetPercentageByTransporter(tds)
}))
vi.mock('../models/paymentDues', () => ({
    create: (intputs: Prisma.paymentDuesCreateInput) => mockcreatePaymentDues(intputs),
    getDueByOverallTripId: (id: number) => mockGetDueByOverallTripId(id)
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
                approvalStatus: false
            }
        ],
        acknowledgementStatus: false,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: null,
        stockPointToUnloadingPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 1,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Muthu Logistics'
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
    filledLoad: 2100
}
const mockgetPercentageByTransporterData = { tdsPercentage: 2 }
const mockGetDueByOverallTripIdData = { shortageAmount: 4000 }
const shortageQuantity = { id: 1, unloadedQuantity: 1899 }
const mockGstDuesData = [
    {
        name: 'Muthu Logistics',
        type: 'gst pay',
        dueDate: 1707244200,
        payableAmount: 3600,
        overallTripId: 1,
        vehicleNumber: 'TN93D5512'
    }
]
describe('Acknowledgement Approval Controller', () => {
    test('should able to get overAllTrip for Acknowledgement Approval', async () => {
        mockGetTripForAcknowlegementApproval.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowlegementapproval').expect(200)
        expect(mockGetTripForAcknowlegementApproval).toBeCalledTimes(1)
    })
    test('should able to update Acknowledgement Approval in overAllTrip', async () => {
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(shortage)
        mockUpdateShortageInOverallTrip.mockResolvedValue(shortage)
        mockUpdateAcknowledgementApproval.mockResolvedValue(mockOverAllTrip[0])
        mockGetPercentageByTransporter.mockResolvedValue(mockgetPercentageByTransporterData)
        mockGetDueByOverallTripId.mockResolvedValue([{ ...mockGstDuesData, overallTripId: 1 }])
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(mockGetDueByOverallTripIdData)
        mockcreatePaymentDues.mockResolvedValue(mockGstDuesData)
        await supertest(app).put('/api/acknowlegementapproval').send(shortageQuantity).expect(200)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(2)
        expect(mockUpdateShortageInOverallTrip).toBeCalledTimes(1)
        expect(mockUpdateAcknowledgementApproval).toBeCalledTimes(1)
        expect(mockGetPercentageByTransporter).toBeCalledTimes(1)
        expect(mockGetDueByOverallTripId).toBeCalledTimes(1)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(2)
        expect(mockcreatePaymentDues).toBeCalledTimes(1)
    })
})
