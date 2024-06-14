import {
    closeAcknowledgementStatusforOverAllTrip,
    create,
    getActiveTripByVehicle,
    getAllActivetripTripByTripStatus,
    getAllDiscrepancyReport,
    getAllTripByAcknowledgementStatus,
    getOnlyActiveTripByVehicle,
    getOverAllTripById,
    getOverAllTripIdByLoadingToStockId,
    getOverallTrip,
    getOveralltripByToll,
    getTripByTransporterInvoice,
    getTripByUnloadDate,
    getTripForAcknowlegementApproval,
    tripStatusFilter,
    updateAcknowledgementApproval,
    updateStockToUnloadingInOverall,
    updateTransporterInvoice
} from './overallTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createTollPlaza } from './tollPlaza.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedLoadingToStockTrip from '../seed/loadingToStockTrip.ts'
import seedStockToUnloadingTrip from '../seed/stockPointToUnloadingPoint.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedTollPlaza from '../seed/tollPlaza.ts'
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
        const trip = await create({ loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id })
        await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })

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
        create({ loadingPointToStockPointTripId: loadingToStockTrip.id })

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
        await create({ loadingPointToUnloadingPointTripId: trip.id, acknowledgementApproval: true })
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
    test.only('should able to get overall Trip for getTollAmount', async () => {
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
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })
        await createTollPlaza([
            { ...seedTollPlaza, overallTripId: overallTrip.id },
            { overallTripId: overallTrip.id, tollPlazaLocation: 'salem', amount: 500 }
        ])
        const actual = await getOveralltripByToll()
        expect(actual.length).toStrictEqual(1)
    })
})
