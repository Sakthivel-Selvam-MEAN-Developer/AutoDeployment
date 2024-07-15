import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedPricePoint from '../seed/pricePoint.ts'
import seedCompany from '../seed/cementCompany.ts'
import { create, getAllPricePoint, getPricePoint } from './pricePoint.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingPoint } from './unloadingPoint.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Price Point model', () => {
    test('should able to create', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const loadingPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingPoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const pricePoint = await create({
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await getPricePoint(loadingPoint.id, unloadingPoint.id, null)
        expect(actual?.freightAmount).toBe(pricePoint.freightAmount)
        expect(actual?.transporterAmount).toBe(pricePoint.transporterAmount)
    })
    test('should able to get all pricePoint', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const loadingPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingPoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const pricePoint = await create({
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await getAllPricePoint()
        expect(actual[0]?.loadingPointId).toBe(pricePoint.loadingPointId)
        expect(actual[0]?.unloadingPointId).toBe(pricePoint.unloadingPointId)
    })
})
describe('Price Point model', () => {
    test('should create a new price point', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const loadingPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingPoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const pricePoint = await create({
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await getPricePoint(loadingPoint.id, unloadingPoint.id, null)
        expect(actual?.freightAmount).toBe(pricePoint.freightAmount)
        expect(actual?.transporterAmount).toBe(pricePoint.transporterAmount)
    })

    test('should return null if price point does not exist', async () => {
        const actual = await getPricePoint(99999, 99999, 99999)
        expect(actual).toBeNull()
    })

    test('should update an existing price point', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const loadingPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingPoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        await create({
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id
        })

        const updatedPricePointData = {
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id,
            freightAmount: 5000 // New value for testing
        }

        const updatedPricePoint = await create(updatedPricePointData)
        expect(updatedPricePoint.freightAmount).toBe(updatedPricePointData.freightAmount)

        const actual = await getPricePoint(loadingPoint.id, unloadingPoint.id, null)
        expect(actual?.freightAmount).toBe(updatedPricePointData.freightAmount)
    })

    test('should get all price points', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const company = await createCompany(seedCompany, 1)
        const loadingPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const unloadingPoint = await createUnloadingPoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const pricePoint = await create({
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await getAllPricePoint()
        expect(actual[0]?.loadingPoint?.id).toBe(pricePoint.loadingPointId)
        expect(actual[0]?.unloadingPoint?.id).toBe(pricePoint.unloadingPointId)
    })
})
