// import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
// import { exec } from 'child_process'
// import { app } from '../../app.ts'
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
vi.mock('child_process', () => ({
    exec: vi.fn(() => ({
        stdout: 'User already exists with the same username',
        stderr: '',
        error: ''
    }))
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
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

describe('Driver Controller', () => {
    test.skip('should able to create driver', async () => {
        // mockCreateDriver.mockResolvedValue(mockDriverData.body)
        // await createDriver(mockDriverData, mockRes)
        // await supertest(app).post('/api/driver').send(mockDriverData.body).expect(200)
        // expect(exec).toHaveBeenCalledTimes(1)
        // expect(exec).toHaveBeenCalledWith(
        //     'docker-compose exec keycloak sh \'/config/createDriver.sh\' User 0987645678',
        //     expect.any(Function)
        // )
        // expect(mockCreateDriver).toBeCalledTimes(1)
        mockCreateDriver.mockResolvedValue(mockDriverData.body)
        vi.mock('child_process', () => ({
            exec: vi.fn(() => ({ stdout: '', stderr: '', error: '' }))
        }))
        await createDriver(mockDriverData, mockRes)
        expect(mockRes.status).toHaveBeenCalledTimes(1)
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.json).toHaveBeenCalledTimes(1)
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Error: User exists with same username'
        })
    })
})
