import express from 'express'
import supertest from 'supertest'
import { listAllUnloadingPoint, listUnloadingPonitBycementCompany } from './unloadingPoint.ts'

const mockUnloadingPoint = vi.fn()
const mockUnloadingPointByCompany = vi.fn()

vi.mock('../models/unloadingPoint', () => ({
    getAllUnloadingPoint: () => mockUnloadingPoint(),
    getUnloadingPointByCompany: () => mockUnloadingPointByCompany()
}))

describe('Delivery point Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access', async () => {
        app.get('/unloading-point', listAllUnloadingPoint)
        mockUnloadingPoint.mockResolvedValue({ location: 'Salem, Tamilnadu' })
        await supertest(app).get('/unloading-point').expect({ location: 'Salem, Tamilnadu' })
        expect(mockUnloadingPoint).toBeCalledWith()
    })
    test('should get only the delivery point by cement company name', async () => {
        app.get('/unloading-point/:companyName', listUnloadingPonitBycementCompany)
        mockUnloadingPointByCompany.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).get('/unloading-point/barath').expect({
            location: 'Salem, Tamilnadu'
        })
        expect(mockUnloadingPointByCompany).toBeCalledWith()
    })
})
