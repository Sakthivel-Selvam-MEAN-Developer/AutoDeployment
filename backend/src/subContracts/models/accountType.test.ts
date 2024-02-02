import { create, getAllAccountTypes } from './accountType.ts'
import seedAccountType from '../seed/accountType.ts'

describe('Account Type model', () => {
    test('should able to create', async () => {
        const accountType = await create(seedAccountType)
        const actual = await getAllAccountTypes()
        expect(actual.length).toBe(1)
        expect(actual[0].accountTypeName).toBe(accountType.accountTypeName)
    })
})
