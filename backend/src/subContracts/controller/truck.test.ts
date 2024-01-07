import supertest from 'supertest'
import { app } from '../../app.ts'

const mockTruck = vi.fn()
const mockTruckByTransporter = vi.fn()

vi.mock('../models/truck', () => ({
    getAllTruck: () => mockTruck(),
    getTruckByTransporter: () => mockTruckByTransporter()
}))

describe('Truck Controller', () => {
    test('should able to access', async () => {
        mockTruck.mockResolvedValue({ vehicleNumber: 'TN93D5512' })
        await supertest(app).get('/api/truck').expect({ vehicleNumber: 'TN93D5512' })
        expect(mockTruck).toBeCalledWith()
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
