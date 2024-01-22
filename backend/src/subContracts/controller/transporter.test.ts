import supertest from 'supertest'
import { app } from '../../app.ts'

const mockTransporter = vi.fn()

vi.mock('../models/transporter', () => ({
    getAllTransporter: () => mockTransporter()
}))

describe('Transporter Controller', () => {
    test('should able to access', async () => {
        mockTransporter.mockResolvedValue({ name: 'Barath Logistics' })
        await supertest(app).get('/api/transporter').expect({ name: 'Barath Logistics' })
        expect(mockTransporter).toBeCalledWith()
    })
})
