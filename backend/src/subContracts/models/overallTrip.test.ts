import {
    closeAcknowledgementStatusforOverAllTrip,
    create,
    getAcknowledgementFile,
    getActiveTripByVehicle,
    getAllActivetripTripByTripStatus,
    getAllDiscrepancyReport,
    getAllTripByAcknowledgementStatus,
    getCementCompanyByOverallTrip,
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
    overallTripByPendingPaymentDues,
    tripStatusFilter,
    tripStatusFilterCount,
    updateAcknowledgementApproval,
    updatePricePointApprovalStatus,
    updateStockToUnloadingInOverall,
    updateTdsAmountAndPercentage,
    updateTransporterInvoice,
    uploadAcknowledgementFile
} from './overallTrip.ts'
import seedPaymentDue from '../seed/paymentDue.ts'
import { create as createPayment } from './paymentDues.ts'
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
import dayjs from 'dayjs'

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
    const company = await createCompany(seedCompany, 1)
    const transporter = await createTransporter(seedTransporter, 1)
    await createTruck({
        ...seedTruck,
        transporterId: transporter.id
    })
    await createTruck({
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
        wantFuel: false,
        loadingKilometer: 0
    })
    const loadingToStockTrip = await createLoadingToStockTrip({
        ...seedLoadingToStockTrip,
        loadingPointId: factoryPoint.id,
        stockPointId: stockPoint.id,
        wantFuel: false,
        loadingKilometer: 0
    })
    await create({ loadingPointToStockPointTripId: loadingToStockTrip.id })
    return create({
        loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
    })
}
const tripStatus = async () => {
    return await tripStatusFilter(
        undefined,
        '1',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
    )
}
async function setupPricePointMarkers() {
    const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
    const unloadingPricePointMarker = await createPricePointMarker({
        ...seedPricePointMarker,
        location: 'salem'
    })
    return { loadingPricePointMarker, unloadingPricePointMarker }
}

async function setupCompanyAndTransporter() {
    const company = await createCompany(seedCompany, 1)
    const transporter = await createTransporter(seedTransporter, 1)
    return { company, transporter }
}

async function setupTruck(transporterId: number) {
    return createTruck({ ...seedTruck, transporterId })
}

async function setupPointsAndTrip(
    companyId: number,
    loadingPricePointMarkerId: number,
    unloadingPricePointMarkerId: number
) {
    const factoryPoint = await createLoadingPoint({
        ...seedLoadingPoint,
        cementCompanyId: companyId,
        pricePointMarkerId: loadingPricePointMarkerId
    })
    const deliveryPoint = await createUnloadingpoint({
        ...seedUnloadingPoint,
        cementCompanyId: companyId,
        pricePointMarkerId: unloadingPricePointMarkerId
    })
    const trip = await createTrip({
        ...seedFactoryToCustomerTrip,
        loadingPointId: factoryPoint.id,
        unloadingPointId: deliveryPoint.id,
        wantFuel: false,
        loadingKilometer: 0
    })
    return { factoryPoint, deliveryPoint, trip }
}
describe('Overall Trip model', () => {
    test('should able to create a overall trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
            ...seedTruck,
            transporterId: transporter.id
        })
        await createTruck({
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
            ...seedTruck,
            transporterId: transporter.id
        })
        await createTruck({
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
            ...seedTruck,
            transporterId: transporter.id
        })
        await createTruck({
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
            wantFuel: true,
            loadingKilometer: 0
        })
        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: false,
            loadingKilometer: 0
        })
        await create({ loadingPointToUnloadingPointTripId: trip.id, truckId: truck.id })
        const actual = await tripStatusFilter(
            `${company.id}`,
            `${truck.transporterId}`,
            `${factoryPoint.id}`,
            `${truck.vehicleNumber}`,
            `${trip.invoiceNumber}`,
            `${trip.startDate}`,
            `${trip.startDate}`,
            0
        )
        expect(actual[0]?.truck?.id).toBe(truck.id)
    })
    test('should able to handle undefined to get overall trip by filter', async () => {
        const { loadingPricePointMarker, unloadingPricePointMarker } =
            await setupPricePointMarkers()
        const { company, transporter } = await setupCompanyAndTransporter()
        const truck = await setupTruck(transporter.id)
        const { trip } = await setupPointsAndTrip(
            company.id,
            loadingPricePointMarker.id,
            unloadingPricePointMarker.id
        )

        await create({ loadingPointToUnloadingPointTripId: trip.id, truckId: truck.id })

        const actual = await tripStatusFilter(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        )

        expect(actual[0]?.truck?.id).toBe(truck.id)
    })
    test('should not able to get from to to date undefined data', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
            wantFuel: false,
            loadingKilometer: 0
        })
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatus()
        expect(actual).toStrictEqual([])
    })
    test('should able to get overall trip length by filter', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: false,
            loadingKilometer: 0
        })
        await create({ loadingPointToUnloadingPointTripId: trip.id, truckId: truck.id })
        const actual = await tripStatusFilterCount(
            `${company.id}`,
            `${truck.transporterId}`,
            `${trip.loadingPointId}`,
            `${truck.vehicleNumber}`,
            `${trip.invoiceNumber}`,
            `${trip.startDate}`,
            `${trip.startDate}`
        )
        expect(actual).toBe(1)
    })
    test('should able to handle no data in overall trip length by filter', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
            wantFuel: false,
            loadingKilometer: 0
        })
        await create({ loadingPointToUnloadingPointTripId: trip.id })
        const actual = await tripStatusFilterCount(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        )
        expect(actual).toBe(1)
    })
    test('should able to get overall trip by unload date', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortage({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        const actual = await getTripByUnloadDate(seedShortageQuantity.unloadedDate)
        expect(actual[0].shortageQuantity[0].unloadedDate).toBe(seedShortageQuantity.unloadedDate)
    })
    test('should able to get overall trip by transporterinvoice', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
    test('should able to get paymentDues from overallTrip which is pending', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        await createPayment([{ ...seedPaymentDue, overallTripId: overalltrip.id }])
        const actual = await overallTripByPendingPaymentDues()
        expect(actual[0].id).toBe(overalltrip.id)
    })
    test('should able to get overallTrip For AcknowlegementApproval', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
    test('should able to get direct overall trip data by from and to for discrepancy', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: false,
            tripStatus: true,
            loadingKilometer: 0,
            startDate: dayjs().unix(),
            billingRate: seedFactoryToCustomerTrip.freightAmount
        })
        const overallTrip = await create({
            truckId: truck.id,
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: true,
            transporterInvoice: 'fg'
        })
        await createShortage({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await getTripByUnloadDate(seedShortageQuantity.unloadedDate)
        await createPayment([
            {
                ...seedPaymentDue,
                type: 'final pay',
                transactionId: 'dfgjk',
                overallTripId: overallTrip.id
            }
        ])
        const closedOverallTrip = await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        const actual = await getAllDiscrepancyReport(trip.startDate, trip.startDate)
        expect(actual[0]?.id).toBe(closedOverallTrip.id)
    })
    test('should able to get stock overall trip data by from and to for discrepancy', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: false,
            loadingKilometer: 0,
            billingRate: seedLoadingToStockTrip.freightAmount
        })
        const overallTrip = await create({
            truckId: truck.id,
            loadingPointToStockPointTripId: loadingToStockPointTrip.id,
            acknowledgementApproval: true,
            transporterInvoice: 'fg'
        })
        await createShortage({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await getTripByUnloadDate(seedShortageQuantity.unloadedDate)
        await createPayment([
            {
                ...seedPaymentDue,
                type: 'final pay',
                transactionId: 'dfgjk',
                overallTripId: overallTrip.id
            }
        ])
        const closedOverallTrip = await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        const actual = await getAllDiscrepancyReport(
            loadingToStockPointTrip.startDate,
            loadingToStockPointTrip.startDate
        )
        expect(actual[0]?.id).toBe(closedOverallTrip.id)
    })
    test('should be able to get overall data by from and to', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
            wantFuel: false,
            tripStatus: true,
            loadingKilometer: 0,
            startDate: dayjs().startOf('day').unix()
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: trip.id,
            truckId: truck.id
        })
        await createShortage({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await getTripByUnloadDate(seedShortageQuantity.unloadedDate)
        await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)

        const from = dayjs().startOf('day').unix()
        const to = dayjs().endOf('day').unix()
        const actual = await getAllDiscrepancyReport(from, to)
        expect(actual).toHaveLength(0)
        // expect(actual[0]?.id).toBe(closedOverallTrip.id)
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
        expect(actual.length).toStrictEqual(1)
        expect(actual[0].tollPayment[0].amount).toBe(500)
    })
    test('should able to get overall Trip for pricePointApproval', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(seedTransporter, 1)
        await createTruck({ ...seedTruck, transporterId: transporter.id })
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(
            { ...seedTransporter, transporterType: 'Own' },
            1
        )
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
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(
            {
                ...seedTransporter,
                transporterType: 'Market'
            },
            1
        )
        await createTruck({
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
            wantFuel: false,
            loadingKilometer: 0
        })
        await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const actual = await getOverallTripIdByVehicleNumber(seedTruck.vehicleNumber)
        expect(actual?.id).toEqual(undefined)
    })
    test('should able to update TdsAmount And Percentage in overallTrip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(
            {
                ...seedTransporter,
                transporterType: 'Market'
            },
            1
        )
        await createTruck({
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
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const actual = await updateTdsAmountAndPercentage(overallTrip.id, 1000, 2)
        expect(actual?.id).toEqual(overallTrip.id)
        expect(actual?.tdsAmount).toEqual(1000)
    })
    test('should able to update acknowledgementPdfLink in overallTrip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(
            {
                ...seedTransporter,
                transporterType: 'Market'
            },
            1
        )
        await createTruck({
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
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            acknowledgementPdfLink: 'acknlowledgement/sample.pdf'
        })
        const actual = await uploadAcknowledgementFile(
            overallTrip.id,
            'acknlowledgement/sample.pdf'
        )
        expect(actual?.id).toEqual(overallTrip.id)
    })
    test('should able to get acknowledgementPdfLink in overallTrip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'Erode'
        })
        const company = await createCompany(seedCompany, 1)
        const transporter = await createTransporter(
            {
                ...seedTransporter,
                transporterType: 'Market'
            },
            1
        )
        await createTruck({
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
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await create({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id,
            acknowledgementPdfLink: 'acknlowledgement/sample.pdf'
        })
        const actual = await getAcknowledgementFile(overallTrip.id)
        const getCementCompany = await getCementCompanyByOverallTrip(overallTrip.id)
        expect(actual[0].acknowledgementPdfLink).toEqual('acknlowledgement/sample.pdf')
        expect(getCementCompany[0].id).toEqual(overallTrip.id)
    })
})
