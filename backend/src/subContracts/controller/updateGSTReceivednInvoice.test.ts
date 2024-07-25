import { NextFunction } from 'express'
import { Role } from '../roles'
import supertest from 'supertest'
import { app } from '../../app'

const mockupdateGSTReceivedModel = vi.fn()
const mockAuth = vi.fn()

vi.mock('../models/companyInvoice/updateCompanyInvoice', () => ({
    updateGSTReceivedModel: (ids: number[]) => mockupdateGSTReceivedModel(ids)
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
describe('ViewInvoice Controller', () => {
    test('should be able to update GST received in invoice', async () => {
        mockupdateGSTReceivedModel.mockResolvedValue({ count: 1 })
        await supertest(app)
            .put('/api/invoice/gstReceived')
            .send({ ids: [1] })
            .expect(200)
        expect(mockupdateGSTReceivedModel).toHaveBeenCalledTimes(1)
        expect(mockupdateGSTReceivedModel).toBeCalledWith([1])
    })
})
