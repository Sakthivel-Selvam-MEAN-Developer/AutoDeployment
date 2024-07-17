import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'
import { convertData } from './acknowledgementApproval.ts'

const mockGetTripForAcknowlegementApproval = vi.fn()
const mockGetShortageQuantityByOverallTripId = vi.fn()
const mockUpdateShortageInOverallTrip = vi.fn()
const mockUpdateAcknowledgementApproval = vi.fn()
const mockcreatePaymentDues = vi.fn()
const mockUpdateTdsAmountAndPercentage = vi.fn()
vi.mock('../models/overallTrip', () => ({
    getTripForAcknowlegementApproval: () => mockGetTripForAcknowlegementApproval(),
    updateAcknowledgementApproval: () => mockUpdateAcknowledgementApproval(),
    updateTdsAmountAndPercentage: () => mockUpdateTdsAmountAndPercentage()
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
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Muthu Logistics',
                transporterType: 'Market',
                tdsPercentage: 5,
                gstPercentage: 10
            }
        },
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
const shortageQuantity = { id: 1, unloadedQuantity: 1899, approvalStatus: true }
describe('Acknowledgement Approval Controller', () => {
    test('should able to get overAllTrip for Acknowledgement Approval', async () => {
        mockGetTripForAcknowlegementApproval.mockResolvedValue(mockOverAllTrip)
        await supertest(app).get('/api/acknowlegementapproval').expect(200)
        expect(mockGetTripForAcknowlegementApproval).toBeCalledTimes(1)
    })
    test('should not able to get overAllTrip for Acknowledgement Approval', async () => {
        mockGetTripForAcknowlegementApproval.mockResolvedValue([
            {
                ...mockOverAllTrip[0],
                paymentDues: mockGstDuesData
            }
        ])
        await supertest(app).get('/api/acknowlegementapproval').expect(200)
        expect(mockGetTripForAcknowlegementApproval).toBeCalledTimes(2)
    })
    test('should able to update Acknowledgement Approval in overAllTrip and generate final pay', async () => {
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(shortage)
        mockUpdateShortageInOverallTrip.mockResolvedValue(shortage)
        mockUpdateAcknowledgementApproval.mockResolvedValue(mockOverAllTrip[0])
        mockcreatePaymentDues.mockResolvedValue(mockGetDuesData)
        await supertest(app).put('/api/acknowlegementapproval').send(shortageQuantity).expect(200)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(1)
        expect(mockUpdateShortageInOverallTrip).toBeCalledTimes(1)
        expect(mockcreatePaymentDues).toBeCalledTimes(2)
    })

    test('should able to update Acknowledgement Approval in overAllTrip and generate gst pay', async () => {
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(shortage)
        mockUpdateShortageInOverallTrip.mockResolvedValue(shortage)
        mockUpdateAcknowledgementApproval.mockResolvedValue(mockOverAllTrip[0])
        mockcreatePaymentDues.mockResolvedValue(mockGstDuesData)
        await supertest(app).put('/api/acknowlegementapproval').send(shortageQuantity).expect(200)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(2)
        expect(mockUpdateShortageInOverallTrip).toBeCalledTimes(2)
        expect(mockcreatePaymentDues).toBeCalledTimes(4)
    })
    test('should able to update Acknowledgement Approval in overAllTrip and should not generate gst pay', async () => {
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(shortage)
        mockUpdateShortageInOverallTrip.mockResolvedValue(shortage)
        mockUpdateAcknowledgementApproval.mockResolvedValue({
            ...mockOverAllTrip[0],
            shortageQuantity: [{ ...mockOverAllTrip[0].shortageQuantity, gstPercentage: null }]
        })
        await supertest(app).put('/api/acknowlegementapproval').send(shortageQuantity).expect(200)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(3)
        expect(mockUpdateShortageInOverallTrip).toBeCalledTimes(3)
        expect(mockcreatePaymentDues).toBeCalledTimes(6)
    })
})
describe('convertData Function', () => {
    // Define the types for the test cases
    interface finalDuePropsfalse {
        name?: string
        type: string
        dueDate: number
        overallTripId: number
        vehicleNumber?: string
        payableAmount: number
    }

    interface paymentDuesCreateManyInput {
        name: string
        type: string
        dueDate: number
        overallTripId: number
        vehicleNumber: string
        payableAmount: number
    }

    test('should convert finalDue props to paymentDuesCreateManyInput', () => {
        const finalDue: finalDuePropsfalse[] = [
            {
                name: 'Transporter A',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 1,
                vehicleNumber: 'TN30S1234',
                payableAmount: 5000
            },
            {
                name: 'Transporter B',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 2,
                vehicleNumber: 'TN30S5678',
                payableAmount: 3000
            }
        ]

        const expected: paymentDuesCreateManyInput[] = [
            {
                name: 'Transporter A',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 1,
                vehicleNumber: 'TN30S1234',
                payableAmount: 5000
            },
            {
                name: 'Transporter B',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 2,
                vehicleNumber: 'TN30S5678',
                payableAmount: 3000
            }
        ]

        expect(convertData(finalDue)).toEqual(expected)
    })

    test('should handle missing optional fields correctly', () => {
        const finalDue: finalDuePropsfalse[] = [
            {
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 1,
                payableAmount: 5000
            },
            {
                name: 'Transporter B',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 2,
                vehicleNumber: 'TN30S5678',
                payableAmount: 3000
            }
        ]

        const expected: paymentDuesCreateManyInput[] = [
            {
                name: '',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 1,
                vehicleNumber: '',
                payableAmount: 5000
            },
            {
                name: 'Transporter B',
                type: 'final pay',
                dueDate: 1716681600,
                overallTripId: 2,
                vehicleNumber: 'TN30S5678',
                payableAmount: 3000
            }
        ]

        expect(convertData(finalDue)).toEqual(expected)
    })

    test('should handle empty input array', () => {
        const finalDue: finalDuePropsfalse[] = []

        const expected: paymentDuesCreateManyInput[] = []

        expect(convertData(finalDue)).toEqual(expected)
    })
    test('should return 500 if shortage is null in approveAcknowledgement', async () => {
        mockGetShortageQuantityByOverallTripId.mockResolvedValue(null)
        await supertest(app).put('/api/acknowlegementapproval').send(shortageQuantity).expect(500)
        expect(mockGetShortageQuantityByOverallTripId).toBeCalledTimes(4)
    })
})
