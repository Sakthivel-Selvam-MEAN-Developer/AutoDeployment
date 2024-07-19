import supertest from 'supertest'
import { app } from '../../app.ts'
import { vi } from 'vitest'
const mockCompanyGeneratedInvoice = vi.fn()
const mockgetCompanyInvoiceNameList = vi.fn()
const mockPageCount = vi.fn()
vi.mock('../models/viewInvoice', () => {
    return {
        getCompanyInvoice: () => mockCompanyGeneratedInvoice(),
        pageCount: () => mockPageCount(),
        getCompanyInvoiceNameList: () => mockgetCompanyInvoiceNameList()
    }
})
const mockGeneratedInvoice = [
    {
        billNo: 'MGL-2002',
        billDate: 1688282262,
        companyName: 'ULTRATECH CEMENT LIMITED',
        amount: 30000,
        pdfLink: 'https://aws.s3.sample.pdf'
    }
]
describe('ViewInvoice Controller', () => {
    beforeEach(() => {
        mockCompanyGeneratedInvoice.mockReset()
        mockPageCount.mockReset()
    })
    test('should be able to get all invoiceGenerated billNo', async () => {
        mockCompanyGeneratedInvoice.mockResolvedValue(mockGeneratedInvoice)
        mockPageCount.mockResolvedValue(1)
        await supertest(app)
            .get('/api/invoice/viewInvoice')
            .query({
                startDate: '1688282262',
                endDate: '1688282262',
                cementCompany: JSON.stringify({ id: 1 }),
                pageNumber: '1'
            })
            .expect(200)
        expect(mockCompanyGeneratedInvoice).toBeCalledTimes(1)
        expect(mockPageCount).toBeCalledTimes(1)
    })
    test('should able to update company advisory id in company invoice', async () => {
        mockgetCompanyInvoiceNameList.mockResolvedValue([{ id: 1, billNo: 'MGL-01' }])
        await supertest(app).get('/api/invoice/list').expect(200)
        expect(mockgetCompanyInvoiceNameList).toBeCalledTimes(1)
    })
})
