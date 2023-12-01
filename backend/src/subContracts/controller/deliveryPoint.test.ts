import express from 'express'
import supertest from 'supertest'
import { listAllDeliveryPoint, listDeliveryPonitBycementCompany } from './deliveryPoint.ts'

const mockDeliveryPoint = jest.fn()
const mockDeliveryPointByCompany = jest.fn()

jest.mock('../models/deliveryPoint', () => ({
    getAllDeliveryPoint: () => mockDeliveryPoint(),
    getDeliveryPointByCompany: () => mockDeliveryPointByCompany()
}))

describe('Delivery point Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access', async () => {
        app.get('/delivery-point', listAllDeliveryPoint)
        mockDeliveryPoint.mockResolvedValue({ location: 'Salem, Tamilnadu' })
        await supertest(app).get('/delivery-point').expect({ location: 'Salem, Tamilnadu' })
        expect(mockDeliveryPoint).toBeCalledWith()
    })
    test('should get only the delivery point by cement company name', async () => {
        app.get('/delivery-point/:companyName', listDeliveryPonitBycementCompany)
        mockDeliveryPointByCompany.mockResolvedValue({
            location: 'Salem, Tamilnadu'
        })
        await supertest(app).get('/delivery-point/barath').expect({
            location: 'Salem, Tamilnadu'
        })
        expect(mockDeliveryPointByCompany).toBeCalledWith()
    })
})
