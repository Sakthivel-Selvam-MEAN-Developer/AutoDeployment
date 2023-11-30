import seedDeliveryPoint from "../seed/deliveryPoint"
import {create, getAllDeliveryPoint} from "./deliveryPoint"


describe('deliveryPoint model', () => {
    test('should able to create a deliveryPoint', async () => {
        await create(seedDeliveryPoint)
        const actual = await getAllDeliveryPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedDeliveryPoint.name)
    })
})
