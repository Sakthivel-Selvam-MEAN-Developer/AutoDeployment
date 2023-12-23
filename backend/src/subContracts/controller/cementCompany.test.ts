import supertest from 'supertest'
import { Prisma } from '@prisma/client'
import { app } from '../../app.ts'
import { createCompany, listAllCementCompany } from './cementCompany.ts'

const mockCreateCompany = vi.fn()
const mockCementCompany = vi.fn()

vi.mock('../models/cementCompany', () => ({
    create: (inputs: Prisma.cementCompanyCreateInput) => mockCreateCompany(inputs),
    getAllCementCompany: () => mockCementCompany()
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
    test.skip('should able to create', async () => {
        app.post('/cementCompany', createCompany)
        expect(mockCreateCompany).toBeCalledWith(mockCompany)
    })
    test('should able to access', async () => {
        app.get('/cementCompany', listAllCementCompany)
        mockCementCompany.mockResolvedValue({ name: 'UltraTech Cements' })
        await supertest(app).get('/cementCompany').expect({ name: 'UltraTech Cements' })
        expect(mockCementCompany).toBeCalledWith()
    })
})
