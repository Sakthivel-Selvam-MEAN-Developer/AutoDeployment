import { create as createFuel, getAllFuel, getFuelWithoutTrip } from './fuel.ts'
import { create } from './bunk.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createStation } from './fuelStation.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import seedFuel from '../seed/fuel.ts'
import seedBunk from '../seed/bunk.ts'
import seedStation from '../seed/fuelStation.ts'

describe('Fuel model', () => {
    test('should able to create', async () => {
        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id
        })
        const trip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id
        })
        const bunk = await create(seedBunk)
        const fuelStation = await createStation({ ...seedStation, bunkId: bunk.id })
        await createFuel({
            ...seedFuel,
            fuelStationId: fuelStation.id,
            loadingPointToUnloadingPointTripId: trip.id
        })
        const actual = await getAllFuel()
        expect(actual.length).toBe(1)
        expect(actual[0].pricePerliter).toBe(seedFuel.pricePerliter)
    })
    test('should able to get fuel without any tripId', async () => {
        const bunk = await create(seedBunk)
        const fuelStation = await createStation({ ...seedStation, bunkId: bunk.id })
        await createFuel({
            ...seedFuel,
            fuelStationId: fuelStation.id
        })
        const actual = await getFuelWithoutTrip(seedFuel.vehicleNumber)
        expect(actual?.vehicleNumber).toBe(seedFuel.vehicleNumber)
    })
})
