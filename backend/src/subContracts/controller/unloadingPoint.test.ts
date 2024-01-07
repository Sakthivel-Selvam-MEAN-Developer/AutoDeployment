import supertest from 'supertest'
import { app } from '../../app.ts'

const mockUnloadingPoint = vi.fn()
const mockUnloadingPointByCompany = vi.fn()

vi.mock('../models/unloadingPoint', () => ({
    getAllUnloadingPoint: () => mockUnloadingPoint(),
    getUnloadingPointByCompany: () => mockUnloadingPointByCompany()
}))

describe('Delivery point Controller', () => {
    test('should able to access', async () => {
        mockUnloadingPoint.mockResolvedValue({ location: 'Salem, Tamilnadu' })
        await supertest(app).get('/api/unloading-point').expect({ location: 'Salem, Tamilnadu' })
        expect(mockUnloadingPoint).toBeCalledWith()
    })
    test('should get only the delivery point by cement company name', async () => {
        mockUnloadingPointByCompany.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).get('/api/unloading-point/barath').expect({
            location: 'Salem, Tamilnadu'
        })
        expect(mockUnloadingPointByCompany).toBeCalledWith()
    })
})
