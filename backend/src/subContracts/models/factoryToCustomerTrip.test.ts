import seedFactoryToCustomerTrip from '../seed/factoryToCustomerTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedFactory from '../seed/factoryWithoutDep.ts'
import seedDelivery from '../seed/deliveryPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import {
    create,
    getAllTrip,
    getTripByVehicleNumber,
    updateTransporterBalance
} from './factoryToCustomerTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createFactory } from './factory.ts'
import { create as createDelivery } from './deliveryPoint.ts'
import { create as createTruck } from './truck.ts'

describe('Trip model', () => {
    test('should able to create a trip', async () => {
        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createFactory({ ...seedFactory, cementCompanyId: company.id })
        const deliveryPoint = await createDelivery({
            ...seedDelivery,
            cementCompanyId: company.id
        })
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            factoryId: factoryPoint.id,
            deliveryPointId: deliveryPoint.id,
            truckId: truck.id
        })
        const tripByVehicleNumber = await getTripByVehicleNumber('TN93D5512')
        expect(tripByVehicleNumber?.totalTransporterAmount).toBe(trip.totalTransporterAmount)
        const actual = await getAllTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].filledLoad).toBe(trip.filledLoad)
    })
    test('should able to update a transporterBalance', async () => {
        const balanceToUpdate = 500
        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createFactory({ ...seedFactory, cementCompanyId: company.id })
        const deliveryPoint = await createDelivery({
            ...seedDelivery,
            cementCompanyId: company.id
        })
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            factoryId: factoryPoint.id,
            deliveryPointId: deliveryPoint.id,
            truckId: truck.id
        })
        await updateTransporterBalance({ tripId: trip.id, remaining: balanceToUpdate })
        const actual = await getAllTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].transporterBalance).toBe(balanceToUpdate)
    })
})
