import { NextFunction } from 'express'
import { Role } from '../roles'
import supertest from 'supertest'
import { app } from '../../app'

const mockCreateCompanyAdvisory = vi.fn()
const mockGetCompanyAdvisory = vi.fn()
const mockAuth = vi.fn()

vi.mock('../models/companyAdvisory', () => ({
    create: (data: any) => mockCreateCompanyAdvisory(data),
    getCompanyAdvisorys: () => mockGetCompanyAdvisory()
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

const mockReqBody = {
    body: {
        bankReferenceNumber: 'P0900767567',
        paymentDocumentNumber: 'NML056555',
        paymentReceivedDate: 1720569600
    }
}
const mockCreateCompanyData = {
    id: 1,
    ...mockReqBody.body
}
describe('company advisory controller', async () => {
    test('should able to create company advisory', async () => {
        mockCreateCompanyAdvisory.mockResolvedValue(mockCreateCompanyData)
        await supertest(app).post('/api/companyAdvisory/create').send(mockReqBody.body).expect(200)
        expect(mockCreateCompanyAdvisory).toBeCalledTimes(1)
        expect(mockCreateCompanyAdvisory).toHaveBeenCalledWith(mockReqBody.body)
    })
    test('should able to get company advisory', async () => {
        mockGetCompanyAdvisory.mockResolvedValue({ bankReferenceNumber: 'P0900767567', id: 1 })
        await supertest(app).get('/api/companyAdvisory/get').send(mockReqBody.body).expect(200)
        expect(mockGetCompanyAdvisory).toHaveBeenCalledTimes(1)
    })
})
