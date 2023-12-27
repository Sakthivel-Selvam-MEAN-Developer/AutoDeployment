import seedFactoryToCustomerTrip from '../seed/loadingToUnloadingTrip.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedTruck from '../seed/truck.ts'
import {
    create,
    getAllTrip,
    getOnlyActiveTripByVehicleNumber,
    getTripByVehicleNumber,
    updateTransporterBalance
} from './loadingToUnloadingTrip.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'
import { create as createTruck } from './truck.ts'

describe('Trip model', () => {
    test('should able to create a trip', async () => {
        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id
        })
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id,
            wantFuel: true
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
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id
        })
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id
        })
        await updateTransporterBalance({ tripId: trip.id, remaining: balanceToUpdate })
        const actual = await getAllTrip()
        expect(actual.length).toBe(1)
        expect(actual[0].transporterBalance).toBe(balanceToUpdate)
    })
    test('should able to get only active trips', async () => {
        const company = await createCompany(seedCompany)
        const truck = await createTruck(seedTruck)
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id
        })
        const trip = await create({
            ...seedFactoryToCustomerTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truck.id
        })
        const activeTrip = await getOnlyActiveTripByVehicleNumber(truck.vehicleNumber)
        expect(activeTrip?.id).toBe(trip.id)
    })
})
