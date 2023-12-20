import supertest from 'supertest'
import { app } from '../../app.ts'
import { listOnlyActiveDues, listTripWithActiveDues } from './paymentDues.ts'

const mockGroupPaymentDues = jest.fn()
const mockTripWithActiveDues = jest.fn()

jest.mock('../models/paymentDues', () => ({
    getOnlyActiveDuesByName: () => mockGroupPaymentDues(),
    findTripWithActiveDues: () => mockTripWithActiveDues()
}))

const mockGroupedDueDetails = {
    name: 'Abc Logistics',
    _count: {
        tripId: 2
    },
    _sum: {
        payableAmount: 50000
    }
}
const mockTripWithDues = {
    payableAmount: 50000,
    tripId: 1,
    type: 'initial pay'
}
describe('PricePoint Controller', () => {
    test('should group the payment dues by name', async () => {
        app.get('/payment-dues', listOnlyActiveDues)
        mockGroupPaymentDues.mockResolvedValue(mockGroupedDueDetails)
        await supertest(app)
            .get('/payment-dues')
            .expect({
                name: 'Abc Logistics',
                _count: {
                    tripId: 2
                },
                _sum: {
                    payableAmount: 50000
                }
            })
        expect(mockGroupPaymentDues).toHaveBeenCalledTimes(1)
    })
    test('should find active trip with dues', async () => {
        app.get('/payment-dues/:name', listTripWithActiveDues)
        mockTripWithActiveDues.mockResolvedValue(mockTripWithDues)
        await supertest(app).get('/payment-dues/Abc').expect({
            payableAmount: 50000,
            tripId: 1,
            type: 'initial pay'
        })
        expect(mockTripWithActiveDues).toHaveBeenCalledTimes(1)
    })
})
