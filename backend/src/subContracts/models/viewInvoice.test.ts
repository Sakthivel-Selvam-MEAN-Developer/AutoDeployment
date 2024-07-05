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
import seedViewInvoice from '../seed/viewInvoice.ts'
import seedTransporter from '../seed/transporter.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import { closeAcknowledgementStatusforOverAllTrip, create } from './overallTrip.ts'
import seedShortageQuantity from '../seed/shortageQuantity.ts'
import { create as createShortageQuantity } from './shortageQuantity.ts'
import { updateBillNumber as updateLoadingToUnloading } from '../models/loadingToUnloadingTrip.ts'
import { create as createCompanyinvoice, getCompanyInvoice } from '../models/viewInvoice.ts'
describe('ViewInvoice model', () => {
    test('should able to create company invoice', async () => {
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
        await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const filterData = {
            company: company.id.toString(),
            startDate: 1688282262,
            endDate: 1688282262
        }
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortageQuantity({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        await updateLoadingToUnloading([overallTrip.id], 'MGL-034')
        const companyInvoice = await createCompanyinvoice({
            billNo: 'MGL-034',
            billDate: 1688282262,
            amount: 24000,
            pdfLink: 'https://aws.s3.sample.pdf',
            cementCompanyId: company.id
        })
        const actual = await getCompanyInvoice(filterData)
        expect(actual[0].billNo).toBe(companyInvoice.billNo)
        expect(actual[0].billDate).toBe(companyInvoice.billDate)
        expect(actual[0].amount).toBe(companyInvoice.amount)
    })
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
        const filterData = {
            company: company.id.toString(),
            startDate: 0,
            endDate: 0
        }
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
        await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })

        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortageQuantity({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        await updateLoadingToUnloading([overallTrip.id], 'MGL-2002')

        const companyInvoice = await createCompanyinvoice({
            ...seedViewInvoice,
            cementCompanyId: company.id
        })
        const actual = await getCompanyInvoice(filterData)
        expect(actual[0].billNo).toBe(companyInvoice.billNo)
        expect(actual[0].billDate).toBe(companyInvoice.billDate)
        expect(actual[0].amount).toBe(companyInvoice.amount)
        expect(actual[0].pdfLink).toBe(companyInvoice.pdfLink)
    })
})
