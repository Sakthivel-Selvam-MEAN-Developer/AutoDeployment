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
const mockGetDirectTripsByinvoiceFilter = vi.fn()
const mockGetStockTripsByinvoiceFilter = vi.fn()
const mockGetUnloadingTripsByinvoiceFilter = vi.fn()
const mockUploadToS3 = vi.fn()
const mockupdateDirectTripBillingRate = vi.fn()
const mockupdateStockTripBillingRate = vi.fn()
const mockupdateUnloadingTripBillingRate = vi.fn()

vi.mock('aws-sdk', () => ({
    S3: vi.fn(() => ({
        upload: vi.fn().mockImplementation((params: any, callback: any) => {
            if (params.Body instanceof ArrayBuffer) {
                callback(null, { Location: 'sample-url' })
            } else {
                callback(new Error('Invalid Body type'), null)
            }
        })
    })),
    config: {
        update: vi.fn()
    }
}))
vi.mock('react-dom/server', async (importOriginal) => {
    const actual = await importOriginal()

    return {
        ...(typeof actual === 'object' && actual !== null ? actual : {}),
        renderToString: vi
            .fn()
            .mockImplementation(
                () =>
                    "<div id='invoice'><p>Invoice</p></div><div id='annexure'><p>Annexure</p></div>"
            )
    }
})
vi.mock('jsdom', () => ({
    JSDOM: vi.fn(() => ({
        window: {
            document: {
                querySelector: vi.fn((selector: string) => {
                    if (selector === '#invoice') {
                        return {
                            outerHTML: '<div id="invoice"><p>Invoice</p></div>'
                        } as unknown as HTMLElement
                    }
                    if (selector === '#annexure') {
                        return {
                            outerHTML: '<div id="annexure"><p>Annexure</p></div>'
                        } as unknown as HTMLElement
                    }
                })
            }
        }
    }))
}))
vi.mock('../models/loadingToUnloadingTrip', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberD(inputs, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsD(inputs),
    getDirectTripsByinvoiceFilter: (inputs: any) => mockGetDirectTripsByinvoiceFilter(inputs),
    updateDirectTripBillingRate: (id: number, billingRate: number, pageName: string) =>
        mockupdateDirectTripBillingRate(id, billingRate, pageName)
}))
vi.mock('../models/loadingToStockPointTrip', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberS(inputs, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsS(inputs),
    getStockTripsByinvoiceFilter: (inputs: any) => mockGetStockTripsByinvoiceFilter(inputs),
    updateStockTripBillingRate: (id: number, billingRate: number, pageName: string) =>
        mockupdateStockTripBillingRate(id, billingRate, pageName)
}))
vi.mock('../models/stockPointToUnloadingPoint', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberU(inputs, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsU(inputs),
    getUnloadingTripsByinvoiceFilter: (inputs: any) => mockGetUnloadingTripsByinvoiceFilter(inputs),
    updateUnloadingTripBillingRate: (id: number, billingRate: number, pageName: string) =>
        mockupdateUnloadingTripBillingRate(id, billingRate, pageName)
}))
vi.mock('../models/billNumber', () => ({
    updateBillNumber: (inputs: any, billNo: any) => mockUpdateBillNumberB(inputs, billNo)
}))
vi.mock('./uploadToS3', () => ({
    uploadToS3: (buffer: any, company: string, billNo: any) =>
        mockUploadToS3(buffer, company, billNo)
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

const mockGetInvoiceDetailsDData = [
    {
        startDate: 1709231400,
        unloadingPoint: {
            name: 'Salem'
        },
        loadingPoint: {
            name: 'Chennai-south',
            cementCompany: {
                primaryBill: { address: 'ULTRA TECH\n ,new street\n erode', gstNumber: 'asdfgh ' }
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
            name: 'Chennai-south',
            cementCompany: {
                primaryBill: { address: 'ULTRA TECH\n ,new street\n erode', gstNumber: 'asdfgh ' }
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
            name: 'Salem',
            cementCompany: {
                name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
                cementCompany: {
                    secondaryBill: {
                        address: 'ULTRA TECH\n ,new street\n erode',
                        gstNumber: 'asdfgh '
                    }
                }
            }
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
    },
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
    },
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

const mockBodyForLoadingToUnloading = {
    trip: { tripId: [1, 2, 3], tripName: 'LoadingToUnloading' },
    bill: { billNo: 'MGL-01', date: 1717180200 },
    cementCompany: { name: 'ULTRATECH CEMENT LIMITED,TADIPATRI', id: 1 }
}
const mockBodyForLoadingToStock = {
    trip: { tripId: [2], tripName: 'LoadingToStock' },
    bill: { billNo: 'MGL-01', date: 1717180200 },
    cementCompany: { name: 'ULTRATECH CEMENT LIMITED,TADIPATRI', id: 1 }
}
const mockBodyForStockToUnloading = {
    trip: { tripId: [5], tripName: 'StockToUnloading' },
    bill: { billNo: 'MGL-01', date: 1717180200 },
    cementCompany: { name: 'ULTRATECH CEMENT LIMITED,TADIPATRI', id: 1 }
}
const mockFilterData = {
    startDate: 1709317800,
    endDate: 1709317800,
    cementCompany: { name: 'ultraTech', id: 1 },
    pageName: 'LoadingToUnloading'
}

describe('Invoice Controller', async () => {
    test('should able to update billDetails details for loading to unloading', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        mockUpdateBillNumberD.mockResolvedValue({ count: 3 })
        mockUpdateBillNumberS.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberU.mockResolvedValue({ count: 0 })

        await supertest(app)
            .put('/api/invoice/update')
            .send(mockBodyForLoadingToUnloading)
            .expect(200)

        expect(mockUpdateBillNumberD).toBeCalledTimes(1)
        expect(mockUpdateBillNumberD).toHaveBeenCalledWith([1, 2, 3], 'MGL-01')
    }, 6000)
    test('should able to update billDetails details for loading to stock', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        mockUpdateBillNumberD.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberS.mockResolvedValue({ count: 1 })
        mockUpdateBillNumberU.mockResolvedValue({ count: 0 })
        await supertest(app).put('/api/invoice/update').send(mockBodyForLoadingToStock).expect(200)
        expect(mockUpdateBillNumberS).toBeCalledTimes(1)
        expect(mockUpdateBillNumberS).toHaveBeenCalledWith([2], 'MGL-01')
    }, 6000)
    test('should able to update billDetails details for stock to unloading', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        mockUpdateBillNumberD.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberS.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberU.mockResolvedValue({ count: 1 })
        await supertest(app)
            .put('/api/invoice/update')
            .send(mockBodyForStockToUnloading)
            .expect(200)
        expect(mockUpdateBillNumberU).toBeCalledTimes(1)
        expect(mockUpdateBillNumberU).toHaveBeenCalledWith([5], 'MGL-01')
    }, 6000)
    test('should able to retrun 500 for non trip', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        await supertest(app)
            .put('/api/invoice/update')
            .send({ ...mockBodyForStockToUnloading, trip: { tripName: 'undefined', tripId: [1] } })
            .expect(500)
    }, 6000)
    test('should have super admin role for invoice details', async () => {
        await supertest(app)
            .put('/api/invoice/update')
            .send(mockBodyForLoadingToUnloading)
            .expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
    test('should able to get invoice details from direct trip', async () => {
        mockGetDirectTripsByinvoiceFilter.mockResolvedValue(mockGetInvoiceDetailsDData)
        await supertest(app)
            .get('/api/invoice')
            .query({ ...mockFilterData, pageName: 'LoadingToUnloading' })
            .expect(200)
        expect(mockGetDirectTripsByinvoiceFilter).toBeCalledTimes(1)
    })
    test('should able to get invoice details from loadingToStock trip', async () => {
        mockGetStockTripsByinvoiceFilter.mockResolvedValue(mockGetInvoiceDetailsDData)
        await supertest(app)
            .get('/api/invoice')
            .query({ ...mockFilterData, pageName: 'LoadingToStock' })
            .expect(200)
        expect(mockGetStockTripsByinvoiceFilter).toBeCalledTimes(1)
    })
    test('should able to get invoice details from stockToUnloading trip', async () => {
        mockGetUnloadingTripsByinvoiceFilter.mockResolvedValue(mockGetInvoiceDetailsDData)
        await supertest(app)
            .get('/api/invoice')
            .query({ ...mockFilterData, pageName: 'StockToUnloading' })
            .expect(200)
        expect(mockGetUnloadingTripsByinvoiceFilter).toBeCalledTimes(1)
    })
    test('should able to retrun html content to preview pdf for loading to unloading trip', async () => {
        mockGetInvoiceDetailsD.mockResolvedValue(mockGetInvoiceDetailsDData)
        mockGetInvoiceDetailsS.mockResolvedValue(mockGetInvoiceDetailsSData)
        mockGetInvoiceDetailsU.mockResolvedValue(mockGetInvoiceDetailsUData)
        await supertest(app)
            .post('/api/invoice/previewPDF')
            .send(mockBodyForLoadingToUnloading)
            .expect(200)
            .then((htmlContent) => {
                expect(typeof htmlContent).toBe('object')
            })
        expect(mockGetInvoiceDetailsD).toBeCalledTimes(1)
    })
    test('should able to retrun html content to preview pdf for loading to stock trip', async () => {
        mockGetInvoiceDetailsD.mockResolvedValue(mockGetInvoiceDetailsDData)
        mockGetInvoiceDetailsS.mockResolvedValue(mockGetInvoiceDetailsSData)
        mockGetInvoiceDetailsU.mockResolvedValue(mockGetInvoiceDetailsUData)
        await supertest(app)
            .post('/api/invoice/previewPDF')
            .send(mockBodyForLoadingToStock)
            .expect(200)
            .then((htmlContent) => {
                expect(typeof htmlContent).toBe('object')
            })
        expect(mockGetInvoiceDetailsS).toBeCalledTimes(1)
    })
    test('should able to retrun html content to preview pdf for stock to unloading trip', async () => {
        mockGetInvoiceDetailsD.mockResolvedValue(mockGetInvoiceDetailsDData)
        mockGetInvoiceDetailsS.mockResolvedValue(mockGetInvoiceDetailsSData)
        mockGetInvoiceDetailsU.mockResolvedValue(mockGetInvoiceDetailsUData)
        await supertest(app)
            .post('/api/invoice/previewPDF')
            .send(mockBodyForStockToUnloading)
            .expect(200)
            .then((htmlContent) => {
                expect(typeof htmlContent).toBe('object')
            })
        expect(mockGetInvoiceDetailsU).toBeCalledTimes(1)
    })
    test('should able to update billing rate for loading to unloading trip', async () => {
        mockupdateDirectTripBillingRate.mockResolvedValue('')
        await supertest(app)
            .put('/api/invoice/billingrate')
            .send({ id: 1, billingRate: 12000, pageName: 'LoadingToUnloading' })
            .expect(200)
        expect(mockupdateDirectTripBillingRate).toHaveBeenCalledTimes(1)
    })
    test('should able to update billing rate for loading to stock trip', async () => {
        mockupdateStockTripBillingRate.mockResolvedValue({})
        await supertest(app)
            .put('/api/invoice/billingrate')
            .send({ id: 1, billingRate: 12000, pageName: 'LoadingToStock' })
            .expect(200)
        expect(mockupdateStockTripBillingRate).toHaveBeenCalledTimes(1)
    })
    test('should able to update billing rate for stock to unloading trip', async () => {
        mockupdateUnloadingTripBillingRate.mockResolvedValue('')
        await supertest(app)
            .put('/api/invoice/billingrate')
            .send({ id: 1, billingRate: 12000, pageName: 'StockToUnloading' })
            .expect(200)
        expect(mockupdateUnloadingTripBillingRate).toHaveBeenCalledTimes(1)
    })
})
