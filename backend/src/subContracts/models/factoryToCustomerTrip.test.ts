import seedFactoryToCustomerTrip from '../seed/factoryToCustomerTrip.ts'
import { create, getAllTrip } from './factoryToCustomerTrip.ts'

describe('Trip model', () => {
    test('should able to create a trip', async () => {
        await create(seedFactoryToCustomerTrip)
        const actual = await getAllTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].filledLoad).toBe(seedFactoryToCustomerTrip.filledLoad)
    })
})
