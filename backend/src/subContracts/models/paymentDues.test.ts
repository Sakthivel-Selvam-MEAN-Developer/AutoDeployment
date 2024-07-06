import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {
    completedDuesLength,
    create,
    findTripWithActiveDues,
    getCompletedDues,
    getDueByOverallTripId,
    getFuelTransactionId,
    getGstDuesGroupByName,
    getGstPaymentDues,
    getOnlyActiveDuesByName,
    getPaymentDuesWithoutTripId,
    getUpcomingDuesByFilter,
    updatePaymentDues,
    updatePaymentDuesWithTripId,
    updatePaymentNEFTStatus
} from './paymentDues.ts'
import seedPaymentDue from '../seed/paymentDue.ts'
import { create as createOverallTrip } from './overallTrip.ts'
import { create as createBunk } from './bunk.ts'
import { create as createFuel } from './fuel.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedLoadingToStockTrip from '../seed/loadingToStockTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedFuel from '../seed/fuel.ts'
import seedBunk from '../seed/bunk.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedStockPoint from '../seed/stockPointWithoutDep.ts'
import seedTruck from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createLoadingToStockTrip } from './loadingToStockPointTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

dayjs.extend(utc)
const dueDate = dayjs.utc().startOf('day').unix()
describe('Payment-Due model', () => {
    test('should able to create', async () => {
        await create(seedPaymentDue)
        const type = 'initial pay'
        const actual = await findTripWithActiveDues(dueDate, false, type)
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(seedPaymentDue.payableAmount)
    })
    test('should get grouped active dues by name', async () => {
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
        await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })

        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const { id } = await createOverallTrip({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })
        await create(seedPaymentDue)
        const type = 'initial pay'
        await create({ ...seedPaymentDue, payableAmount: 30000, overallTripId: id })
        const groupDues = await getOnlyActiveDuesByName(dueDate, false, type)
        expect(groupDues.length).toBe(1)
        expect(groupDues[0].name).toBe(seedPaymentDue.name)

        expect(groupDues[0]._sum.payableAmount).toBe(50000)
    })
    test('should update the payment dues', async () => {
        await create(seedPaymentDue)
        const type = 'initial pay'
        const actual = await findTripWithActiveDues(dueDate, false, type)
        const wantToUpdate = {
            id: actual[0].id,
            transactionId: 'abc',
            paidAt: dayjs().unix()
        }
        const update = await updatePaymentDues(wantToUpdate)
        expect(update.transactionId).toBe(wantToUpdate.transactionId)
    })
    test('should able to get due by overallTripId', async () => {
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
        await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })

        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const { id } = await createOverallTrip({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })
        await create({ ...seedPaymentDue, overallTripId: id })
        await create({
            ...seedPaymentDue,
            type: 'fuel pay',
            name: 'Barath Petroleum',
            payableAmount: 5000,
            overallTripId: id
        })
        const actual = await getDueByOverallTripId(id)
        expect(actual.length).toBe(2)
    })
    test('should able to filter final due with date and name', async () => {
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
        await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })

        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const { id } = await createOverallTrip({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })
        await create({ ...seedPaymentDue, overallTripId: id })
        await create({
            ...seedPaymentDue,
            type: 'final pay',
            name: 'Barath Logistics',
            payableAmount: 5000,
            overallTripId: id
        })
        const actual = await getUpcomingDuesByFilter(
            'Barath Logistics',
            undefined,
            undefined,
            'final pay'
        )
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(5000)
        expect(actual[0].type).toBe('final pay')
    })
    test('should get completed payment dues and completed dues with its page length', async () => {
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
        await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })

        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await createOverallTrip({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })
        await create({ ...seedPaymentDue, overallTripId: overallTrip.id })
        const type = 'initial pay'
        const dues = await findTripWithActiveDues(dueDate, false, type)
        const wantToUpdate = {
            id: dues[0].id,
            transactionId: 'abc',
            paidAt: dueDate
        }
        const paymentDue = await updatePaymentDues(wantToUpdate)
        const filterData = {
            vendor: paymentDue.name,
            fromDate: `${paymentDue.paidAt}`,
            toDate: `${paymentDue.paidAt}`,
            pageNumber: '1',
            payType: paymentDue.type,
            csmName: undefined
        }
        const actual = await getCompletedDues(filterData)
        const tripLength = await completedDuesLength(filterData)
        expect(actual.length).toBe(1)
        expect(tripLength.length).toBe(1)
        expect(actual[0].transactionId).toBe('abc')
    })
    test('should be able to get PaymentDues Without TripId', async () => {
        await create(seedPaymentDue)
        const actual = await getPaymentDuesWithoutTripId(seedPaymentDue.vehicleNumber)
        expect(actual?.overallTripId).toBe(null)
        expect(actual?.status).toBe(false)
    })
    test('should be able to update PaymentDues With TripId', async () => {
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
        await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })

        const loadingToStockTrip = await createLoadingToStockTrip({
            ...seedLoadingToStockTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: stockTripTruck.id,
            wantFuel: false,
            loadingKilometer: 0
        })
        const overallTrip = await createOverallTrip({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })
        await create([seedPaymentDue])
        const paymentDue = await getPaymentDuesWithoutTripId(seedPaymentDue.vehicleNumber)
        const actual = await updatePaymentDuesWithTripId({
            id: paymentDue?.id,
            overallTripId: overallTrip.id
        })
        expect(actual.overallTripId).toBe(overallTrip.id)
    })
    test('should be able to update Payment NEFT Status', async () => {
        await create(seedPaymentDue)
        const paymentDue: any = await getPaymentDuesWithoutTripId(seedPaymentDue.vehicleNumber)
        await updatePaymentNEFTStatus([paymentDue?.id])
        const actual = await getPaymentDuesWithoutTripId(seedPaymentDue.vehicleNumber)
        expect(actual?.NEFTStatus).toBe(true)
    })
    test('should be able to get Gst Dues by GroupBy Name', async () => {
        await create({ ...seedPaymentDue, type: 'gst pay' })
        const actual = await getGstDuesGroupByName(false)
        expect(actual.length).toBe(1)

        expect(actual[0]._count.status).toBe(1)

        expect(actual[0]._sum.payableAmount).toBe(seedPaymentDue.payableAmount)
    })
    test('should be able to get Gst PaymentDues', async () => {
        await create({ ...seedPaymentDue, type: 'gst pay', status: false, NEFTStatus: true })
        const actual = await getGstPaymentDues([seedPaymentDue.name], true)
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(seedPaymentDue.payableAmount)
    })
    test('should be able to get Gst PaymentDues', async () => {
        const bunk = await createBunk(seedBunk)
        const fuel = await createFuel({ ...seedFuel, bunkId: bunk.id })
        await create([
            { ...seedPaymentDue, type: 'fuel pay', fuelId: fuel.id, transactionId: 'asdf' }
        ])
        const actual = await getFuelTransactionId(fuel.id)
        expect(actual?.transactionId).toBe('asdf')
    })
    test('should handle case where payment due has no overall trip id', async () => {
        const paymentDue = await getPaymentDuesWithoutTripId('non-existent-vehicle')
        expect(paymentDue).toBeNull()
    })

    test('should handle case where no GST dues are present', async () => {
        const actual = await getGstDuesGroupByName(false)
        expect(actual.length).toBe(0)
    })

    test('should handle case where no fuel transaction ID is found', async () => {
        const actual = await getFuelTransactionId(0)
        expect(actual).toBeNull()
    })
})
