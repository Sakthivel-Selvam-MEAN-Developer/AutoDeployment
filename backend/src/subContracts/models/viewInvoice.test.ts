import { create as createCompany } from './cementCompany.ts'
import {
    create as createTrip,
    updateBillNumber as updateLoadingToUnloading
} from './loadingToUnloadingTrip.ts'
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
import { create as createCompanyinvoice, getCompanyInvoice, pageCount } from './viewInvoice.ts'
const unloadingPointTest = await createPricePointMarker({
    ...seedPricePointMarker,
    location: 'salem'
})
describe('ViewInvoice model', () => {
    test('should able to create company invoice', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = unloadingPointTest
        const company = await createCompany(seedCompany)
        const factoryPoint = await factoryPointTest(company, loadingPricePointMarker)
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const trip = await tripDetailsTest(factoryPoint, deliveryPoint)
        await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const filterData = filterDataTest(company)
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
    })
    test('should able to get all invoiceGenerated Trip', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany)
        const transporter = await createTransporter(seedTransporter, 1)
        const truck = await createTruck({ ...seedTruck, transporterId: transporter.id })
        const factoryPoint = await factoryDetails(company, loadingPricePointMarker)
        const filterData = dataFilterDetails(company)
        const deliveryPoint = await deliveryPointData(company, unloadingPricePointMarker)
        const trip = await tripData(factoryPoint, deliveryPoint)
        await create({
            truckId: truck.id,
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await createShortageQuantity({ ...seedShortageQuantity, overallTripId: overallTrip.id })
        await closeAcknowledgementStatusforOverAllTrip(overallTrip.id)
        await updateLoadingToUnloading([overallTrip.id], 'MGL-2002')
        const companyInvoice = await companyInvoiceDetails(company)
        const actual = await getCompanyInvoice(filterData)
        expect(actual[0].billNo).toBe(companyInvoice.billNo)
        expect(actual[0].amount).toBe(companyInvoice.amount)
        expect(actual[0].pdfLink).toBe(companyInvoice.pdfLink)
    })
    test('should calculate balance correctly after creating company invoice', async () => {
        const company = await createCompany(seedCompany)
        const initialBalance = 50000
        const companyInvoice = await createCompanyinvoice({
            billNo: 'MGL-034',
            billDate: 1688282262,
            amount: 24000,
            pdfLink: 'https://aws.s3.sample.pdf',
            cementCompanyId: company.id
        })
        const finalBalance = initialBalance - companyInvoice.amount
        expect(finalBalance).toBe(26000)
    })
    test('should able to get pagecount', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = unloadingPointTest
        const company = await createCompany(seedCompany)
        const factoryPoint = await factoryPointTest(company, loadingPricePointMarker)
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const trip = await tripDetailsTest(factoryPoint, deliveryPoint)
        await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const filterData = filterDataTest(company)
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await updateLoadingToUnloading([overallTrip.id], 'MGL-034')
        await createCompanyinvoice({
            billNo: 'MGL-034',
            billDate: 1688282262,
            amount: 24000,
            pdfLink: 'https://aws.s3.sample.pdf',
            cementCompanyId: company.id
        })
        const actual = await pageCount(filterData)
        expect(actual).toBe(1)
    })
    test('should able to get page count undefined', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = unloadingPointTest
        const company = await createCompany(seedCompany)
        const factoryPoint = await factoryPointTest(company, loadingPricePointMarker)
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const trip = await tripDetailsTest(factoryPoint, deliveryPoint)
        await create({
            loadingPointToUnloadingPointTripId: trip.id,
            acknowledgementApproval: false,
            acknowledgementStatus: true,
            transporterInvoice: 'asdfghjk'
        })
        const filterData = filterDataPageCount(company)
        const overallTrip = await create({ loadingPointToUnloadingPointTripId: trip.id })
        await updateLoadingToUnloading([overallTrip.id], 'MGL-034')
        await createCompanyinvoice({
            billNo: 'MGL-034',
            billDate: 1688282262,
            amount: 24000,
            pdfLink: 'https://aws.s3.sample.pdf',
            cementCompanyId: company.id
        })
        const actual = await pageCount(filterData)
        expect(actual).toBe(1)
    })
})

function filterDataTest(company: {
    id: number
    name: string
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    createdAt: Date
    updatedAt: Date
    primaryBillId: number | null
    secondaryBillId: number | null
}) {
    return {
        company: company.id.toString(),
        startDate: 1688282262,
        endDate: 1688282262,
        pageNumber: 1
    }
}
function filterDataPageCount(company: {
    id: number
    name: string
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    createdAt: Date
    updatedAt: Date
    primaryBillId: number | null
    secondaryBillId: number | null
}) {
    return {
        company: company.id.toString(),
        startDate: 0,
        endDate: 0,
        pageNumber: 1
    }
}
interface locationtype {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    cementCompanyId: number
    pricePointMarkerId: number
}
async function tripDetailsTest(factoryPoint: locationtype, deliveryPoint: locationtype) {
    return await createTrip({
        ...seedFactoryToCustomerTrip,
        loadingPointId: factoryPoint.id,
        unloadingPointId: deliveryPoint.id,
        wantFuel: false,
        loadingKilometer: 0
    })
}
async function factoryPointTest(
    company: {
        id: number
        name: string
        gstNo: string
        address: string
        emailId: string
        contactPersonName: string
        contactPersonNumber: string
        createdAt: Date
        updatedAt: Date
        primaryBillId: number | null
        secondaryBillId: number | null
    },
    loadingPricePointMarker: { id: number; location: string; createdAt: Date; updatedAt: Date }
) {
    return await createLoadingPoint({
        ...seedLoadingPoint,
        cementCompanyId: company.id,
        pricePointMarkerId: loadingPricePointMarker.id
    })
}

function dataFilterDetails(company: {
    id: number
    name: string
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    createdAt: Date
    updatedAt: Date
    primaryBillId: number | null
    secondaryBillId: number | null
}) {
    return {
        company: company.id.toString(),
        startDate: 0,
        endDate: 0,
        pageNumber: 1
    }
}

async function companyInvoiceDetails(company: {
    id: number
    name: string
    gstNo: string
    address: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    createdAt: Date
    updatedAt: Date
    primaryBillId: number | null
    secondaryBillId: number | null
}) {
    return await createCompanyinvoice({
        ...seedViewInvoice,
        cementCompanyId: company.id
    })
}

async function deliveryPointData(
    company: {
        id: number
        name: string
        gstNo: string
        address: string
        emailId: string
        contactPersonName: string
        contactPersonNumber: string
        createdAt: Date
        updatedAt: Date
        primaryBillId: number | null
        secondaryBillId: number | null
    },
    unloadingPricePointMarker: { id: number; location: string; createdAt: Date; updatedAt: Date }
) {
    return await createUnloadingpoint({
        ...seedUnloadingPoint,
        cementCompanyId: company.id,
        pricePointMarkerId: unloadingPricePointMarker.id
    })
}
async function factoryDetails(
    company: {
        id: number
        name: string
        gstNo: string
        address: string
        emailId: string
        contactPersonName: string
        contactPersonNumber: string
        createdAt: Date
        updatedAt: Date
        primaryBillId: number | null
        secondaryBillId: number | null
    },
    loadingPricePointMarker: { id: number; location: string; createdAt: Date; updatedAt: Date }
) {
    return await createLoadingPoint({
        ...seedLoadingPoint,
        cementCompanyId: company.id,
        pricePointMarkerId: loadingPricePointMarker.id
    })
}
async function tripData(
    factoryPoint: {
        id: number
        name: string
        createdAt: Date
        updatedAt: Date
        cementCompanyId: number
        pricePointMarkerId: number
    },
    deliveryPoint: {
        id: number
        name: string
        createdAt: Date
        updatedAt: Date
        cementCompanyId: number
        pricePointMarkerId: number
    }
) {
    return await createTrip({
        ...seedFactoryToCustomerTrip,
        loadingPointId: factoryPoint.id,
        unloadingPointId: deliveryPoint.id,
        wantFuel: false,
        loadingKilometer: 0
    })
}
