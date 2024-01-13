import {
    create,
    getActiveTripByVehicle,
    getOnlyActiveTripByVehicle,
    getOverallTrip
} from './overallTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedLoadingToStockTrip from '../seed/loadingToStockTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedStockPoint from '../seed/stockPointWithoutDep.ts'
import seedTruck from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createLoadingToStockTrip } from './loadingToStockPointTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Overall Trip model', () => {
    test('should able to create a overall trip', async () => {
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
            wantFuel: false
        })
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await getOverallTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].loadingPointToUnloadingPointTripId).toBe(trip.id)
    })
    test('should able to get only a active overall trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter(seedTransporter)
        const unloadingTripTruck = await createTruck({
            ...seedTruck,
            transporterId: transporter.id
        })
        const stockTripTruck = await createTruck({
            ...seedTruck,
            vehicleNumber: 'TN52S3555',
            transporterId: transporter.id
        })
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false
        })
        const trip = await create({ loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id })
        await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })

        const actual = await getOnlyActiveTripByVehicle(unloadingTripTruck.vehicleNumber)
        expect(actual?.id).toBe(trip.id)
    })
    test('should able to get only a active overall trip who wants fuel', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter(seedTransporter)
        const unloadingTripTruck = await createTruck({
            ...seedTruck,
            transporterId: transporter.id
        })
        const stockTripTruck = await createTruck({
            ...seedTruck,
            vehicleNumber: 'TN52S3555',
            transporterId: transporter.id
        })
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: true
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false
        })
        const trip = await create({ loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id })
        await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })

        const actual = await getActiveTripByVehicle(unloadingTripTruck.vehicleNumber)
        expect(actual?.id).toBe(trip.id)
    })
})
