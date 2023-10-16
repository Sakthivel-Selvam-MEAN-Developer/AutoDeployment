import seedReason from '../seed/reason'
import {create, getAllReason, getDefaultReason, YetToBeIdentifiedReason} from './stopReason'

describe('Reason model', () => {
    test('should able to access', async () => {
        await create(seedReason)
        const actual = await getAllReason()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedReason.name)
    })
    test('should get default reason', async () => {
        await create({ name: YetToBeIdentifiedReason })
        await create({ name: "Break Down" })
        await create({ name: "Puncture" })
        const actual = await getDefaultReason()
        console.log(actual)
        expect(actual!.name).toBe(YetToBeIdentifiedReason)
    })
})
