import dayjs from 'dayjs'
import {
    create,
    findTripWithActiveDues,
    getOnlyActiveDuesByName,
    updatePaymentDues
} from './paymentDues.ts'
import seedPaymentDue from '../seed/paymentDue.ts'

describe('Payment-Due model', () => {
    test('should able to create', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const type = 'initial pay'
        const actual = await findTripWithActiveDues(dueDate, type)
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(seedPaymentDue.payableAmount)
    })
    test('should get grouped active dues by name', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const type = 'initial pay'
        await create({ ...seedPaymentDue, payableAmount: 30000, tripId: 10 })
        const groupDues = await getOnlyActiveDuesByName(dueDate, type)
        expect(groupDues.length).toBe(1)
        expect(groupDues[0].name).toBe(seedPaymentDue.name)
        // eslint-disable-next-line no-underscore-dangle
        expect(groupDues[0]._sum.payableAmount).toBe(50000)
    })
    test('should update the payment dues', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const type = 'initial pay'
        const actual = await findTripWithActiveDues(dueDate, type)
        const wantToUpdate = {
            id: actual[0].id,
            transactionId: 'abc',
            paidAt: dayjs().unix()
        }
        const update = await updatePaymentDues(wantToUpdate)
        expect(update.transactionId).toBe(wantToUpdate.transactionId)
    })
})
