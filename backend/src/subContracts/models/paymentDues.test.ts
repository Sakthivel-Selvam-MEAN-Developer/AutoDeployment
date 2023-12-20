import { create, findTripWithActiveDues, getOnlyActiveDuesByName } from './paymentDues.ts'
import seedPaymentDue from '../seed/paymentDue.ts'

describe('Payment-Due model', () => {
    test('should able to create', async () => {
        await create(seedPaymentDue)
        const actual = await findTripWithActiveDues(seedPaymentDue.name)
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(seedPaymentDue.payableAmount)
    })
    test('should get grouped active dues by name', async () => {
        await create(seedPaymentDue)
        await create({ ...seedPaymentDue, payableAmount: 30000, tripId: 10 })
        const groupDues = await getOnlyActiveDuesByName()
        expect(groupDues.length).toBe(1)
        expect(groupDues[0].name).toBe(seedPaymentDue.name)
        // eslint-disable-next-line no-underscore-dangle
        expect(groupDues[0]._sum.payableAmount).toBe(50000)
    })
})
