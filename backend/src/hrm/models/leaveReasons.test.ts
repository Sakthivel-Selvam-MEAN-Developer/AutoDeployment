import seedReason from '../seed/reason.ts'
import { create, getAllReason } from './leaveReasons.ts'

describe('Reason model', () => {
    test('should able to access', async () => {
        await create(seedReason)
        const actual = await getAllReason()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedReason.name)
    })
})
