import express from 'express'
import supertest from 'supertest'
import { listAllLoadingPoint, listLoadingPointByCementCompany } from './loadingPoint.ts'

const mockLoadingPoint = vi.fn()
const mockLoadingPointByCompany = vi.fn()

vi.mock('../models/loadingPoint', () => ({
    getAllLoadingPoint: () => mockLoadingPoint(),
    getLoadingPointByCompany: () => mockLoadingPointByCompany()
}))

describe('Factory Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to get all factory', async () => {
        app.get('/loading-point', listAllLoadingPoint)
        mockLoadingPoint.mockResolvedValue({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        await supertest(app).get('/loading-point').expect({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        expect(mockLoadingPoint).toBeCalledWith()
    })
    test('should get only the factory by cement company name', async () => {
        app.get('/loading-point/:companyName', listLoadingPointByCementCompany)
        mockLoadingPointByCompany.mockResolvedValue({
            name: 'UltraTech Cements'
        })
        await supertest(app).get('/loading-point/Barath').expect({
            name: 'UltraTech Cements'
        })
        expect(mockLoadingPointByCompany).toBeCalledWith()
    })
})
