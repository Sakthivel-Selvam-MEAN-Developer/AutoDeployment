import supertest from 'supertest'
import { app } from '../../app.ts'

const mockAccountTypes = vi.fn()

vi.mock('../models/accountType', () => ({
    getAllAccountTypes: () => mockAccountTypes()
}))
const mockAccountType = {
    accountTypeName: 'Savings Account',
    accountTypeNumber: 10
}
describe('AccountType Controller', () => {
    test('should able to access', async () => {
        mockAccountTypes.mockResolvedValue(mockAccountType)
        await supertest(app)
            .get('/api/accountType')
            .expect({ accountTypeName: 'Savings Account', accountTypeNumber: 10 })
        expect(mockAccountTypes).toBeCalledWith()
    })
})
