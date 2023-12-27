import supertest from 'supertest'
import { app } from '../../app.ts'
import { listAllTrip } from './loadingToUnloadingTrip.ts'

const mockgetTrip = vi.fn()
const mockCreateTrip = vi.fn()
const mockActiveTrip = vi.fn()

vi.mock('../models/loadingToUnloadingTrip', () => ({
    getAllTrip: () => mockgetTrip(),
    createTrip: () => mockCreateTrip(),
    getOnlyActiveTrip: () => mockActiveTrip()
}))

describe('Trip Controller', () => {
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
