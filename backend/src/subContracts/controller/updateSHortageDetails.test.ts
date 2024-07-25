import supertest from 'supertest'
import { app } from '../../app'
import { Role } from '../roles'
import { NextFunction } from 'express'

const mockupdateInvoiceReceived = vi.fn()
const mockupdateShortageDetailsModel = vi.fn()
const mockAuth = vi.fn()

vi.mock('../models/companyInvoice/updateCompanyInvoice', () => ({
    updateInvoiceReceived: (id: number) => mockupdateInvoiceReceived(id),
    updateShortageDetailsModel: (inputs: any) => mockupdateShortageDetailsModel(inputs)
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
const mockReq = {
    body: {
        shortageAmount: 2000,
        invoiceId: 1,
        billNo: 'MGL-01'
    }
}
describe('ViewInvoice Controller', () => {
    test('should be able to update shortage to bill number', async () => {
        mockupdateInvoiceReceived.mockResolvedValue({})
        mockupdateShortageDetailsModel.mockResolvedValue({})
        await supertest(app).put('/api/invoice/shortage/update').send(mockReq.body).expect(200)
        expect(mockupdateInvoiceReceived).toHaveBeenCalledTimes(1)
        expect(mockupdateShortageDetailsModel).toHaveBeenCalledTimes(1)
    })
    test('should not be able to update shortage to bill number if shortage 0', async () => {
        mockupdateInvoiceReceived.mockResolvedValue({})
        mockupdateShortageDetailsModel.mockResolvedValue({})
        await supertest(app)
            .put('/api/invoice/shortage/update')
            .send({ ...mockReq.body, shortageAmount: 0, invoiceId: undefined })
            .expect(200)
        expect(mockupdateInvoiceReceived).toHaveBeenCalledTimes(2)
        expect(mockupdateShortageDetailsModel).toHaveBeenCalledTimes(1)
    })
})
