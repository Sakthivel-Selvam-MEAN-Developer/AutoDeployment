import seedTruck from '../seed/truck.ts'
import { create, getAllTruck } from './truck.ts'

describe('Truck model', () => {
    test('should able to create', async () => {
        await create(seedTruck)
        const actual = await getAllTruck()
        expect(actual.length).toBe(1)
        expect(actual[0].vehicleNumber).toBe(seedTruck.vehicleNumber)
    })
})
