import express from 'express'
import supertest from 'supertest'
import { listAllCementCompany } from './cementCompany.ts'

const mockCementCompany = jest.fn()

jest.mock('../models/cementCompany', () => ({
    getAllCementCompany: () => mockCementCompany()
}))

describe('Cement Company Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access', async () => {
        app.get('/cementCompany', listAllCementCompany)
        mockCementCompany.mockResolvedValue({ name: 'UltraTech Cements' })
        await supertest(app).get('/cementCompany').expect({ name: 'UltraTech Cements' })
        expect(mockCementCompany).toBeCalledWith()
    })
})
