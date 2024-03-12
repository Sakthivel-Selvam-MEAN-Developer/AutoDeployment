import {
    create as createFuel,
    getAllFuel,
    getFuelDetailsWithoutTrip,
    getFuelWithoutTrip,
    updateFuelStatus,
    updateFuelWithTripId
} from './fuel.ts'
import { create } from './bunk.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import { create as createOverAllTrip } from './overallTrip.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import seedFuel from '../seed/fuel.ts'
import seedBunk from '../seed/bunk.ts'
import seedBunkWithoutDep from '../seed/bunkWithoutDep.ts'

describe('Fuel model', () => {
    test('should able to create', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const trip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id
        })
        const overAllTrip = await createOverAllTrip({ loadingPointToUnloadingPointTripId: trip.id })
        const bunk = await create(seedBunk)
        await createFuel({
            ...seedFuel,
            bunkId: bunk.id,
            overallTripId: overAllTrip.id
        })
        const actual = await getAllFuel()
        expect(actual.length).toBe(1)
        expect(actual[0].pricePerliter).toBe(seedFuel.pricePerliter)
    })
    test('should able to get fuel without any tripId', async () => {
        const bunk = await create(seedBunkWithoutDep)
        await createFuel({
            ...seedFuel,
            bunkId: bunk.id
        })
        const actual = await getFuelWithoutTrip(seedFuel.vehicleNumber)
        expect(actual?.vehicleNumber).toBe(seedFuel.vehicleNumber)
    })
    test('should able to update fuel with tripId', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const bunk = await create(seedBunkWithoutDep)
        const fuel = await createFuel({
            ...seedFuel,
            bunkId: bunk.id
        })
        expect(fuel.overallTripId).toBe(null)

        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const trip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id
        })
        const overAllTrip = await createOverAllTrip({ loadingPointToUnloadingPointTripId: trip.id })

        const actual = await updateFuelWithTripId({ id: fuel.id, overallTripId: overAllTrip.id })
        expect(actual.overallTripId).toBe(overAllTrip.id)
    })
    test('should able to update fuel with tripId', async () => {
        const bunk = await create(seedBunkWithoutDep)
        await createFuel({
            ...seedFuel,
            bunkId: bunk.id
        })
        const actual = await getFuelDetailsWithoutTrip()
        expect(actual[0].bunk.id).toBe(bunk.id)
    })
    test('should able to update fuel with tripId', async () => {
        const bunk = await create(seedBunkWithoutDep)
        const fuel = await createFuel({
            ...seedFuel,
            bunkId: bunk.id
        })
        const actual = await updateFuelStatus(fuel.id)
        await getAllFuel()
        expect(actual.paymentStatus).toBe(true)
    })
})
