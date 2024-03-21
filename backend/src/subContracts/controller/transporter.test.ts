import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { createTransporter } from './transporter.ts'
import { Role } from '../roles.ts'

const mockTransporter = vi.fn()
const mockCreateTransporter = vi.fn()

vi.mock('../models/transporter', () => ({
    getAllTransporter: () => mockTransporter(),
    create: (inputs: any) => mockCreateTransporter(inputs)
}))
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
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
const mockReq = {
    body: {
        name: 'Barath Logistics Pvt Ltd',
        emailId: 'sample@gmail.com',
        contactPersonName: 'Muthu',
        contactPersonNumber: '1234',
        address: 'Muthu Street',
        hasGst: false,
        hasTds: false,
        accountHolder: 'muthu',
        accountNumber: '43534523',
        ifsc: 'zxy1234'
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn()
} as unknown as Response

describe('Transporter Controller', () => {
    test('should able to access', async () => {
        mockTransporter.mockResolvedValue({ name: 'Barath Logistics' })
        await supertest(app).get('/api/transporter').expect({ name: 'Barath Logistics' })
        expect(mockTransporter).toBeCalledWith()
    })
    test('should able to create transporter', async () => {
        mockCreateTransporter.mockResolvedValue(mockReq.body)
        createTransporter(mockReq, mockRes)
        await supertest(app).post('/api/transporter').expect(200)
        expect(mockCreateTransporter).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreateTransporter).toBeCalledTimes(2)
    })
    test('should have super admin role for transporter', async () => {
        await supertest(app).post('/api/transporter').expect(200)
        expect(mockAuth).toBeCalledWith(['Employee'])
    })
})
