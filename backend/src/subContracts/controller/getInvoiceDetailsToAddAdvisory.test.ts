import supertest from 'supertest'
import { app } from '../../app'

const mockgetInvoiceToAddAdvisory = vi.fn()
const mockpageCountForAddAdvisory = vi.fn()

vi.mock('../models/companyInvoice/companyInvoice.ts', () => ({
    getInvoiceToAddAdvisory: (inputs: any) => mockgetInvoiceToAddAdvisory(inputs),
    pageCountForAddAdvisory: (inputs: any) => mockpageCountForAddAdvisory(inputs)
}))
const mockgetInvoiceToAddAdvisoryData = {
    count: 1,
    data: {
        id: 1,
        billNo: 'asdsadc',
        billDate: 1720722600,
        amount: 54000,
        pdfLink: 'https://www.s3.pdf/sample',
        GSTAmount: 6480,
        TDSAmount: 1080,
        cementCompany: {
            name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
            id: 1
        }
    }
}
describe('ViewInvoice Controller', () => {
    test('should be able to get all invoice generated billNo', async () => {
        mockgetInvoiceToAddAdvisory.mockResolvedValue(mockgetInvoiceToAddAdvisoryData)
        mockpageCountForAddAdvisory.mockResolvedValue(1)
        await supertest(app)
            .get('/api/invoice/advisory/add')
            .query({
                startDate: 1720742400,
                endDate: 1721001600,
                cementCompany: { id: 1 },
                pageNumber: 1
            })
            .expect(200)
        expect(mockgetInvoiceToAddAdvisory).toHaveBeenCalledTimes(1)
    })
})
