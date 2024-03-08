import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'

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
vi.mock('../../authorization', () => ({
    hasRole: () => (_req: any, _res: any, next: any) => {
        next()
    }
}))

const mockCompany = {
    name: 'Sankar Cements',
    gstNo: 'ASD123',
    emailId: 'sample@gmail.com',
    contactPersonName: 'Barath',
    contactPersonNumber: '9876543436',
    address: 'Salem, TamilNadu'
}

describe('Cement Company Controller', () => {
    test('should able to create', async () => {
        mockCreateCompany.mockResolvedValue(mockCompany)
        await supertest(app).post('/api/cementCompany').expect(200)
        expect(mockCreateCompany).toBeCalledTimes(1)
    })
    test('should able to access', async () => {
        mockCementCompany.mockResolvedValue({ name: 'UltraTech Cements' })
        await supertest(app).get('/api/cementCompany').expect({ name: 'UltraTech Cements' })
        expect(mockCementCompany).toBeCalledWith()
    })
})
