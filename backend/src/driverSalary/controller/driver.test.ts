import { NextFunction, Request, Response } from 'express'
import { exec } from 'child_process'
import supertest from 'supertest'
import { createDriver } from './driver.ts'
import { app } from '../../app.ts'

const mockCreateDriver = vi.fn()
const mockGetAllDriver = vi.fn()

vi.mock('../models/driver', () => ({
    create: (inputs: any) => mockCreateDriver(inputs),
    getAllDriver: () => mockGetAllDriver()
}))
vi.mock('../../auditRoute.ts', () => ({
    auditRoute: (_req: Request, _res: Response, next: NextFunction) => {
        next()
    }
}))
vi.mock('child_process', () => ({
    exec: vi.fn()
}))

const setMockExecResponse = (stdout: any, stderr: any) => {
    // @ts-expect-error tsError
    exec.mockImplementation((_command: any, callback: any) => {
        callback(null, stdout, stderr)
    })
}
const mockDriverData = {
    body: {
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
const allDriver = [
    {
        name: 'User',
        fatherName: 'userFather',
        dateofBirth: 1709836200,
        aadharNumber: '34567890'
    }
]
const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

describe('Driver Controller', () => {
    test('should able to create driver', async () => {
        setMockExecResponse('', 'User Created Successfully')
        mockCreateDriver.mockResolvedValue(mockDriverData.body)
        await createDriver(mockDriverData, mockRes)
        expect(mockRes.status).toHaveBeenCalledTimes(1)
        expect(mockRes.json).toHaveBeenCalledTimes(1)
    })
    test('should not able to create driver when user name already exists', async () => {
        setMockExecResponse('', 'User exists with same username')
        mockCreateDriver.mockResolvedValue(mockDriverData.body)
        await createDriver(mockDriverData, mockRes)
        mockCreateDriver.mockResolvedValue(mockDriverData.body)
        await createDriver(mockDriverData, mockRes)
        expect(mockRes.status).toHaveBeenCalledTimes(3)
        expect(mockRes.json).toHaveBeenCalledTimes(3)
    })
    test('should able to get driver', async () => {
        mockGetAllDriver.mockResolvedValue(allDriver)
        await supertest(app).get('/api/driver').expect(200)
        expect(mockGetAllDriver).toBeCalledTimes(1)
    })
})
