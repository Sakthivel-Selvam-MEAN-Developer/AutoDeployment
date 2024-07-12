import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { createTransporter } from './transporter.ts'
import { Role } from '../roles.ts'

const mockTransporter = vi.fn()
const mockCreateTransporter = vi.fn()
const mockGetAllTransporterName = vi.fn()

vi.mock('../models/transporter', () => ({
    create: (inputs: any) => mockCreateTransporter(inputs),
    getAllTransporterName: () => mockGetAllTransporterName(),
    getAllTransporter: () => mockTransporter()
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
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockReq = {
    body: {
        id: undefined,
        name: 'Barath Logistics Pvt Ltd',
        csmName: 'muthu',
        emailId: 'sample@gmail.com',
        contactPersonName: 'Muthu',
        contactPersonNumber: '1234',
        address: 'Muthu Street',
        hasGst: true,
        gstNumber: '123',
        gstPercentage: 10,
        transporterType: 'own',
        hasTds: true,
        accountHolder: 'muthu',
        panNumber: 'FZHPR32101',
        aadharNumber: '1234567890',
        accountNumber: '43534523',
        ifsc: 'zxy1234',
        accountTypeNumber: 1,
        tdsPercentage: 10,
        branchName: 'abc'
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: () => ({
        json: vi.fn()
    })
} as unknown as Response

const mockGetAllTransporterNames = [
    {
        name: 'Barath Logistics Pvt Ltd'
    }
]
describe('Transporter Controller', () => {
    test('should able to access', async () => {
        mockTransporter.mockResolvedValue({ name: 'Barath Logistics' })
        await supertest(app).get('/api/transporter').expect({ name: 'Barath Logistics' })
        expect(mockTransporter).toBeCalledWith()
    })
    test('should able to create transporter', async () => {
        const { ...details } = mockReq.body
        mockCreateTransporter.mockResolvedValue(mockReq.body)
        createTransporter(mockReq, mockRes)
        await supertest(app).post('/api/transporter').expect(200)
        expect(mockCreateTransporter).toHaveBeenCalledWith(details)
        expect(mockCreateTransporter).toBeCalledTimes(2)
    })
    test('should have super admin role for transporter', async () => {
        await supertest(app).post('/api/transporter').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
    test('should get all transporter names', async () => {
        mockGetAllTransporterName.mockResolvedValue(mockGetAllTransporterNames)
        await supertest(app).get('/api/transporter_name').expect(200)
        await supertest(app)
            .get('/api/transporter_name')
            .expect([{ name: 'Barath Logistics Pvt Ltd' }])
        expect(mockGetAllTransporterName).toBeCalledTimes(2)
    })
})
