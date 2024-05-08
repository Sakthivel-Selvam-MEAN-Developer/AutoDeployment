import { seedDriverTrip } from '../seed/driverTrip.ts'
import { create, getAllDriverTripById, getDriverIdByTripId } from './driverTrip.ts'
import seedDriver from '../seed/driver.ts'
import { create as createDriver } from './driver.ts'

describe('Driver model', () => {
    test('should able to createa nmd get All Driver Trip By Id', async () => {
        const driver = await createDriver(seedDriver)
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            tripSalaryId: 1
        })
        const actual = await getAllDriverTripById(driverTrip.id)
        expect(actual[0].tripId).toBe(driverTrip.id)
    })
    test('should able to get driver id by trip id', async () => {
        const driver = await createDriver(seedDriver)
        const driverTrip = await create({
            ...seedDriverTrip,
            driverId: driver.id,
            tripSalaryId: 1
        })
        const actual = await getDriverIdByTripId(driverTrip.tripId)
        expect(actual?.driverId).toBe(driver.id)
    })
})
