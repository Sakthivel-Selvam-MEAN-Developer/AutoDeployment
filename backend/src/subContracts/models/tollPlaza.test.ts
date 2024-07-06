import {
    create,
    createTollPlazaLocations,
    getTollLocations,
    getTollPlaza,
    updateBillDetails,
    updateTollAmount
} from './tollPlaza.ts'
import seedtollPlazaLocation from '../seed/tollPlaza.ts'
import { create as createOverallTrip } from './overallTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('TollPlaza model', () => {
    test('should able to create tollPlaza', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter(seedTransporter)
        const truck = await createTruck({ ...seedTruck, transporterId: transporter.id })
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
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await createOverallTrip({ loadingPointToUnloadingPointTripId: trip.id })
        const tollPlazaLocationMaker = await create([
            { ...seedtollPlazaLocation, overallTripId: overallTrip.id },
            { overallTripId: overallTrip.id, amount: 500 }
        ])
        const actual = await getTollPlaza()
        expect(tollPlazaLocationMaker).toStrictEqual({ count: actual.length })
    })
    test('should able to update tollPlaza', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter(seedTransporter)
        const truck = await createTruck({ ...seedTruck, transporterId: transporter.id })
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
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await createOverallTrip({ loadingPointToUnloadingPointTripId: trip.id })
        create([
            { ...seedtollPlazaLocation, overallTripId: overallTrip.id },
            { overallTripId: overallTrip.id, tollPlazaLocationId: 1, amount: 500 }
        ])
        const tollDetails = await getTollPlaza()
        const overallTripId = tollDetails.map((toll) => toll.overallTripId)
        const actual = await updateBillDetails(overallTripId, {
            billNo: 'MGL-01',
            billDate: 1718262220
        })
        expect(actual).toStrictEqual({ count: tollDetails.length })
    })
    test('should able to update tollPlaza location', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter(seedTransporter)
        const truck = await createTruck({ ...seedTruck, transporterId: transporter.id })
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
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await createOverallTrip({ loadingPointToUnloadingPointTripId: trip.id })
        create([
            { ...seedtollPlazaLocation, overallTripId: overallTrip.id },
            { overallTripId: overallTrip.id, tollPlazaLocationId: 1, amount: 500 }
        ])
        const tollPlaza = await getTollPlaza()
        const tollId = tollPlaza.map((toll) => toll.id)
        const actual = await updateTollAmount(tollId, {
            amount: 500
        })
        expect(actual).toStrictEqual({ count: tollPlaza.length })
    })
    test('should able to get all tollPlaza location', async () => {
        const location = await createTollPlazaLocations({ location: 'Dhone', state: 'AP' })
        const actual = await getTollLocations()
        expect(actual[0].id).toBe(location.id)
    })
})
