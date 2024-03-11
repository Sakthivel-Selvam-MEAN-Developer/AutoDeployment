import { create, getAllBunk, getAllBunkName, getBunkAccountByName } from './bunk.ts'
import seedBunk from '../seed/bunk.ts'

describe('Bunk model', () => {
    test('should able to create', async () => {
        const bunk = await create(seedBunk)
        const actual = await getAllBunk()
        expect(actual.length).toBe(1)
        expect(actual[0].bunkName).toBe(bunk.bunkName)
    })
    test('should able to get Bunk Account By Name', async () => {
        const bunk = await create(seedBunk)
        const actual = await getBunkAccountByName([bunk.bunkName])
        expect(actual.length).toBe(1)
        expect(actual[0].bunkName).toBe(bunk.bunkName)
    })
    test('should able to get All BunkName', async () => {
        const bunk = await create(seedBunk)
        const actual = await getAllBunkName()
        expect(actual.length).toBe(1)
        expect(actual[0].bunkName).toBe(bunk.bunkName)
    })
})
