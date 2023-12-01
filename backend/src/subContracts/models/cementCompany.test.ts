import { create, getAllCementCompany } from './cementCompany.ts'
import seedCementCompany from '../seed/cementCompany.ts'

describe('Cement Company model', () => {
    test('should able to create', async () => {
        await create(seedCementCompany)
        const actual = await getAllCementCompany()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedCementCompany.name)
    })
})
