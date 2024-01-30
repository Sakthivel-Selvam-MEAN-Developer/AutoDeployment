import { create } from './shortageQuantity.ts'
import seedShortageQuantity from '../seed/shortageQuantity.ts'

describe('Shortage Quantity model', () => {
    test('should able to create', async () => {
        const actual = await create(seedShortageQuantity)
        expect(actual.reason).toBe(seedShortageQuantity.reason)
    })
})
