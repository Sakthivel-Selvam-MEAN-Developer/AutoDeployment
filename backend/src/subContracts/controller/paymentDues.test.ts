import supertest from 'supertest'
import express from 'express'

const mockPaymentDuesByName = jest.fn()
const mockTripDues = jest.fn()
const mockgroupData = jest.fn()

jest.mock('../models/paymentDues', () => ({
    getOnlyActiveDuesByName: () => mockPaymentDuesByName(),
    findTripWithActiveDues: () => mockTripDues()
}))
jest.mock('../controller/paymentDues', () => ({
    groupDataByName: (mockTripWithDues: any, mockDueDetailsByName: any) =>
        mockgroupData(mockTripWithDues, mockDueDetailsByName)
}))

// const mockTripWithDues = [
//     {
//         payableAmount: 20000,
//         tripId: 1,
//         type: 'initial pay',
//         name: 'Barath Logistics Pvt Ltd'
//     },
//     {
//         payableAmount: 30000,
//         tripId: 3,
//         type: 'initial pay',
//         name: 'Barath Logistics Pvt Ltd'
//     }
// ]
// const mockDueDetailsByName = {
//     name: 'Barath Logistics Pvt Ltd',
//     _count: {
//         tripId: 2
//     },
//     _sum: {
//         payableAmount: 50000
//     }
// }
const mockGroupedDueDetails = [
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: {
            count: 2,
            totalPayableAmount: 50000
        },
        tripDetails: [
            {
                tripId: 1,
                payableAmount: 20000,
                type: 'initial pay'
            },
            {
                tripId: 3,
                payableAmount: 30000,
                type: 'initial pay'
            }
        ]
    }
]
describe('PricePoint Controller', () => {
    let app: any
    beforeEach(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
    })
    test.skip('should group the payment dues by name', async () => {
        mockgroupData.mockResolvedValue(mockGroupedDueDetails)
        await supertest(app).get('/payment-dues').expect(mockGroupedDueDetails)
        expect(mockgroupData).toHaveBeenCalledTimes(1)
    })
})
