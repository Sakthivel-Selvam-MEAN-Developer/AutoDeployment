import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { app } from '../../app.ts'
import { createCompany } from './cementCompany.ts'

const mockCreateCompany = vi.fn()
const mockCementCompany = vi.fn()

vi.mock('../models/cementCompany', () => ({
    create: (inputs: Prisma.cementCompanyCreateInput) => mockCreateCompany(inputs),
    getAllCementCompany: () => mockCementCompany()
}))

vi.mock('../../keycloak-config.ts', () => ({
    default: {
        protect: () => (_req: any, _resp: any, next: any) => {
            next()
        },
        middleware: () => (_req: any, _resp: any, next: any) => {
            next()
        }
    }
}))

let actualRole = ''
vi.mock('../../authorization', () => ({
    hasRole: (role: string) => (_req: any, _res: any, next: any) => {
        actualRole = role
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
    test('should have super admin role for create company', async () => {
        await supertest(app).post('/api/cementCompany').expect(200)
        expect(actualRole).toBe('SuperAdmin')
    })
    test('should able to access', async () => {
        mockCementCompany.mockResolvedValue({ name: 'UltraTech Cements' })
        await supertest(app).get('/api/cementCompany').expect({ name: 'UltraTech Cements' })
        expect(mockCementCompany).toBeCalledWith()
    })
})
