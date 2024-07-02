import { create as createCompany } from './cementCompany.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
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
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import { create, updateAcknowledgementApproval } from './overallTrip.ts'
import seedShortageQuantity from '../seed/shortageQuantity.ts'
import { create as createShortageQuantity } from './shortageQuantity.ts'

describe('ViewInvoice model', () => {
    test('should able to get all invoiceGenerated Trip', async () => {
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
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortageQuantity({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        const actual = await updateAcknowledgementApproval(overalltrip.id)
        expect(actual.acknowledgementApproval).toBe(!overalltrip.acknowledgementApproval)
    })
})
