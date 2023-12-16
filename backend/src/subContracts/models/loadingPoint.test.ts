import seedLoadingPoint from '../seed/loadingPoint.ts'
import seedCementCompany from '../seed/cementCompany.ts'
import seedLoadingPointWithoutDep from '../seed/loadingPointWithoutDep.ts'
import { create, getAllLoadingPoint, getLoadingPointByCompany } from './loadingPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        await create(seedLoadingPoint)
        const actual = await getAllLoadingPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedLoadingPoint.name)
    })
    test('should get only Factory Point by Cement Comapny name', async () => {
        await create(seedLoadingPoint)
        const cementCompany = await createCementCompany({
            ...seedCementCompany,
            name: 'Barath Cements'
        })
        await create({
            ...seedLoadingPointWithoutDep,
            cementCompanyId: cementCompany.id
        })
        const actual = await getLoadingPointByCompany(cementCompany.name)
        expect(actual.length).toBe(1)
        expect(actual[0].cementCompanyId).toBe(cementCompany.id)
    })
})
