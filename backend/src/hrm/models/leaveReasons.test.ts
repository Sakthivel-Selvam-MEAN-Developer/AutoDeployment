import seedReason from '../seed/reason.ts'
import { create, getAllLeaveReason } from './leaveReasons.ts'

describe('Leave Reason model', () => {
    test('should able to access', async () => {
        await create(seedReason)
        const actual = await getAllLeaveReason()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedReason.name)
    })
})
