import supertest from 'supertest'
import { Request, Response, NextFunction } from 'express'
import { app } from '../../app.ts'
import { createTruck } from './truck.ts'
import { Role } from '../roles.ts'

const mockTruck = vi.fn()
const mockTruckByTransporter = vi.fn()
const mockCreateTuck = vi.fn()
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))
vi.mock('../models/truck', () => ({
    getAllTruck: () => mockTruck(),
    create: (inputs: any) => mockCreateTuck(inputs),
    getTruckByTransporter: () => mockTruckByTransporter()
}))

const mockReq = {
    body: {
        vehicleNumber: 'Tn39cc5647',
        capacity: 45,
        transporterId: 1
    }
} as Request

const mockRes = {
    sendStatus: vi.fn(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
} as unknown as Response

describe('Truck Controller', () => {
    test('should able to access', async () => {
        mockTruck.mockResolvedValue({ vehicleNumber: 'TN93D5512' })
        await supertest(app).get('/api/truck').expect({ vehicleNumber: 'TN93D5512' })
        expect(mockTruck).toBeCalledWith()
    })
    test('should able to create truck', async () => {
        mockCreateTuck.mockResolvedValue(mockReq.body)
        createTruck(mockReq, mockRes)
        await supertest(app).post('/api/truck').expect(200)
        expect(mockCreateTuck).toHaveBeenCalledWith(mockReq.body)
        expect(mockCreateTuck).toBeCalledTimes(2)
    })
    test('should have super admin role for creating truck', async () => {
        await supertest(app).post('/api/truck').expect(200)
        expect(mockAuth).toBeCalledWith(['Employee'])
    })
    test('should get only the trucks by transporter name', async () => {
        mockTruckByTransporter.mockResolvedValue({
            vehicleNumber: 'TN93D5512'
        })
        await supertest(app)
            .get('/api/transporter-truck/Barath')
            .expect({ vehicleNumber: 'TN93D5512' })
        expect(mockTruckByTransporter).toBeCalledWith()
    })
})
