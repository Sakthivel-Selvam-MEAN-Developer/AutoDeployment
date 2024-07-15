import seedCementCompany from '../seed/cementCompany.ts'
import seedStockPointWithoutDep from '../seed/stockPointWithoutDep.ts'
import { create, getAllStockPoint, getStockPointByCompany } from './stockPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'

describe('StockPoint model', () => {
    test('should able to create a StockPoint', async () => {
        const pricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const cementCompany = await createCementCompany(seedCementCompany, 1)
        await create({
            ...seedStockPointWithoutDep,
            cementCompanyId: cementCompany.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const actual = await getAllStockPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedStockPointWithoutDep.name)
    })
    test('should able to  get StockPoint By Company', async () => {
        const pricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const cementCompany = await createCementCompany(seedCementCompany, 1)
        await create({
            ...seedStockPointWithoutDep,
            cementCompanyId: cementCompany.id,
            pricePointMarkerId: pricePointMarker.id
        })
        const actual = await getStockPointByCompany(cementCompany.name)
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedStockPointWithoutDep.name)
    })
})
