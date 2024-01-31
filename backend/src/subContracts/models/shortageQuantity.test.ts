import { create, getShortageQuantityByOverallTripId } from './shortageQuantity.ts'
import seedShortageQuantity from '../seed/shortageQuantity.ts'

describe('Shortage Quantity model', () => {
    test('should able to create', async () => {
        await create(seedShortageQuantity)
        const actual = await getShortageQuantityByOverallTripId(seedShortageQuantity.overallTripId)
        expect(actual?.shortageAmount).toBe(seedShortageQuantity.shortageAmount)
    })
})
