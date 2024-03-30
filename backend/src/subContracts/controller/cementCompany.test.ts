import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { createCompany } from './cementCompany.ts'
import { Role } from '../roles.ts'

const mockCreateCompany = vi.fn()
const mockCementCompany = vi.fn()

vi.mock('../models/cementCompany', () => ({
    create: (inputs: Prisma.cementCompanyCreateInput) => mockCreateCompany(inputs),
    getAllCementCompany: () => mockCementCompany()
}))

const mockAuth = vi.fn()
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
        name: 'Sankar Cements',
        gstNo: 'ASD123',
        emailId: 'sample@gmail.com',
        contactPersonName: 'Barath',
        contactPersonNumber: '9876543436',
        address: 'Salem, TamilNadu'
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn()
} as unknown as Response

describe('Cement Company Controller', () => {
    test('should able to create', async () => {
        mockCreateCompany.mockResolvedValue(mockReq.body)
        createCompany(mockReq, mockRes)
        await supertest(app).post('/api/cementCompany').expect(200)
        expect(mockCreateCompany).toBeCalledTimes(2)
    })
    test.skip('should have super admin role for create company', async () => {
        await supertest(app).post('/api/cementCompany').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
    test('should able to access', async () => {
        mockCementCompany.mockResolvedValue({ name: 'UltraTech Cements' })
        await supertest(app).get('/api/cementCompany').expect({ name: 'UltraTech Cements' })
        expect(mockCementCompany).toBeCalledWith()
    })
})
