import supertest from 'supertest'
import { app } from '../../app'

const mockgetInvoiceFoeGSTModel = vi.fn()
const mockpageCountForGST = vi.fn()

vi.mock('../models/companyInvoice/companyInvoice', () => ({
    getInvoiceFoeGSTModel: (filterData: any) => mockgetInvoiceFoeGSTModel(filterData)
}))
vi.mock('../models/companyInvoice/pageCount', () => ({
    pageCountForGST: (filterData: any) => mockpageCountForGST(filterData)
}))

describe('Get Invoice Details for GST Controller', () => {
    test('should be able to get all invoice details for add GST Received', async () => {
        mockgetInvoiceFoeGSTModel.mockResolvedValue({})
        mockpageCountForGST.mockResolvedValue({})
        await supertest(app)
            .get('/api/invoice/viewInvoice/gst/List')
            .query({
                startDate: 1720742400,
                endDate: 1721001600,
                cementCompany: { id: 1, name: 'Sample' },
                pageNumber: 1
            })
            .expect(200)
        expect(mockgetInvoiceFoeGSTModel).toHaveBeenCalledTimes(1)
        expect(mockpageCountForGST).toHaveBeenCalledTimes(1)
    })
})
