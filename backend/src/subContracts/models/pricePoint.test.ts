import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedPricePoint from '../seed/pricePoint.ts'
import seedCompany from '../seed/cementCompany.ts'
import { create, getPricePoint } from './pricePoint.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingPoint } from './unloadingPoint.ts'
import { create as createCompany } from './cementCompany.ts'

describe('Price Point model', () => {
    test('should able to create', async () => {
        const company = await createCompany(seedCompany)
        const loadingPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id
        })
        const unloadingPoint = await createUnloadingPoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id
        })
        const pricePoint = await create({
            ...seedPricePoint,
            loadingPointId: loadingPoint.id,
            unloadingPointId: unloadingPoint.id
        })
        const actual = await getPricePoint(loadingPoint.id, unloadingPoint.id)
        expect(actual?.freightAmount).toBe(pricePoint.freightAmount)
        expect(actual?.transporterAmount).toBe(pricePoint.transporterAmount)
    })
})
