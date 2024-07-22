import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetCompanyInvoiceForSubmitDate = vi.fn()
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../models/companyInvoice', () => ({
    getCompanyInvoiceForSubmitDate: (inputs: any) => mockGetCompanyInvoiceForSubmitDate(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const companyInvoice = {
    id: 1,
    billNo: 'MGL-034',
    billDate: 1688282262,
    amount: 24000,
    pdfLink: 'https://aws.s3.sample.pdf',
    cementCompany: {
        name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
    }
}
describe('invoiceSubmissiondate Controller', () => {
    test('should able to get all invoice for Submission date', async () => {
        mockGetCompanyInvoiceForSubmitDate.mockResolvedValue(companyInvoice)
        await supertest(app).get('/api/submissiondate').expect(200).expect(companyInvoice)
        expect(mockGetCompanyInvoiceForSubmitDate).toBeCalledTimes(1)
    })
})
