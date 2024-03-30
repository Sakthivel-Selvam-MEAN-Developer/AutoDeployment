import supertest from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { app } from '../../app.ts'
import { Role } from '../roles.ts'

const mockCreateStockPoint = vi.fn()
const mockCreatePricePointMarker = vi.fn()
const mockStockPointByCompany = vi.fn()
const mockAllStockPoint = vi.fn()
const mockAuth = vi.fn()
vi.mock('../routes/authorise', () => ({
    authorise: (role: Role[]) => (_req: Request, _res: Response, next: NextFunction) => {
        mockAuth(role)
        next()
    }
}))

vi.mock('../models/stockPoint', () => ({
    getAllStockPoint: () => mockAllStockPoint(),
    getStockPointByCompany: () => mockStockPointByCompany(),
    create: (inputs: any) => mockCreateStockPoint(inputs)
}))
vi.mock('../models/pricePointMarker', () => ({
    create: (inputs: any) => mockCreatePricePointMarker(inputs)
}))

describe('Stock point Controller', () => {
    test('should able to access', async () => {
        mockAllStockPoint.mockResolvedValue({ location: 'Salem, Tamilnadu' })
        await supertest(app).get('/api/stock-point').expect({ location: 'Salem, Tamilnadu' })
        expect(mockAllStockPoint).toBeCalledTimes(1)
    })
    test('should get only All the stock point', async () => {
        mockStockPointByCompany.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).get('/api/stock-point/1').expect(200)
        expect(mockStockPointByCompany).toBeCalledTimes(1)
    })
    test('should get only All the stock point by cement company name', async () => {
        mockCreatePricePointMarker.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        mockCreateStockPoint.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).post('/api/stock-point').expect(200)
        expect(mockCreateStockPoint).toBeCalledTimes(1)
        expect(mockCreatePricePointMarker).toBeCalledTimes(1)
    })
    test('should have super admin role for stock point', async () => {
        await supertest(app).post('/api/stock-point').expect(200)
        expect(mockAuth).toBeCalledWith(['Admin'])
    })
})
