import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedStockPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createStockpoint } from './stockPoint.ts'
import { create as createTruck } from './truck.ts'
import { create, getAllStockPointTrip } from './loadingToStockPointTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Loading To Stock Trip model', () => {
    test('should able to create a trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const stockPricePointMarker = await createPricePointMarker({
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
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            stockPointId: stockPoint.id,
            truckId: truck.id,
            wantFuel: true
        })
        const actual = await getAllStockPointTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].invoiceNumber).toBe(trip.invoiceNumber)
    })
})
