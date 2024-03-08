import supertest from 'supertest'
import { app } from '../../app.ts'

const mockTruck = vi.fn()
const mockTruckByTransporter = vi.fn()
const mockCreateTuck = vi.fn()
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
vi.mock('../../authorization', () => ({
    hasRole: () => (_req: any, _res: any, next: any) => {
        next()
    }
}))
vi.mock('../models/truck', () => ({
    getAllTruck: () => mockTruck(),
    create: (inputs: any) => mockCreateTuck(inputs),
    getTruckByTransporter: () => mockTruckByTransporter()
}))
const mockTruckData = {
    vehicleNumber: 'Tn39cc5647',
    capacity: 45,
    transporterId: 1
}
describe('Truck Controller', () => {
    test('should able to access', async () => {
        mockTruck.mockResolvedValue({ vehicleNumber: 'TN93D5512' })
        await supertest(app).get('/api/truck').expect({ vehicleNumber: 'TN93D5512' })
        expect(mockTruck).toBeCalledWith()
    })
    test('should able to create truck', async () => {
        mockCreateTuck.mockResolvedValue(mockTruckData)
        await supertest(app).post('/api/truck').expect(200)
        expect(mockCreateTuck).toBeCalledTimes(1)
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
