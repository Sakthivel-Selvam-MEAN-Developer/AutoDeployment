import { NextFunction } from 'express'
import { Role } from '../roles'
import supertest from 'supertest'
import { app } from '../../app'

const mockCreateCompanyAdvisory = vi.fn()
const mockGetCompanyAdvisory = vi.fn()
const mockUpdateCompanyInvoice = vi.fn()
const mockAuth = vi.fn()

vi.mock('../models/companyAdvisory', () => ({
    create: (data: any) => mockCreateCompanyAdvisory(data),
    getCompanyAdvisory: (companyId: number) => mockGetCompanyAdvisory(companyId)
}))
vi.mock('../models/viewInvoice', () => ({
    updateCompanyInvoice: (companyAdvisoryId: number) => mockUpdateCompanyInvoice(companyAdvisoryId)
}))
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

const mockCreateCompanyData = {
    id: 1,
    bankReferenceNumber: 'P0900767567',
    paymentDocumentNumber: 'NML056555',
    paymentReceivedDate: 1720569600,
    receivedAmount: 45000
}
const mockUpdateCompanyInvoiceData = { count: 1 }
const mockReqBody = {
    body: {
        bankReferenceNumber: 'P0900767567',
        paymentDocumentNumber: 'NML056555',
        invoiceDetails: [
            {
                id: 1,
                paymentReceivedDate: 1720569600,
                receivedAmount: 45000
            },
            {
                id: 2,
                paymentReceivedDate: 1719792000,
                receivedAmount: 56000
            }
        ]
    }
}
describe.skip('company advisory controller', async () => {
    test('should able to update company invoice', async () => {
        mockCreateCompanyAdvisory.mockResolvedValue(mockCreateCompanyData)
        mockUpdateCompanyInvoice.mockResolvedValue(mockUpdateCompanyInvoiceData)
        await supertest(app).put('/api/companyAdvisory/create').send(mockReqBody.body).expect(200)
        expect(mockCreateCompanyAdvisory).toBeCalledTimes(1)
        expect(mockUpdateCompanyInvoice).toBeCalledTimes(1)
    })
})
