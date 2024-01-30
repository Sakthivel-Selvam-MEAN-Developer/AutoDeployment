import seedCementCompany from '../seed/cementCompany.ts'
import seedLoadingPointWithoutDep from '../seed/loadingPointWithoutDep.ts'
import { create, getAllLoadingPoint, getLoadingPointByCompany } from './loadingPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        const pricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const cementCompany = await createCementCompany(seedCementCompany)
        await create({
            ...seedLoadingPointWithoutDep,
            cementCompanyId: cementCompany.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const actual = await getAllLoadingPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedLoadingPointWithoutDep.name)
    })
    test('should get only Factory Point by Cement Comapny name', async () => {
        const pricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const company = await createCementCompany(seedCementCompany)
        await create({
            ...seedLoadingPointWithoutDep,
            cementCompanyId: company.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const cementCompany = await createCementCompany({
            ...seedCementCompany,
            name: 'Barath Cements',
            emailId: 'gg@gmail.com'
        })
        await create({
            ...seedLoadingPointWithoutDep,
            cementCompanyId: cementCompany.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const actual = await getLoadingPointByCompany(company.name)
        expect(actual.length).toBe(1)
        expect(actual[0].cementCompanyId).toBe(company.id)
    })
})
