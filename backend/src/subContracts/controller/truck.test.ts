import express from 'express'
import supertest from 'supertest'
import { listAllTruck, listTruckByTransporter } from './truck.ts'

const mockTruck = jest.fn()
const mockTruckByTransporter = jest.fn()

jest.mock('../models/truck', () => ({
    getAllTruck: () => mockTruck(),
    getTruckByTransporter: () => mockTruckByTransporter()
}))

describe('Truck Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access', async () => {
        app.get('/truck', listAllTruck)
        mockTruck.mockResolvedValue({ vehicleNumber: 'TN93D5512' })
        await supertest(app).get('/truck').expect({ vehicleNumber: 'TN93D5512' })
        expect(mockTruck).toBeCalledWith()
    })
    test('should get only the trucks by transporter name', async () => {
        app.get('/transporter-truck/:transporterName', listTruckByTransporter)
        mockTruckByTransporter.mockResolvedValue({
            vehicleNumber: 'TN93D5512'
        })
        await supertest(app).get('/transporter-truck/Barath').expect({ vehicleNumber: 'TN93D5512' })
        expect(mockTruckByTransporter).toBeCalledWith()
    })
})
