import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import {
    create as createTrip,
    updateBillNumber as loadingToUnloading
} from './loadingToUnloadingTrip.ts'
import {
    closeAcknowledgementStatusforOverAllTrip,
    create,
    getTripDetailsByCompanyName
} from './overallTrip.ts'
import { getInvoiceDetail } from './invoice.ts'

describe('Invoice model', () => {
    test('should able to get trip details', async () => {
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
        const trip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            wantFuel: true
        })
        const overall = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await closeAcknowledgementStatusforOverAllTrip(overall.id)
        const tripByCompany = await getTripDetailsByCompanyName('UltraTech Cements', 0)
        const actual = await getInvoiceDetail([tripByCompany[0].id])
        expect(actual[0].loadingPointToUnloadingPointTrip !== null).toBe(true)
    })
    test('should able to create invoice', async () => {
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
        const trip = await createTrip({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            wantFuel: true
        })
        const overall = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await closeAcknowledgementStatusforOverAllTrip(overall.id)
        const tripByCompany = await getTripDetailsByCompanyName('UltraTech Cements', 0)
        const actual = await getInvoiceDetail([tripByCompany[0].id])
        await loadingToUnloading([trip.id], 'MGL23A-1')
        expect(actual[0].loadingPointToUnloadingPointTrip !== null).toBe(true)
    })
})
