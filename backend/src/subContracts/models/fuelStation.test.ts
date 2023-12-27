import { create, getAllFuelStationByBunk } from './fuelStation.ts'
import { create as createBunk } from './bunk.ts'
import seedStation from '../seed/fuelStation.ts'
import seedBunk from '../seed/bunkWithoutDep.ts'

describe('Fuel Station model', () => {
    test('should able to create', async () => {
        const bunk = await createBunk(seedBunk)
        const fuelStation = await create({ ...seedStation, bunkId: bunk.id })
        const actual = await getAllFuelStationByBunk(bunk.id)
        expect(actual.length).toBe(1)
        expect(actual[0].location).toBe(fuelStation.location)
    })
})
