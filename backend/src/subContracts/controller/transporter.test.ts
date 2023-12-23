import express from 'express'
import supertest from 'supertest'
import { listAllTransporter } from './transporter.ts'

const mockTransporter = vi.fn()

vi.mock('../models/transporter', () => ({
    getAllTransporter: () => mockTransporter()
}))

describe('Transporter Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access', async () => {
        app.get('/transporter', listAllTransporter)
        mockTransporter.mockResolvedValue({ name: 'Barath Logistics' })
        await supertest(app).get('/transporter').expect({ name: 'Barath Logistics' })
        expect(mockTransporter).toBeCalledWith()
    })
})
