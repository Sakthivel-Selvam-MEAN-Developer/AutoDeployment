import seedReason from 'apps/wonderMove/seed/reason'
import { create, getAllReason, YetToBeIdentifiedReason } from './stopReason'

describe('Reason model', () => {
    test('should able to access', async () => {
        await create(seedReason)
        const actual = await getAllReason()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedReason.name)
    })
    test('should get default reason', async () => {
        await create({ name: YetToBeIdentifiedReason })
        const actual = await getAllReason()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(YetToBeIdentifiedReason)
    })
})
