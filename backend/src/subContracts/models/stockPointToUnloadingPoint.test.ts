import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedStockPoint from '../seed/stockPointWithoutDep.ts'
import seedStockPointToUnloadingPoint from '../seed/stockPointToUnloadingPoint.ts'
import seedTruck from '../seed/truck.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createLoadingPointToStockPoint } from './loadingToStockPointTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createTruck } from './truck.ts'
import {
    closeUnloadingTrip,
    create,
    getAllStockToUnloadingPointTrip
} from './stockPointToUnloadingPoint.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('stock Point to unloading point', () => {
    test('should able to create a stock Point to unloading point trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const loadingPointToStockPoint = await createLoadingPointToStockPoint({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: false
        })
        const unloadingPointTrip = await create({
            ...seedStockPointToUnloadingPoint,
            loadingPointToStockPointTripId: loadingPointToStockPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await getAllStockToUnloadingPointTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].invoiceNumber).toBe(unloadingPointTrip.invoiceNumber)
    })
    test('should able to close a stock Point to unloading point trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
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
        const stockPoint = await createStockpoint({
            ...seedStockPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: stockPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const loadingPointToStockPoint = await createLoadingPointToStockPoint({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: false
        })
        const unloadingPointTrip = await create({
            ...seedStockPointToUnloadingPoint,
            loadingPointToStockPointTripId: loadingPointToStockPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await closeUnloadingTrip(unloadingPointTrip.id)
        expect(actual.tripStatus).toBe(!unloadingPointTrip.tripStatus)
    })
})
