import supertest from 'supertest'
import express from 'express'
import dayjs from 'dayjs'

const mockPaymentDuesByName = vi.fn()
const mockTripDues = vi.fn()
const mockgroupData = vi.fn()
const mockUpdatePayment = vi.fn()

vi.mock('../models/paymentDues', () => ({
    getOnlyActiveDuesByName: () => mockPaymentDuesByName(),
    findTripWithActiveDues: () => mockTripDues()
}))
vi.mock('../controller/paymentDues', () => ({
    groupDataByName: (mockTripWithDues: any, mockDueDetailsByName: any) =>
        mockgroupData(mockTripWithDues, mockDueDetailsByName),
    updatePayment: () => mockUpdatePayment
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
const mockUpdateData = {
    id: 1,
    transactionId: 'hgf43',
    paidAt: dayjs().unix()
}
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
    test.skip('should update the paymentDue with transactionId', async () => {
        mockUpdatePayment.mockResolvedValue(mockUpdateData)
        await supertest(app).put('/payment-dues')
        expect(mockUpdatePayment).toHaveBeenCalledTimes(1)
    })
})
