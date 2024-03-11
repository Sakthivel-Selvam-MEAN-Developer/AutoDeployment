import { create, getBillNumber, updateBillNumber } from './billNumber.ts'
import billNumber from '../seed/billNumber.ts'

describe('Bill Number Model', async () => {
    test('should able get bill number', async () => {
        const actual = await getBillNumber()
        expect(actual).toBe(null)
    })
    test('should able update Bill Number', async () => {
        await create({ ...billNumber, id: 1 })
        const actual = await updateBillNumber('MGl23A-2')
        expect(actual?.lastBillNo).toBe('MGl23A-2')
    })
})
