import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetInvoiceDetailsD = vi.fn()
const mockUpdateBillNumberD = vi.fn()
const mockGetInvoiceDetailsS = vi.fn()
const mockUpdateBillNumberS = vi.fn()
const mockGetInvoiceDetailsU = vi.fn()
const mockUpdateBillNumberU = vi.fn()
const mockUpdateBillNumberB = vi.fn()

vi.mock('../models/loadingToUnloadingTrip', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberD(inputs, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsD(inputs)
}))
vi.mock('../models/loadingToStockPointTrip', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberS(inputs, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsS(inputs)
}))
vi.mock('../models/stockPointToUnloadingPoint', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberU(inputs, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsU(inputs)
}))
vi.mock('../models/billNumber', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberB(inputs, billNo)
}))
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))

const mockGetInvoiceDetailsDData = [
    {
        startDate: 1709231400,
        unloadingPoint: {
            name: 'Salem'
        },
        loadingPoint: {
            name: 'Chennai-south'
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0
                    }
                ]
            }
        ],
        invoiceNumber: 'asasdcsdc',
        freightAmount: 1200,
        truck: {
            vehicleNumber: 'TN29B3246'
        },
        filledLoad: 12
    }
]
const mockGetInvoiceDetailsSData = [
    {
        startDate: 1709317800,
        stockPoint: {
            name: 'StockPoint'
        },
        loadingPoint: {
            name: 'Chennai-south'
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0
                    }
                ]
            }
        ],
        invoiceNumber: 'wqqwqw',
        freightAmount: 1200,
        truck: {
            vehicleNumber: 'TN29B3246'
        },
        filledLoad: 23
    }
]
const mockGetInvoiceDetailsUData = [
    {
        startDate: 1709317800,
        unloadingPoint: {
            name: 'Salem'
        },
        invoiceNumber: 'wqsqwsdsd',
        freightAmount: 800,
        loadingPointToStockPointTrip: {
            filledLoad: 23,
            truck: {
                vehicleNumber: 'TN29B3246'
            },
            stockPoint: {
                name: 'StockPoint'
            }
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0
                    }
                ]
            }
        ]
    }
]
const mockBody = [
    { tripId: 1, tripName: 'LoadingToStock' },
    { tripId: 1, tripName: 'StockToUnloading' },
    { tripId: 2, tripName: 'LoadingToUnloading' }
]
const mockBody2 = {
    trip: [
        { tripId: 2, tripName: 'LoadingToUnloading' },
        { tripId: 1, tripName: 'LoadingToStock' },
        { tripId: 1, tripName: 'StockToUnloading' }
    ],
    billNo: 'MGL23A-1'
}
describe('Invoice Controller', async () => {
    test('should able to get invoice details', async () => {
        mockGetInvoiceDetailsD.mockResolvedValue(mockGetInvoiceDetailsDData)
        mockGetInvoiceDetailsS.mockResolvedValue(mockGetInvoiceDetailsSData)
        mockGetInvoiceDetailsU.mockResolvedValue(mockGetInvoiceDetailsUData)
        await supertest(app).put('/api/invoice').send(mockBody).expect(200)
        expect(mockGetInvoiceDetailsD).toBeCalledTimes(1)
        expect(mockGetInvoiceDetailsS).toBeCalledTimes(1)
        expect(mockGetInvoiceDetailsU).toBeCalledTimes(1)
    })
    test('should able to get invoice details', async () => {
        await supertest(app).put('/api/invoice/update').send(mockBody2).expect(200)
        expect(mockUpdateBillNumberD).toBeCalledTimes(1)
        expect(mockUpdateBillNumberS).toBeCalledTimes(1)
        expect(mockUpdateBillNumberU).toBeCalledTimes(1)
        expect(mockUpdateBillNumberB).toBeCalledTimes(1)
    })
    test('should have super admin role for invoice details', async () => {
        await supertest(app).put('/api/invoice').send(mockBody).expect(200)
        await supertest(app).put('/api/invoice/update').send(mockBody2).expect(200)
        expect(mockAuth).toBeCalledWith(['Employee'])
    })
})
