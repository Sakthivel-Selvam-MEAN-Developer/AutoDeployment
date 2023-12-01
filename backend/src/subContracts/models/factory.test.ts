import seedFactory from '../seed/factory.ts'
import seedcementCompany from '../seed/cementCompany.ts'
import seedFactoryWithoutDep from '../seed/factoryWithoutDep.ts'
import { create, getAllFactory, getFactoryByCompany } from './factory.ts'
import { create as createCementCompany } from './cementCompany.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        await create(seedFactory)
        const actual = await getAllFactory()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedFactory.name)
    })
    test('should get only Factory Point by Cement Comapny name', async () => {
        await create(seedFactory)
        const cementCompany = await createCementCompany({
            ...seedcementCompany,
            name: 'Barath Cements'
        })
        await create({
            ...seedFactoryWithoutDep,
            cementCompanyId: cementCompany.id
        })
        const actual = await getFactoryByCompany(cementCompany.name)
        expect(actual.length).toBe(1)
        expect(actual[0].cementCompanyId).toBe(cementCompany.id)
    })
})
