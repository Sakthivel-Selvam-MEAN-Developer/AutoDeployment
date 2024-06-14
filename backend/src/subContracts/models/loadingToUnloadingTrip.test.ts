import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import {
    create,
    getAllTrip,
    getDirectTripsByinvoiceFilter,
    getOnlyActiveTripByVehicleNumber,
    getTripByVehicleNumber,
    updateUnloadWeightforTrip,
    getAllUnloadingPointInvoiceNumbers,
    getAllUnloadingPointUnbilledTrips
} from './loadingToUnloadingTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import {
    closeAcknowledgementStatusforOverAllTrip,
    create as createOverallTrip
} from './overallTrip.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import unloadingPoint from '../seed/unloadingPoint.ts'

describe('Trip model', () => {
    test('should able to create a trip', async () => {
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
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        const tripByVehicleNumber = await getTripByVehicleNumber('TN93D5512')
        expect(tripByVehicleNumber?.totalTransporterAmount).toBe(trip.totalTransporterAmount)
        const actual = await getAllTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].filledLoad).toBe(trip.filledLoad)
    })
    test('should able to get only active trips', async () => {
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
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            loadingKilometer: 0
        })
        const activeTrip = await getOnlyActiveTripByVehicleNumber(truck.vehicleNumber)
        expect(activeTrip?.id).toBe(trip.id)
    })
    test('should able to update unload weight for loading To Unloading Point', async () => {
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
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            loadingKilometer: 0
        })
        const actual = await updateUnloadWeightforTrip(trip.id)
        expect(actual.tripStatus).toBe(true)
    })
    test('should able to get loading To Unloading Point for invoice', async () => {
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
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            tripStatus: true,
            loadingKilometer: 0
        })
        const overallTrip = await createOverallTrip({ loadingPointToUnloadingPointTripId: trip.id })
        await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        const mockFilterData = {
            startDate: 0,
            endDate: 0,
            company: 'UltraTech Cements'
        }
        const actual = await getDirectTripsByinvoiceFilter(mockFilterData)
        expect(actual[0].unloadingPointId).toBe(trip.unloadingPointId)
    })
    test('should able to get all unloading point invoice numbers', async () => {
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
        await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id
        })
        const invoiceNumbers = await getAllUnloadingPointInvoiceNumbers()
        expect(invoiceNumbers.length).toBe(1)
    })
    test('should be able to get all unloading point unbilled trips', async () => {
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
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            wantFuel: true,
            loadingKilometer: 0,
            overallTrip: {
                create: {
                    acknowledgementStatus: true
                }
            },
            billNo: null
        })
        const unbilledTrips = await getAllUnloadingPointUnbilledTrips()
        expect(unbilledTrips.length).toBe(1)
        expect(unbilledTrips[0].id).toBe(trip.id)
        expect(unbilledTrips[0].invoiceNumber).toBe(trip.invoiceNumber)
        expect(unbilledTrips[0].loadingPoint.name).toBe(factoryPoint.name)
        expect(unbilledTrips[0].unloadingPoint.name).toBe(unloadingPoint.name)
        expect(unbilledTrips[0].truck.vehicleNumber).toBe(truck.vehicleNumber)
        expect(unbilledTrips[0].loadingPoint.cementCompany.name).toBe(company.name)
    })
})
