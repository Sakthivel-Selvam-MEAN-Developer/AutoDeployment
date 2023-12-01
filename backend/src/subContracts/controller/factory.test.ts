import express from 'express'
import supertest from 'supertest'
import { listAllFactory, listFactoryBycementCompany } from './factory.ts'

const mockFactory = jest.fn()
const mockFactoryByCompany = jest.fn()

jest.mock('../models/factory', () => ({
    getAllFactory: () => mockFactory(),
    getFactoryByCompany: () => mockFactoryByCompany()
}))

describe('Factory Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to get all factory', async () => {
        app.get('/factory', listAllFactory)
        mockFactory.mockResolvedValue({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        await supertest(app).get('/factory').expect({
            name: 'UltraTech Cements',
            location: 'Erode'
        })
        expect(mockFactory).toBeCalledWith()
    })
    test('should get only the factory by cement company name', async () => {
        app.get('/factory/:companyName', listFactoryBycementCompany)
        mockFactoryByCompany.mockResolvedValue({
            name: 'UltraTech Cements'
        })
        await supertest(app).get('/factory/Barath').expect({
            name: 'UltraTech Cements'
        })
        expect(mockFactoryByCompany).toBeCalledWith()
    })
})
