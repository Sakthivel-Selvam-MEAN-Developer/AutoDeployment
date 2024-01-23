import dayjs from 'dayjs'
import {
    create,
    findTripWithActiveDues,
    getDueByOverallTripId,
    getOnlyActiveDuesByName,
    updatePaymentDues
} from './paymentDues.ts'
import seedPaymentDue from '../seed/paymentDue.ts'

describe('Payment-Due model', () => {
    test('should able to create', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const actual = await findTripWithActiveDues(dueDate)
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(seedPaymentDue.payableAmount)
    })
    test('should get grouped active dues by name', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        await create({ ...seedPaymentDue, payableAmount: 30000, tripId: 10 })
        const groupDues = await getOnlyActiveDuesByName(dueDate)
        expect(groupDues.length).toBe(1)
        expect(groupDues[0].name).toBe(seedPaymentDue.name)
        // eslint-disable-next-line no-underscore-dangle
        expect(groupDues[0]._sum.payableAmount).toBe(50000)
    })
    test('should update the payment dues', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const actual = await findTripWithActiveDues(dueDate)
        const wantToUpdate = {
            id: actual[0].id,
            transactionId: 'abc',
            paidAt: dayjs().unix()
        }
        const update = await updatePaymentDues(wantToUpdate)
        expect(update.transactionId).toBe(wantToUpdate.transactionId)
    })
    test('should able to get due by overallTripId', async () => {
        const overallTripId = 2
        await create({ ...seedPaymentDue, tripId: overallTripId })
        await create({
            ...seedPaymentDue,
            type: 'fuel pay',
            name: 'Barath Petroleum',
            payableAmount: 5000,
            tripId: overallTripId
        })
        const actual = await getDueByOverallTripId(overallTripId)
        expect(actual.length).toBe(2)
    })
})
