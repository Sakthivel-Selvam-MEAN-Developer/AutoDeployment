import {
    create,
    getShortageQuantityByOverallTripId,
    updateShortageByOverallTripId
} from './shortageQuantity.ts'
import seedShortageQuantity from '../seed/shortageQuantity.ts'
import { create as createOverallTrip } from './overallTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'
import { create as createTransporter } from './transporter.ts'
import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Shortage Quantity model', () => {
    test('should able to create', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
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
        const trip = await createOverallTrip({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        await create({ ...seedShortageQuantity, overallTripId: trip.id })
        const actual = await getShortageQuantityByOverallTripId(trip.id)
        expect(actual?.shortageAmount).toBe(seedShortageQuantity.shortageAmount)
    })
    test('should be able to create', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
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
        const trip = await createOverallTrip({
            loadingPointToUnloadingPointTripId: loadingToUnloadingTrip.id
        })
        const newShortage = {
            unloadedQuantity: 10000,
            shortageQuantity: 100,
            shortageAmount: 800,
            approvalStatus: true
        }
        const shortage = await create({ ...seedShortageQuantity, overallTripId: trip.id })
        const actual = await updateShortageByOverallTripId(shortage.id, newShortage)
        expect(actual?.shortageAmount).toBe(newShortage.shortageAmount)
    })
})
