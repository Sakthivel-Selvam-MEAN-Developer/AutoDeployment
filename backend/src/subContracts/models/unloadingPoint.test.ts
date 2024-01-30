import seedUnloadingPoint from '../seed/unloadingPoint.ts'
import seedCementCompany from '../seed/cementCompany.ts'
import seedUnloadingPointWithoutDep from '../seed/unloadingPointWithoutDep.ts'
import { create, getAllUnloadingPoint, getUnloadingPointByCompany } from './unloadingPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('UnloadingPoint model', () => {
    test('should able to create a deliveryPoint', async () => {
        const pricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const cementCompany = await createCementCompany(seedCementCompany)
        await create({
            ...seedUnloadingPointWithoutDep,
            cementCompanyId: cementCompany.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const actual = await getAllUnloadingPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedUnloadingPointWithoutDep.name)
    })
    test('should get only the Unloading Point by Cement Comapny name', async () => {
        const pricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const company = await createCementCompany(seedCementCompany)
        await create({
            ...seedUnloadingPointWithoutDep,
            cementCompanyId: company.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const cementCompany = await createCementCompany({
            ...seedCementCompany,
            name: 'Barath Cements',
            emailId: 'gg@gmail.com'
        })
        await create({
            ...seedUnloadingPointWithoutDep,
            cementCompanyId: cementCompany.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const actual = await getUnloadingPointByCompany(
            seedUnloadingPoint.cementCompany.create.name
        )
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedUnloadingPoint.name)
    })
})
