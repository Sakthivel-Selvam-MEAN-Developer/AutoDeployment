import { create, getAllBunk } from './bunk.ts'
import seedBunk from '../../wonderMove/seed/bunk.ts'

describe('Bunk model', () => {
    test('should able to create', async () => {
        const bunk = await create(seedBunk)
        const actual = await getAllBunk()
        expect(actual.length).toBe(1)
        expect(actual[0].bunkName).toBe(bunk.bunkName)
    })
})
