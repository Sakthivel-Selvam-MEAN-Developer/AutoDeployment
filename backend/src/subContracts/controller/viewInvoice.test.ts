import supertest from 'supertest'
import { app } from '../../app.ts'

const mockCompanyGeneratedInvoice = vi.fn()

vi.mock('../models/viewInvoice', () => ({
    getCompanyInvoice: () => mockCompanyGeneratedInvoice()
}))
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
    test('should able to get all invoiceGenerated billNo', async () => {
        mockCompanyGeneratedInvoice.mockResolvedValue(mockGeneratedInvoice)
        await supertest(app)
            .get('/api/invoice/viewInvoice')
            .query({
                startDate: '1688282262',
                endDate: '1688282262',
                cementCompany: JSON.stringify({ id: 1 })
            })
            .expect(200)
        expect(mockCompanyGeneratedInvoice).toBeCalledTimes(1)
    })
})
