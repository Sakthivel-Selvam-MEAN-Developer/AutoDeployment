import seedTruck from '../seed/truck.ts'
import seedCompany from '../seed/cementCompany.ts'
import seedLoadingToUnloadingTrip from '../seed/loadingToUnloadingTrip.ts'
import seedTruckWithoutDep from '../seed/truckWithoutDeb.ts'
import seedTransporter from '../seed/transporterWithoutDep.ts'
import seedLoadingPoint from '../seed/loadingPointWithoutDep.ts'
import seedUnloadingPoint from '../seed/unloadingPointWithoutDep.ts'
import seedPricePointMarker from '../seed/pricePointMarker.ts'
import { create as createOverallTrip } from './overallTrip.ts'
import {
    create as createTruck,
    getAllTruck,
    getNumberByTruckId,
    getTruckByTransporter,
    getTransporterTypeByVehicleNumber
} from './truck.ts'
import { create } from './transporter.ts'
import { create as createPricePointMarker } from './pricePointMarker.ts'
import { create as createTrip } from './loadingToUnloadingTrip.ts'
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
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const transporter = await create(seedTransporter)
        await createTruck({
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
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const tripCreate = await createTrip({
            ...seedLoadingToUnloadingTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            loadingKilometer: 0
        })
        await createOverallTrip({
            loadingPointToUnloadingPointTripId: tripCreate.id,
            truckId: truckWithInActiveTrip.id
        })
        const actual = await getTruckByTransporter(transporter.name)
        expect(actual.length).toBe(1)
        expect(actual[0].transporterId).toBe(transporter.id)
    })
    test('should get only Truck with inactive by Transporter name', async () => {
        const loadingPricePointMarker = await createPricePointMarker(seedPricePointMarker)
        const unloadingPricePointMarker = await createPricePointMarker({
            ...seedPricePointMarker,
            location: 'salem'
        })
        const transporter = await create(seedTransporter)
        const truck = await createTruck({
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
            cementCompanyId: company.id,
            pricePointMarkerId: loadingPricePointMarker.id
        })
        const deliveryPoint = await createUnloadingpoint({
            ...seedUnloadingPoint,
            cementCompanyId: company.id,
            pricePointMarkerId: unloadingPricePointMarker.id
        })
        const tripCreate = await createTrip({
            ...seedLoadingToUnloadingTrip,
            loadingPointId: factoryPoint.id,
            unloadingPointId: deliveryPoint.id,
            loadingKilometer: 0
        })
        await createOverallTrip({
            loadingPointToUnloadingPointTripId: tripCreate.id,
            truckId: truckWithInActiveTrip.id
        })
        const actual = await getTruckByTransporter(transporter.name)
        expect(actual.length).toBe(1)
        expect(actual[0].transporterId).toBe(transporter.id)
        expect(actual[0].vehicleNumber).toBe(truck.vehicleNumber)
    })
    test('should get only Number By TruckId', async () => {
        const transporter = await create(seedTransporter)
        const truck = await createTruck({
            ...seedTruckWithoutDep,
            vehicleNumber: 'TN33ba1234',
            transporterId: transporter.id
        })
        const actual = await getNumberByTruckId(truck.id)
        expect(actual?.vehicleNumber).toBe(truck.vehicleNumber)
    })
    test('should get only Truck by vehicleNumber', async () => {
        const transporter = await create(seedTransporter)
        const truck = await createTruck({
            ...seedTruckWithoutDep,
            vehicleNumber: 'TN33ba1234',
            transporterId: transporter.id
        })
        const actual = await getTransporterTypeByVehicleNumber('TN33ba1234')
        expect(actual?.vehicleNumber).toBe(truck.vehicleNumber)
    })
})
