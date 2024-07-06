import {
    closeAcknowledgementStatusforOverAllTrip,
    create,
    getActiveTripByVehicle,
    getAllActivetripTripByTripStatus,
    getAllDiscrepancyReport,
    getAllTripByAcknowledgementStatus,
    getOverAllTripByArrayOfId,
    getOverAllTripById,
    getOverAllTripIdByLoadingToStockId,
    getOverallTrip,
    getOverallTripIdByVehicleNumber,
    getOveralltripByToll,
    getOveralltripByTollNotEmpty,
    getTripByTransporterInvoice,
    getTripByUnloadDate,
    getTripForAcknowlegementApproval,
    getTripForPricePointApproval,
    tripStatusFilter,
    updateAcknowledgementApproval,
    updatePricePointApprovalStatus,
    updateStockToUnloadingInOverall,
    updateTransporterInvoice
} from './overallTrip.ts'
import { create as createShortage } from './shortageQuantity.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createTollPlaza, createTollPlazaLocations } from './tollPlaza.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedLoadingToStockTrip from '../seed/loadingToStockTrip.ts'
import seedStockToUnloadingTrip from '../seed/stockPointToUnloadingPoint.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedStockPoint from '../seed/stockPointWithoutDep.ts'
import seedTruck from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createLoadingToStockTrip } from './loadingToStockPointTrip.ts'
import { create as createStockToUnloadingTrip } from './stockPointToUnloadingPoint.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import seedShortageQuantity from '../seed/shortageQuantity.ts'
import { create as createShortageQuantity } from './shortageQuantity.ts'

const tollPlazaCreationPreRequirements = async () => {
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
        wantFuel: false,
        loadingKilometer: 0
    })
    const loadingToStockTrip = await createLoadingToStockTrip({
        ...seedLoadingToStockTrip,
        loadingPointId: factoryPoint.id,
        stockPointId: stockPoint.id,
        truckId: stockTripTruck.id,
        wantFuel: false,
        loadingKilometer: 0
    })
    await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })
    return create({
        loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
    })
}

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
            wantFuel: false,
            loadingKilometer: 0
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: true,
            loadingKilometer: 0
        })
        const trip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            truckId: unloadingTripTruck.id
        })
        await create({
            loadingPointToStockPointTripId: loadingToStockTrip.id,
            truckId: stockTripTruck.id
        })

        const actual = await getActiveTripByVehicle(unloadingTripTruck.vehicleNumber)
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const trip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            truckId: unloadingTripTruck.id
        })
        await create({
            loadingPointToStockPointTripId: loadingToStockTrip.id,
            truckId: stockTripTruck.id
        })
        const actual = await getActiveTripByVehicle(unloadingTripTruck.vehicleNumber)
        expect(actual?.id).toBe(trip.id)
    })
    test('should able to get only a active overall trip by trip Status ', async () => {
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const trip1 = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        create({
            loadingPointToStockPointTripId: loadingToStockTrip.id,
            truckId: stockTripTruck.id
        })

        const actual = await getAllActivetripTripByTripStatus()
        expect(actual[0].id).toBe(trip1.id)
    })
    test('should able to get only a active overall trip by trip Status with transporter type not own ', async () => {
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const trip1 = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        create({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })

        const actual = await getAllActivetripTripByTripStatus()
        expect(actual[0].id).toBe(trip1.id)
    })
    test('should able to get only a active overall trip by acknowledgement Status ', async () => {
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            tripStatus: true,
            loadingKilometer: 0
        })
        create({ loadingPointToStockPointTripId: loadingToStockTrip.id })
        const stockTrip = await createStockToUnloadingTrip({
            ...seedStockToUnloadingTrip,
            unloadingPointId: deliveryPoint.id,
            loadingPointToStockPointTripId: loadingToStockTrip.id,
            tripStatus: true
        })
        const trip1 = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            stockPointToUnloadingPointTripId: stockTrip.id
        })
        const actual = await getAllTripByAcknowledgementStatus()
        expect(actual[0].id).toBe(trip1.id)
    })
    test('should able to get only overall trip by id', async () => {
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const trip1 = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })

        const actual = await getOverAllTripById(trip1.id)
        expect(actual?.id).toBe(trip1.id)
    })
    test('should able to update stockToUnloadingTripId in overall trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const stockPricePointMarker = await createPricePointMarker({
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
        const unloadingPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const loadingToStockPointTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const stockToUnloadingPointTrip = await createStockToUnloadingTrip({
            ...seedStockToUnloadingTrip,
            unloadingPointId: unloadingPoint.id,
            loadingPointToStockPointTripId: loadingToStockPointTrip.id
        })
        const overallTrip = await create({
            loadingPointToStockPointTripId: loadingToStockPointTrip.id
        })
        await updateStockToUnloadingInOverall(overallTrip.id, stockToUnloadingPointTrip.id)
        const actual = await getOverallTrip()
        expect(actual[0].stockPointToUnloadingPointTripId).toBe(stockToUnloadingPointTrip.id)
        expect(actual[0].loadingPointToStockPointTripId).toBe(loadingToStockPointTrip.id)
    })
    test('should able to get overall trip by LoadingToStockId', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const loadingToStockPointTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToStockPointTripId: loadingToStockPointTrip.id
        })
        const actual = await getOverAllTripIdByLoadingToStockId(loadingToStockPointTrip.id)
        expect(actual?.id).toBe(overallTrip.id)
    })
    test('should able to get overall trip by filter', async () => {
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
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatusFilter(undefined, undefined, undefined, undefined, undefined)
        expect(actual[0].loadingPointToUnloadingPointTrip?.truck.id).toBe(truck.id)
    })
    test('should able to get overall trip by filter with transporter id only', async () => {
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
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatusFilter(undefined, '1', undefined, undefined, undefined)
        expect(actual).toStrictEqual([])
    })
    test('should able to get overall trip by filter with loading point id only', async () => {
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
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatusFilter(undefined, undefined, '1', undefined, undefined)
        expect(actual).toStrictEqual([])
    })
    test('should able to get overall trip by filter with vehicle number only', async () => {
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
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatusFilter(
            undefined,
            undefined,
            undefined,
            'TN29B3246',
            undefined
        )
        expect(actual).toStrictEqual([])
    })
    test('should able to get overall trip by filter with vehicle number only', async () => {
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
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatusFilter(undefined, undefined, undefined, undefined, 'ABC123')
        expect(actual[0].loadingPointToUnloadingPointTrip?.truck.id).toBe(truck.id)
    })
    test('should able to get overall trip by unload date', async () => {
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
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortageQuantity({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        const actual = await getTripByUnloadDate(seedShortageQuantity.unloadedDate)
        expect(actual[0].shortageQuantity[0].unloadedDate).toBe(seedShortageQuantity.unloadedDate)
    })
    test('should able to get overall trip by transporterinvoice', async () => {
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
            loadingKilometer: 0,
            tripStatus: true
        })
        await create({
            loadingPointToUnloadingPointTripId: trip.id,
            truckId: truck.id,
            acknowledgementApproval: true
        })
        const actual = await getTripByTransporterInvoice(trip.invoiceNumber)
        expect(actual[0].loadingPointToUnloadingPointTrip?.invoiceNumber).toBe(trip.invoiceNumber)
    })
    test('should able to update transporterinvoice in overallTrip', async () => {
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
        const overalltrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await updateTransporterInvoice('abc', overalltrip.id)
        expect(actual.transporterInvoice).toBe('abc')
    })
    test('should able to get overallTrip For AcknowlegementApproval', async () => {
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
        const overalltrip = await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            pricePointApprovalStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const actual = await getTripForAcknowlegementApproval()
        expect(actual[0].transporterInvoice).toBe(overalltrip.transporterInvoice)
    })
    test('should able to get overallTrip For AcknowlegementApproval', async () => {
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
        const overalltrip = await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const actual = await updateAcknowledgementApproval(overalltrip.id)
        expect(actual.acknowledgementApproval).toBe(!overalltrip.acknowledgementApproval)
    })
    test.skip('should able to get overall data by from and to', async () => {
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
            tripStatus: true,
            loadingKilometer: 0
        })
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortageQuantity({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await getTripByUnloadDate(seedShortageQuantity.unloadedDate)
        const closedOverallTrip = await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        const actual = await getAllDiscrepancyReport(1700764200, 1700764200)
        expect(actual[0]?.id).toBe(closedOverallTrip.id)
    })
    test('should able to get overall Trip for getTollAmount', async () => {
        const overallTrip = await tollPlazaCreationPreRequirements()
        await createShortage({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        const actual = await getOveralltripByToll()
        expect(actual.length).toStrictEqual(1)
        expect(actual[0].id).toStrictEqual(overallTrip.id)
    })
    test('should able to get overall Trip with tollplaza details to generate toll invoice', async () => {
        const overallTrip = await tollPlazaCreationPreRequirements()
        const tollPlazaLocation = await createTollPlazaLocations({ location: 'Dhone', state: 'AP' })
        await createTollPlaza([
            {
                overallTripId: overallTrip.id,
                tollPlazaLocationId: tollPlazaLocation.id,
                amount: 500
            }
        ])
        await createShortage({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        const actual = await getOveralltripByTollNotEmpty()
        console.log(actual[0].tollPayment)
        expect(actual.length).toStrictEqual(1)
        expect(actual[0].tollPayment[0].amount).toBe(500)
    })
    test('should able to get overall Trip for pricePointApproval', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
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
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            truckId: unloadingTripTruck.id
        })
        const actual = await getTripForPricePointApproval()
        expect(actual[0].id).toEqual(overallTrip.id)
    })
    test('should able to update overall Trip for pricePointApproval', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
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
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const actual = await updatePricePointApprovalStatus(overallTrip.id)
        expect(actual.pricePointApprovalStatus).toEqual(!overallTrip.pricePointApprovalStatus)
    })
    test('should able to get direct trip details from array of overallTripId with date undefined', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
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
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const actual = await getOverAllTripByArrayOfId([overallTrip.id], undefined)
        expect(actual[0].id).toEqual(overallTrip.id)
    })
    test('should able to get direct trip details from array of overallTripId with date', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
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
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const actual = await getOverAllTripByArrayOfId(
            [overallTrip.id],
            JSON.stringify(seedFactoryToCustomerTrip.startDate)
        )
        expect(actual[0].id).toEqual(overallTrip.id)
    })
    test('should able to get loadingToStaock trip details from array of overallTripId with date', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const loadingToStockPointTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToStockPointTripId: loadingToStockPointTrip.id
        })
        const actual = await getOverAllTripByArrayOfId(
            [overallTrip.id],
            JSON.stringify(seedFactoryToCustomerTrip.startDate)
        )
        expect(actual[0].id).toEqual(overallTrip.id)
    })
    test('should able to get loadingToStock trip details from array of overallTripId with date undefined', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const loadingToStockPointTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToStockPointTripId: loadingToStockPointTrip.id
        })
        const actual = await getOverAllTripByArrayOfId([overallTrip.id], undefined)
        expect(actual[0].id).toEqual(overallTrip.id)
    })
})

describe('overall trip model', () => {
    test('should able to get latest trip id for transporter type Own by vehicleNumber', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter({ ...seedTransporter, transporterType: 'Own' })
        const unloadingTripTruck = await createTruck({
            ...seedTruck,
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
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            truckId: unloadingTripTruck.id
        })
        const actual = await getOverallTripIdByVehicleNumber(seedTruck.vehicleNumber)
        expect(actual?.id).toEqual(overallTrip.id)
    })
    test('should able to get latest trip id for transporter type Market by vehicleNumber', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter({
            ...seedTransporter,
            transporterType: 'Market'
        })
        const unloadingTripTruck = await createTruck({
            ...seedTruck,
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
        const loadingToUnloadingTrip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: unloadingTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const actual = await getOverallTripIdByVehicleNumber(seedTruck.vehicleNumber)
        expect(actual?.id).toEqual(undefined)
    })
})
