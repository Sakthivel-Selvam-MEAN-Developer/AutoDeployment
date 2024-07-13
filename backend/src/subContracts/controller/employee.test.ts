import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockCreateEmployee = vi.fn()
const mockAuth = vi.fn()
const mockGetAllEmployee = vi.fn()
const mockUpdateEmployee = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../models/employee', () => ({
    create: (inputs: any) => mockCreateEmployee(inputs),
    getAllEmployee: () => mockGetAllEmployee(),
    updateEmployee: () => mockUpdateEmployee()
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

describe('Employee Controller', () => {
    test('should able to create employee', async () => {
        mockCreateEmployee.mockResolvedValue(mockReq.body)
        await supertest(app).post('/api/employee').expect(200)
    })
    test('should able to get all Employee', async () => {
        mockGetAllEmployee.mockResolvedValue(mockReq.body)
        await supertest(app).get('/api/getAllEmployee').expect(200)
        expect(mockGetAllEmployee).toBeCalledWith()
    })
    test('should able to update the trucks to transporter ', async () => {
        mockUpdateEmployee.mockResolvedValue(mockReq.body)
        await supertest(app)
            .put('/api/updateEmployee')
            .send({ id: 5, data: mockReq.body })
            .expect(200)
        expect(mockUpdateEmployee).toBeCalledWith()
    })
})
