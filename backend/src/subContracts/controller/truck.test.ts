import express from 'express'
import supertest from 'supertest'
import { listAllTruck } from './truck.ts'

const mockTruck = jest.fn()

jest.mock('../models/truck', () => ({
    getAllTruck: () => mockTruck()
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
})
