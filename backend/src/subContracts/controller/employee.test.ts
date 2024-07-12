import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'
import { createEmployee } from './employee.ts'

const mockCreateEmployee = vi.fn()
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../models/employee', () => ({
    create: (inputs: any) => mockCreateEmployee(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockReq = {
    body: {
        corporateId: 'MAG0001',
        joiningDate: 960808392,
        name: 'Ravi shankar',
        mailId: 'ravi@gmail.com',
        contactNumber: 9,
        department: 'support',
        designation: 'CSM',
        address: 'Erode',
        dateOfBirth: 960808392,
        aadharNumber: '9876543210',
        panNumber: 'ABCDE9876F',
        bloodGroup: 'O+',
        accountName: 'Ravishankar Venkatasamy',
        accountNumber: '987766554322',
        ifscCode: 'IOBA00001',
        branch: 'Erode',
        accountType: 'current',
        loginAccess: true
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
} as unknown as Response

describe('Employee Controller', () => {
    test('should able to create employee', async () => {
        mockCreateEmployee.mockResolvedValue(mockReq.body)
        createEmployee(mockReq, mockRes)
        await supertest(app).post('/api/employee').expect(200)
        expect(mockCreateEmployee).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreateEmployee).toBeCalledTimes(2)
    })
})
