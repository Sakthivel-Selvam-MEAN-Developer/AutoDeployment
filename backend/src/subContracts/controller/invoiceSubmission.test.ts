import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockGetCompanyInvoiceForSubmitDate = vi.fn()
const mockUpdateSubmitDate = vi.fn()
const mockUpdateDueDate = vi.fn()
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../models/companyInvoice/companyInvoice.ts', () => ({
    getCompanyInvoiceForSubmitDate: () => mockGetCompanyInvoiceForSubmitDate(),
    updateSubmitDate: () => mockUpdateSubmitDate()
}))
vi.mock('../models/companyInvoice/updateCompanyInvoice', () => ({
    getCompanyInvoiceForSubmitDate: () => mockGetCompanyInvoiceForSubmitDate(),
    updateSubmitDate: () => mockUpdateSubmitDate(),
    updateDueDate: () => mockUpdateDueDate()
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
const updateData = {
    id: 1,
    submitDate: 1688282262,
    cementCompany: {
        paymentOffSetDays: 5
    }
}
describe('invoiceSubmissiondate Controller', () => {
    test('should able to get all invoice with no Submission date', async () => {
        mockGetCompanyInvoiceForSubmitDate.mockResolvedValue(companyInvoice)
        await supertest(app).get('/api/submissiondate').expect(200).expect(companyInvoice)
        expect(mockGetCompanyInvoiceForSubmitDate).toBeCalledTimes(1)
    })
    test('should able to update Submission date and generate dueDate in companyInvoice', async () => {
        mockUpdateSubmitDate.mockResolvedValue(updateData)
        await supertest(app).put('/api/submissiondate').expect(200)
        expect(mockUpdateSubmitDate).toBeCalledTimes(1)
        expect(mockUpdateDueDate).toBeCalledTimes(1)
    })
    test('should able to update Submission date and generate dueDate when paymentOffSetDaysis null in companyInvoice', async () => {
        const input = { ...updateData, cementCompany: { paymentOffSetDays: null } }
        mockUpdateSubmitDate.mockResolvedValue(input)
        await supertest(app).put('/api/submissiondate').expect(200)
        expect(mockUpdateSubmitDate).toBeCalledTimes(2)
        expect(mockUpdateDueDate).toBeCalledTimes(2)
    })
})
