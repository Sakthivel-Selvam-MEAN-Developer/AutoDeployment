import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'
import { updateInvoiceDetails } from './invoice.ts'

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
const mockCreateCompanyInvoice = vi.fn()

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
    updateBillNumber: (prismaT: any, id: number, billNo: any) =>
        mockUpdateBillNumberD(prismaT, id, billNo),
    getInvoiceDetails: (inputs: any) => mockGetInvoiceDetailsD(inputs),
    getDirectTripsByinvoiceFilter: (inputs: any) => mockGetDirectTripsByinvoiceFilter(inputs),
    updateDirectTripBillingRate: (id: number, billingRate: number, pageName: string) =>
        mockupdateDirectTripBillingRate(id, billingRate, pageName)
}))
vi.mock('../models/companyInvoice/companyInvoice.ts', () => ({
    create: (inputs: any) => mockCreateCompanyInvoice(inputs)
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
        billNo: 12334,
        billingRate: 1200,
        tripStatus: '',
        unloadingPoint: {
            name: 'Salem'
        },
        loadingPoint: {
            name: 'Chennai-south',
            cementCompany: {
                quantityType: 'aaa',
                primaryBill: { address: 'ULTRA TECH\n ,new street\n erode', gstNumber: 'asdfgh ' }
            }
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0,
                        unloadedQuantity: 1000
                    }
                ],
                truck: {
                    vehicleNumber: 'TN33M0989'
                }
            }
        ],
        invoiceNumber: 'asasdcsdc',
        freightAmount: 1200,
        filledLoad: 12
    }
]
const mockGetInvoiceDetailsSData = [
    {
        startDate: 1709317800,
        billNo: 12334,
        billingRate: 1200,
        stockPoint: {
            name: 'StockPoint'
        },
        loadingPoint: {
            name: 'Chennai-south',
            cementCompany: {
                primaryBill: { address: 'ULTRA TECH\n ,new street\n erode', gstNumber: 'asdfgh ' },
                quantityType: 'aaa'
            }
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0,
                        unloadedQuantity: 1000
                    }
                ],
                truck: {
                    vehicleNumber: 'TN33M0989'
                }
            }
        ],
        invoiceNumber: 'wqqwqw',
        freightAmount: 1200,
        filledLoad: 23
    }
]
const mockGetInvoiceDetailsUData = [
    {
        startDate: 1709317800,
        billNo: 12334,
        billingRate: 800,
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
            stockPoint: {
                name: 'StockPoint',
                cementCompany: {
                    name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
                    quantityType: 'aaa'
                }
            }
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0,
                        unloadedQuantity: 1000
                    }
                ],
                truck: {
                    vehicleNumber: 'TN33M0989'
                }
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
        billingRate: 800,
        loadingPointToStockPointTrip: {
            filledLoad: 23,
            stockPoint: {
                name: 'StockPoint',
                cementCompany: {
                    name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
                    quantityType: 'aaa'
                }
            }
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0,
                        unloadedQuantity: 1000
                    }
                ],
                truck: {
                    vehicleNumber: 'TN33M0989'
                }
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
        billingRate: 800,
        loadingPointToStockPointTrip: {
            filledLoad: 23,
            truck: {
                vehicleNumber: 'TN29B3246'
            },
            stockPoint: {
                name: 'StockPoint',
                cementCompany: {
                    name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
                    quantityType: 'aaa'
                }
            }
        },
        overallTrip: [
            {
                shortageQuantity: [
                    {
                        shortageQuantity: 0,
                        unloadedQuantity: 1000
                    }
                ],
                truck: {
                    vehicleNumber: 'TN33M0989'
                }
            }
        ]
    }
]

const mockBodyForLoadingToUnloading = {
    body: {
        trip: { tripId: [1, 2, 3], tripName: 'LoadingToUnloading' },
        bill: { billNo: 'MGL-01', date: 1717180200 },
        cementCompany: { name: 'ULTRATECH CEMENT LIMITED,TADIPATRI', id: 1, quantityType: 'aaa' }
    }
} as Request
const mockBodyForLoadingToStock = {
    body: {
        trip: { tripId: [2], tripName: 'LoadingToStock' },
        bill: { billNo: 'MGL-01', date: 1717180200 },
        cementCompany: { name: 'ULTRATECH CEMENT LIMITED,TADIPATRI', id: 1, quantityType: 'aaa' }
    }
} as Request
const mockBodyForStockToUnloading = {
    body: {
        trip: { tripId: [5], tripName: 'StockToUnloading' },
        bill: { billNo: 'MGL-01', date: 1717180200 },
        cementCompany: { name: 'ULTRATECH CEMENT LIMITED,TADIPATRI', id: 1, quantityType: 'aaa' }
    }
} as Request
const mockFilterData = {
    startDate: 1709317800,
    endDate: 1709317800,
    cementCompany: { name: 'ultraTech', id: 1, quantityType: 'aaa' },
    pageName: 'LoadingToUnloading'
}
const mockUpdateBillingRateData = {
    id: 5,
    startDate: 1720549800,
    filledLoad: 45,
    wantFuel: false,
    tripStatus: true,
    acknowledgeDueTime: 1720591540,
    partyName: 'zxczxczx',
    lrNumber: 'zxc',
    freightAmount: 1000,
    approvedFreightAmount: 1000,
    billingRate: 1000,
    quantityType: 'qqq',
    transporterAmount: 900,
    totalFreightAmount: 45000,
    totalTransporterAmount: 40500,
    margin: 3150,
    loadingKilometer: 0,
    unloadingKilometer: 0,
    invoiceNumber: 'zxczxc',
    loadingPointId: 1,
    unloadingPointId: 1,
    billNo: null,
    companyInvoiceId: null
}
const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response
const mockCreateCompanyInvoiceData = {
    id: 2,
    billNo: 'Sample',
    pdfLink: 'https://www.s3.pdf/sample',
    billDate: 1720809000,
    amount: 54000,
    GSTAmount: 6480,
    TDSAmount: 1080,
    cementCompanyId: 1
}
describe('Invoice Controller', async () => {
    test('should able to update billDetails details for loading to unloading', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        mockCreateCompanyInvoice.mockResolvedValue(mockCreateCompanyInvoiceData)
        mockUpdateBillNumberD.mockResolvedValue({ count: 3 })
        mockUpdateBillNumberS.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberU.mockResolvedValue({ count: 0 })
        await updateInvoiceDetails(mockBodyForLoadingToUnloading, mockRes)
        expect(mockUpdateBillNumberD).toBeCalledTimes(1)
    })
    test('should able to update billDetails details for loading to stock', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        mockCreateCompanyInvoice.mockResolvedValue(mockCreateCompanyInvoiceData)
        mockUpdateBillNumberD.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberS.mockResolvedValue({ count: 1 })
        mockUpdateBillNumberU.mockResolvedValue({ count: 0 })
        await updateInvoiceDetails(mockBodyForLoadingToStock, mockRes)
        expect(mockUpdateBillNumberS).toBeCalledTimes(1)
    })
    test('should able to update billDetails details for stock to unloading', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        mockCreateCompanyInvoice.mockResolvedValue(mockCreateCompanyInvoiceData)
        mockUpdateBillNumberD.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberS.mockResolvedValue({ count: 0 })
        mockUpdateBillNumberU.mockResolvedValue({ count: 1 })
        await updateInvoiceDetails(mockBodyForStockToUnloading, mockRes)
        expect(mockUpdateBillNumberU).toBeCalledTimes(1)
    })
    test('should able to retrun 500 for non trip', async () => {
        // mockUploadToS3.mockResolvedValue('sample-file-path')
        const body = {
            ...mockBodyForStockToUnloading.body,
            trip: { tripName: 'undefined', tripId: [1] }
        }
        mockCreateCompanyInvoice.mockResolvedValue(mockCreateCompanyInvoiceData)
        await updateInvoiceDetails({ ...mockBodyForStockToUnloading.body, body }, mockRes)
        await supertest(app)
            .put('/api/invoice/update')
            .send({ ...mockBodyForStockToUnloading.body, body })
            .expect(200)
    })
    test('should have super admin role for invoice details', async () => {
        mockUpdateBillNumberD.mockResolvedValue({ count: 3 })
        mockCreateCompanyInvoice.mockResolvedValue(mockCreateCompanyInvoiceData)
        await supertest(app)
            .put('/api/invoice/update')
            .send(mockBodyForLoadingToUnloading.body)
            .expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
        expect(mockUpdateBillNumberD).toHaveBeenCalledTimes(2)
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
            .send(mockBodyForLoadingToUnloading.body)
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
            .send(mockBodyForLoadingToStock.body)
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
            .send(mockBodyForStockToUnloading.body)
            .expect(200)
            .then((htmlContent) => {
                expect(typeof htmlContent).toBe('object')
            })
        expect(mockGetInvoiceDetailsU).toBeCalledTimes(1)
    })
    test('should able to update billing rate for loading to unloading trip', async () => {
        mockupdateDirectTripBillingRate.mockResolvedValue(mockUpdateBillingRateData)
        await supertest(app)
            .put('/api/invoice/billingrate')
            .send({ id: 1, billingRate: 12000, pageName: 'LoadingToUnloading' })
            .expect(200)
        expect(mockupdateDirectTripBillingRate).toHaveBeenCalledTimes(1)
    })
    test('should able to update billing rate for loading to stock trip', async () => {
        mockupdateStockTripBillingRate.mockResolvedValue(mockUpdateBillingRateData)
        await supertest(app)
            .put('/api/invoice/billingrate')
            .send({ id: 1, billingRate: 12000, pageName: 'LoadingToStock' })
            .expect(200)
        expect(mockupdateStockTripBillingRate).toHaveBeenCalledTimes(1)
    })
    test('should able to update billing rate for stock to unloading trip', async () => {
        mockupdateUnloadingTripBillingRate.mockResolvedValue(mockUpdateBillingRateData)
        await supertest(app)
            .put('/api/invoice/billingrate')
            .send({ id: 1, billingRate: 12000, pageName: 'StockToUnloading' })
            .expect(200)
        expect(mockupdateUnloadingTripBillingRate).toHaveBeenCalledTimes(1)
    })
})
