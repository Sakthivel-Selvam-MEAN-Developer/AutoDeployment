import seedTruck from '../seed/truck.ts'
import seedBank from '../seed/bankDetails.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingToUnloadingTrip from '../seed/loadingToUnloadingTrip.ts'
import seedTruckWithoutDep from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporterWithoutDep.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import { create as createTruck, getAllTruck, getTruckByTransporter } from './truck.ts'
import { create } from './transporter.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
import { create as createBank } from './bankDetails.ts'
import { create as createCompany } from './cementCompany.ts'
import { create as createLoadingPoint } from './loadingPoint.ts'
import { create as createUnloadingpoint } from './unloadingPoint.ts'

describe('Truck model', () => {
    test('should able to create', async () => {
        await createTruck(seedTruck)
        const actual = await getAllTruck()
        expect(actual.length).toBe(1)
        expect(actual[0].vehicleNumber).toBe(seedTruck.vehicleNumber)
    })
    test('should get only Truck by Transporter name', async () => {
        const bank = await createBank(seedBank)
        const transporter = await create({ ...seedTransporter, bankDetailsId: bank.id })
        await createTruck({
            ...seedTruckWithoutDep,
            vehicleNumber: 'TN33ba1234',
            transporterId: transporter.id
        })
        const actual = await getTruckByTransporter(transporter.name)
        expect(actual.length).toBe(1)
        expect(actual[0].transporterId).toBe(transporter.id)
    })
    test('should get only Truck with inactive by Transporter name', async () => {
        const bank = await createBank(seedBank)
        const transporter = await create({ ...seedTransporter, bankDetailsId: bank.id })
        const truckWithActiveTrip = await createTruck({
            ...seedTruckWithoutDep,
            vehicleNumber: 'TN33ba1234',
            transporterId: transporter.id
        })
        const truckWithInActiveTrip = await createTruck({
            ...seedTruckWithoutDep,
            vehicleNumber: 'TN93D5512',
            transporterId: transporter.id
        })

        const company = await createCompany(seedCompany)
        const factoryPoint = await createLoadingPoint({
            ...seedLoadingPoint,
            cementCompanyId: company.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id
        })
        await createTrip({
            ...seedLoadingToUnloadingTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            truckId: truckWithActiveTrip.id
        })

        const actual = await getTruckByTransporter(transporter.name)
        expect(actual.length).toBe(1)
        expect(actual[0].transporterId).toBe(transporter.id)
        expect(actual[0].vehicleNumber).toBe(truckWithInActiveTrip.vehicleNumber)
    })
})
