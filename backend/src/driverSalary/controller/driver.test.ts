import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { createDriver } from './driver.ts'

const mockCreateDriver = vi.fn()

vi.mock('../models/driver', () => ({
    create: (inputs: any) => mockCreateDriver(inputs)
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
const mockDriverData = {
    body: {
        id: 1,
        name: 'User',
        fatherName: 'userFather',
        dateofBirth: 1709836200,
        aadharNumber: '34567890',
        panNumber: 'abdyyy222',
        address: 'new street',
        mobileNumber: '0987645678',
        driverLicense: '34567cvb',
        licenseExpriryDate: 1709836200,
        bankName: 'newBank',
        accountNumber: '23456789876',
        accountBranch: 'newBrach',
        ifcsCode: 'ifcs45678'
    }
} as Request

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis()
} as unknown as Response

describe('Driver Controller', () => {
    test('should able to create driver', async () => {
        mockCreateDriver.mockResolvedValue(mockDriverData.body)
        createDriver(mockDriverData, mockRes)
        await supertest(app).post('/api/driver').expect(200)
        expect(mockCreateDriver).toBeCalledTimes(2)
    })
})
