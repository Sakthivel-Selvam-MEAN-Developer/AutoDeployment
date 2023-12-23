import express from 'express'
import supertest from 'supertest'
import { listAllTrip } from './loadingToUnloadingTrip.ts'

const mockgetTrip = vi.fn()
const mockCreateTrip = vi.fn()

vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockgetTrip(),
    createTrip: () => mockCreateTrip()
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
    //     mockCreateTrip.mockResolvedValue({
    //         filledLoad: 40,
    //         invoiceNumber: 'ABC123',
    //     })
    //     await supertest(app).get('/trip').expect({
    //         filledLoad: 40,
    //         invoiceNumber: 'ABC123',
    //     })
    //     expect(mockCreateTrip).toBeCalledWith()
    // })
})
