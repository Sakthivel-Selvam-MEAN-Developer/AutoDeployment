import { getBillNumber } from './billNumber.ts'

describe('Bill Number Model', async () => {
    test('should able get bill number', async () => {
        const actual = await getBillNumber()
        expect(actual).toBe(null)
    })
})
