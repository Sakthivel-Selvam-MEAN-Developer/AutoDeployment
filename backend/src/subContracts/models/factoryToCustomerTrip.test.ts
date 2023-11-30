import seedFactoryToCustomerTrip from "../seed/factoryToCustomerTrip"
import {create, getAllTrip} from "./factoryToCustomerTrip"


describe('Trip model', () => {
    test('should able to create a trip', async () => {
        await create(seedFactoryToCustomerTrip)
        const actual = await getAllTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].filledLoad).toBe(seedFactoryToCustomerTrip.filledLoad)
    })
})
