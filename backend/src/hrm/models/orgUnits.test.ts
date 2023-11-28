import { create, listOfOrg } from './orgUnit.ts'
import seedOrg from '../seed/orgUnits.ts'

describe('OrgUnits Model', () => {
    test('should able to access', async () => {
        await create(seedOrg)
        const actual = await listOfOrg()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedOrg.name)
    })
})
