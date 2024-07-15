import seedFactoryToStockTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedStockPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import {
    closeStockTrip,
    create,
    getAllStockPointTrip,
    getInvoiceDetails,
    getStockTripsByinvoiceFilter,
    updateBillNumber,
    getAllStockPointInvoiceNumbers,
    getAllStockPointUnbilledTrips,
    updateFreightInStockTrip,
    updateStockTripBillingRate
} from './loadingToStockPointTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import { create as createOverallTrip } from './overallTrip.ts'

describe('Loading To Stock Trip model', () => {
    test('should able to create a trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        const actual = await getAllStockPointTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].invoiceNumber).toBe(trip.invoiceNumber)
    })
    test('should able to change trip status to true', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        const actual = await closeStockTrip(trip.id)
        expect(actual.tripStatus).toBe(true)
    })
    test('should able to update Bill Number in stock trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        await updateBillNumber([trip.id], 'MGL')
        const tripData = await getAllStockPointTrip()
        expect(tripData[0].billNo).toBe('MGL')
    })
    test('should able to get multiple Invoice Details by id', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        const tripData = await getInvoiceDetails([trip.id])
        expect(tripData[0].invoiceNumber).toBe(trip.invoiceNumber)
    })
    test('should able to get Invoice Details by filterData', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip1 = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        const trip2 = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            invoiceNumber: '23',
            wantFuel: true,
            loadingKilometer: 0
        })
        const mockFilterData1 = {
            startDate: trip2.startDate,
            endDate: trip2.startDate,
            company: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
        }
        const tripData1 = await getStockTripsByinvoiceFilter(mockFilterData1)
        expect(tripData1[0].invoiceNumber).toBe(trip1.invoiceNumber)
        const mockFilterData2 = {
            startDate: 0,
            endDate: 0,
            company: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
        }
        const tripData2 = await getStockTripsByinvoiceFilter(mockFilterData2)
        expect(tripData2[1].invoiceNumber).toBe(trip2.invoiceNumber)
    })
    test('should able to get all stock point invoice numbers', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true
        })
        const invoiceNumbers = await getAllStockPointInvoiceNumbers()
        expect(invoiceNumbers.length).toBe(1)
        expect(invoiceNumbers[0].invoiceNumber).toBe(trip.invoiceNumber)
    })
    test('should able to update trip in loading to stock point', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true
        })
        const newAmount = {
            freightAmount: 1001,
            transporterAmount: 10001,
            totalFreightAmount: 10001,
            totalTransporterAmount: 10001
        }
        const newTripDetails = await updateFreightInStockTrip(trip.id, newAmount)
        expect(newTripDetails.totalTransporterAmount).toBe(newAmount.totalTransporterAmount)
    })
    test('should able to get all unbilled stock point trips', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0,
            overallTrip: {
                create: {
                    acknowledgementStatus: true
                }
            },
            billNo: null
        })
        await createOverallTrip({ loadingPointToStockPointTripId: trip.id, truckId: truck.id })
        const unbilledTrips = await getAllStockPointUnbilledTrips()
        expect(unbilledTrips.length).toBe(1)
        expect(unbilledTrips[0].id).toBe(trip.id)
        expect(unbilledTrips[0].invoiceNumber).toBe(trip.invoiceNumber)
        expect(unbilledTrips[0].loadingPoint.name).toBe(factoryPoint.name)
        expect(unbilledTrips[0].stockPoint.name).toBe(stockPoint.name)
        expect(truck.vehicleNumber).toBe(truck.vehicleNumber)
        expect(unbilledTrips[0].loadingPoint.cementCompany.name).toBe(company.name)
    })
    test('should able to update billingRate in loading to stock trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const trip = await create({
            ...seedFactoryToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            wantFuel: true,
            loadingKilometer: 0,
            overallTrip: {
                create: {
                    acknowledgementStatus: true
                }
            },
            billNo: null
        })
        const actual = await updateStockTripBillingRate(`${trip.id}`, '1200')
        expect(actual.id).toBe(trip.id)
        expect(actual.billingRate).toBe(1200)
    })
})
