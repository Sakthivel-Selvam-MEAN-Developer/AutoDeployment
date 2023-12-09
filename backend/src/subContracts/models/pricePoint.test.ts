import seedFactory from '../seed/factoryWithoutDep.ts'
import seedDeliveryPoint from '../seed/deliveryPointWithoutDep.ts'
import seedPricePoint from '../seed/pricePoint.ts'
import seedCompany from '../seed/cementCompany.ts'
import { create, getPricePoint } from './pricePoint.ts'
import { create as createFactory } from './factory.ts'
import { create as createDeliveryPoint } from './deliveryPoint.ts'
import { create as createCompany } from './cementCompany.ts'

describe('Price Point model', () => {
    test('should able to create', async () => {
        const company = await createCompany(seedCompany)
        const factory = await createFactory({ ...seedFactory, cementCompanyId: company.id })
        const deliveryPoint = await createDeliveryPoint({
            ...seedDeliveryPoint,
            cementCompanyId: company.id
        })
        const pricePoint = await create({
            ...seedPricePoint,
            factoryId: factory.id,
            deliveryPointId: deliveryPoint.id
        })
        const actual = await getPricePoint(factory.id, deliveryPoint.id)
        expect(actual?.freightAmount).toBe(pricePoint.freightAmount)
        expect(actual?.transporterAmount).toBe(pricePoint.transporterAmount)
    })
})
