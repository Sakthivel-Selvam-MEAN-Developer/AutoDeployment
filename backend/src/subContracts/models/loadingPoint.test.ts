import seedCementCompany from '../seed/cementCompany.ts'
import seedLoadingPointWithoutDep from '../seed/loadingPointWithoutDep.ts'
import { create, getAllLoadingPoint, getLoadingPointByCompany } from './loadingPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('Factory model', () => {
    test('should be able to create', async () => {
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
    test('should get only Factory Point by Cement Company name', async () => {
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
    test('should not get Factory Point by invalid Cement Company name', async () => {
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
        const actual = await getLoadingPointByCompany('Ravi Cements')
        expect(actual.length).toBe(0)
    })

    test('should handle no loading points gracefully', async () => {
        const actual = await getLoadingPointByCompany('NonExistentCements')
        expect(actual.length).toBe(0)
    })
})
