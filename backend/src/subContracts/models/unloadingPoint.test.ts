import seedUnloadingPoint from '../seed/unloadingPoint.ts'
import seedcementCompany from '../seed/cementCompany.ts'
import seedUnloadingPointWithoutDep from '../seed/unloadingPointWithoutDep.ts'
import { create, getAllUnloadingPoint, getUnloadingPointByCompany } from './unloadingPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'

describe('UnloadingPoint model', () => {
    test('should able to create a deliveryPoint', async () => {
        await create(seedUnloadingPoint)
        const actual = await getAllUnloadingPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedUnloadingPoint.name)
    })
    test('should get only the Unloading Point by Cement Comapny name', async () => {
        await create(seedUnloadingPoint)
        const cementCompany = await createCementCompany({
            ...seedcementCompany,
            name: 'Barath Cements'
        })
        await create({
            ...seedUnloadingPointWithoutDep,
            cementCompanyId: cementCompany.id
        })
        const actual = await getUnloadingPointByCompany(
            seedUnloadingPoint.cementCompany.create.name
        )
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedUnloadingPoint.name)
    })
})
