import { NextFunction, Request, Response } from 'express'
import { exec } from 'child_process'
import supertest from 'supertest'
import { createDriver } from './driver.ts'
import { app } from '../../app.ts'

const mockCreateDriver = vi.fn()
const mockGetAllDriver = vi.fn()
const mockgetAllDriverAttendanceDetails = vi.fn()

vi.mock('../models/driver', () => ({
    create: (inputs: any) => mockCreateDriver(inputs),
    getAllDriver: () => mockGetAllDriver()
}))
vi.mock('../models/driverAttendance', () => ({
    getAllDriverAttendanceDetails: (driverIds: number[]) =>
        mockgetAllDriverAttendanceDetails(driverIds)
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
    },
    {
        name: 'User1',
        fatherName: 'userFather1',
        dateofBirth: 1709936200,
        aadharNumber: '345678901'
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
    test('should not able to create driver and throw error', async () => {
        setMockExecResponse('', 'User exists with same username')
        mockCreateDriver.mockResolvedValue({})
        await createDriver(mockDriverData, mockRes)
        mockCreateDriver.mockResolvedValue(mockDriverData.body)
        await createDriver(mockDriverData, mockRes)
        expect(mockRes.status).toHaveBeenCalledTimes(5)
        expect(mockRes.json).toHaveBeenCalledTimes(5)
    })
    test('should able to get driver', async () => {
        mockGetAllDriver.mockResolvedValue(allDriver)
        await supertest(app).get('/api/driver').expect(200)
        expect(mockGetAllDriver).toBeCalledTimes(1)
    })
    test('should able to filter driver by attendance', async () => {
        mockGetAllDriver.mockResolvedValue(allDriver)
        mockgetAllDriverAttendanceDetails.mockResolvedValue([
            {
                id: 1,
                driverId: 1,
                attendance: [{ year: 2024, attendance: [{ month: 'July', datesPresent: [19] }] }]
            }
        ])
        await supertest(app).get('/api/fillterDriver').expect(200)
        expect(mockGetAllDriver).toBeCalledTimes(2)
        expect(mockgetAllDriverAttendanceDetails).toBeCalledTimes(1)
    })
})
