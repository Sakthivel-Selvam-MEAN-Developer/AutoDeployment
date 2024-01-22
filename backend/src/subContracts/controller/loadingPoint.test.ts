import supertest from 'supertest'
import { app } from '../../app.ts'

const mockLoadingPoint = vi.fn()
const mockLoadingPointByCompany = vi.fn()

vi.mock('../models/loadingPoint', () => ({
    getAllLoadingPoint: () => mockLoadingPoint(),
    getLoadingPointByCompany: () => mockLoadingPointByCompany()
}))

describe('Factory Controller', () => {
    test('should able to get all factory', async () => {
        mockLoadingPoint.mockResolvedValue({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        await supertest(app).get('/api/loading-point').expect({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        expect(mockLoadingPoint).toBeCalledWith()
    })
    test('should get only the factory by cement company name', async () => {
        mockLoadingPointByCompany.mockResolvedValue({
            name: 'UltraTech Cements'
        })
        await supertest(app).get('/api/loading-point/Barath').expect({
            name: 'UltraTech Cements'
        })
        expect(mockLoadingPointByCompany).toBeCalledWith()
    })
})
