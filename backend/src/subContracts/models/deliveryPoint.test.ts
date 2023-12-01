import seedDeliveryPoint from '../seed/deliveryPoint.ts'
import seedcementCompany from '../seed/cementCompany.ts'
import seedDeliveryPointWithoutDep from '../seed/deliveryPointWithoutDep.ts'
import { create, getAllDeliveryPoint, getDeliveryPointByCompany } from './deliveryPoint.ts'
import { create as createCementCompany } from './cementCompany.ts'

describe('deliveryPoint model', () => {
    test('should able to create a deliveryPoint', async () => {
        await create(seedDeliveryPoint)
        const actual = await getAllDeliveryPoint()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedDeliveryPoint.name)
    })
    test('should get only the Delivery Point by Cement Comapny name', async () => {
        await create(seedDeliveryPoint)
        const cementCompany = await createCementCompany({
            ...seedcementCompany,
            name: 'Barath Cements'
        })
        await create({
            ...seedDeliveryPointWithoutDep,
            cementCompanyId: cementCompany.id
        })
        const actual = await getDeliveryPointByCompany(cementCompany.name)
        expect(actual.length).toBe(1)
        expect(actual[0].cementCompanyId).toBe(cementCompany.id)
    })
})
