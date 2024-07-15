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
    getAllUnloadingPointUnbilledTrips,
    updateFreightInDirectTrip,
    getInvoiceDetails,
    updateDirectTripBillingRate
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
        const company = await createCompany(seedCompany, 1)
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
            wantFuel: true,
            loadingKilometer: 0
        })
        await createOverallTrip({ loadingPointToUnloadingPointTripId: trip.id, truckId: truck.id })
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
        const company = await createCompany(seedCompany, 1)
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
            loadingKilometer: 0
        })
        await createOverallTrip({ loadingPointToUnloadingPointTripId: trip.id, truckId: truck.id })
        const activeTrip = await getOnlyActiveTripByVehicleNumber(truck.vehicleNumber)
        expect(activeTrip?.id).toBe(trip.id)
    })
    test('should able to update unload weight for loading To Unloading Point', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        await createTruck(seedTruck)
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
        const company = await createCompany(seedCompany, 1)
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
        const trip1 = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            tripStatus: true,
            loadingKilometer: 0
        })
        const overallTrip1 = await createOverallTrip({
            loadingPointToUnloadingPointTripId: trip1.id,
            truckId: truck.id
        })
        await closeAcknowledgementStatusforOverAllTrip(overallTrip1.id)
        const mockFilterData1 = {
            startDate: 0,
            endDate: 0,
            company: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
        }
        const actual1 = await getDirectTripsByinvoiceFilter(mockFilterData1)
        expect(actual1[0].id).toStrictEqual(trip1.id)
        const trip2 = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            invoiceNumber: 'fghj',
            tripStatus: true,
            loadingKilometer: 0,
            startDate: new Date(2023, 10, 30).getTime() / 1000
        })
        const overallTrip2 = await createOverallTrip({
            truckId: truck.id,
            loadingPointToUnloadingPointTripId: trip2.id
        })
        await closeAcknowledgementStatusforOverAllTrip(overallTrip2.id)
        const mockFilterData2 = {
            startDate: trip2.startDate,
            endDate: trip2.startDate,
            company: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
        }
        const actual2 = await getDirectTripsByinvoiceFilter(mockFilterData2)
        expect(actual2[0].id).toStrictEqual(trip2.id)
    })
    test('should able to get all unloading point invoice numbers', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        await createTruck(seedTruck)
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
            unloadingPointId: deliveryPoint.id
        })
        const invoiceNumbers = await getAllUnloadingPointInvoiceNumbers()
        expect(invoiceNumbers.length).toBe(1)
    })
    test('should able to update freight in loading to unloading point', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        await createTruck(seedTruck)
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
        const directTrip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id
        })
        const newAmount = {
            freightAmount: 1001,
            transporterAmount: 10001,
            totalFreightAmount: 10001,
            totalTransporterAmount: 10001
        }
        const newTrip = await updateFreightInDirectTrip(directTrip.id, newAmount)
        expect(newTrip.totalTransporterAmount).toEqual(newAmount.totalTransporterAmount)
    })
    test('should be able to get all unloading point unbilled trips', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
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
        expect(truck.vehicleNumber).toBe(truck.vehicleNumber)
        expect(unbilledTrips[0].loadingPoint.cementCompany.name).toBe(company.name)
    })
    test('should able to get loading To Unloading for invoice creation', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        await createTruck(seedTruck)
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
            tripStatus: true,
            loadingKilometer: 0
        })
        const actual = await getInvoiceDetails([trip.id])
        expect(actual[0].startDate).toBe(trip.startDate)
    })
    test('should able to update billingRate in loading to unloading trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        await createTruck(seedTruck)
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
            tripStatus: true,
            loadingKilometer: 0
        })
        const actual = await updateDirectTripBillingRate(`${trip.id}`, '1200')
        expect(actual.id).toBe(trip.id)
        expect(actual.billingRate).toBe(1200)
    })
    test.skip('should able to get direct trips by invoice filter', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
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
        const trip1 = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            tripStatus: true,
            loadingKilometer: 0,
            startDate: 0,
            invoiceNumber: 'INV-1'
        })
        const trip2 = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            tripStatus: true,
            loadingKilometer: 0,
            startDate: 0,
            invoiceNumber: 'INV-2'
        })
        const filterData = {
            company: company.name,
            startDate: 0,
            endDate: 0
        }
        const directTrips = await getDirectTripsByinvoiceFilter(filterData)
        expect(directTrips.length).toBe(1)
        expect(directTrips[0].id).toBe(trip1.id)
        expect(directTrips[1].id).toBe(trip2.id)
        expect(directTrips[0].startDate).toEqual(trip1.startDate)
        expect(directTrips[1].startDate).toEqual(trip2.startDate)
        expect(directTrips[0].invoiceNumber).toBe(trip1.invoiceNumber)
        expect(directTrips[1].invoiceNumber).toBe(trip2.invoiceNumber)
    })
})
