import seedFactory from '../seed/factory.ts'
import { create, getAllFactory } from './factory.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        await create(seedFactory)
        const actual = await getAllFactory()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedFactory.name)
    })
})
