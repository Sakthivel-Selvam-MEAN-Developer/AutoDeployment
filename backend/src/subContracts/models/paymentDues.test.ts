import dayjs from 'dayjs'
import {
    create,
    findTripWithActiveDues,
    getCompletedDues,
    getDueByOverallTripId,
    getOnlyActiveDuesByName,
    getUpcomingDuesByFilter,
    updatePaymentDues
} from './paymentDues.ts'
import seedPaymentDue from '../seed/paymentDue.ts'
import { create as createOverallTrip } from './overallTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedLoadingToStockTrip from '../seed/loadingToStockTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedStockPoint from '../seed/stockPointWithoutDep.ts'
import seedTruck from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createLoadingToStockTrip } from './loadingToStockPointTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Payment-Due model', () => {
    test('should able to create', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const actual = await findTripWithActiveDues(dueDate, false)
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
            wantFuel: false
        })
        const { id } = await createOverallTrip({
            loadingPointToStockPointTripId: loadingToStockTrip.id
        })
        await create(seedPaymentDue)
        const dueDate = 1706034600
        await create({ ...seedPaymentDue, payableAmount: 30000, overallTripId: id })
        const groupDues = await getOnlyActiveDuesByName(dueDate, false)
        expect(groupDues.length).toBe(1)
        expect(groupDues[0].name).toBe(seedPaymentDue.name)
        // eslint-disable-next-line no-underscore-dangle
        expect(groupDues[0]._sum.payableAmount).toBe(50000)
    })
    test('should update the payment dues', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const actual = await findTripWithActiveDues(dueDate, false)
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
            wantFuel: false
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
            wantFuel: false
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
        const actual = await getUpcomingDuesByFilter('Barath Logistics', 1700634419, 1700893619)
        expect(actual.length).toBe(1)
        expect(actual[0].payableAmount).toBe(5000)
    })
    test('should get only completed the payment dues', async () => {
        await create(seedPaymentDue)
        const dueDate = 1706034600
        const dues = await findTripWithActiveDues(dueDate, false)
        const wantToUpdate = {
            id: dues[0].id,
            transactionId: 'abc',
            paidAt: dayjs().unix()
        }
        await updatePaymentDues(wantToUpdate)
        const actual = await getCompletedDues(seedPaymentDue.name, wantToUpdate.paidAt, 1)
        expect(actual[0].transactionId).toBe('abc')
    })
})
