import { create } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('pricePointMarker model', () => {
    test('should able to create', async () => {
        const actual = await create(seedPricePointMarker)
        expect(actual.location).toBe(seedPricePointMarker.location)
    })
})
