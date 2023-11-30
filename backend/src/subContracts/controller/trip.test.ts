import express from 'express'
import supertest from 'supertest'
import { listAllTrip } from './trip.ts'

const mockgetTrip = jest.fn()
const mockPostTrip = jest.fn()

jest.mock('../models/factoryToCustomerTrip', () => ({
    getAllTrip: () => mockgetTrip(),
    postTrip: () => mockPostTrip()
}))

describe('Trip Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test('should able to access all trip', async () => {
        app.get('/trip', listAllTrip)
        mockgetTrip.mockResolvedValue([
            {
                filledLoad: 40,
                invoiceNumber: 'ABC123'
            }
        ])
        await supertest(app)
            .get('/trip')
            .expect([
                {
                    filledLoad: 40,
                    invoiceNumber: 'ABC123'
                }
            ])
        expect(mockgetTrip).toBeCalledWith()
    })
    // test('should able to access crteate trip', async () => {
    //     app.post('/trip', postTrip)
    //     mockPostTrip.mockResolvedValue({
    //         filledLoad: 40,
    //         invoiceNumber: 'ABC123',
    //     })
    //     await supertest(app).get('/trip').expect({
    //         filledLoad: 40,
    //         invoiceNumber: 'ABC123',
    //     })
    //     expect(mockPostTrip).toBeCalledWith()
    // })
})
