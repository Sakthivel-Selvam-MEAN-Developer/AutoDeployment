import seedGpsStop from '../seed/gpsStopsWithoutDependency'
import seedVehicle from '../seed/vehicle'
import { create, createManyIfNotExist, getGpsStops } from './gpsStop'
import { create as createVehicle } from './vehicle'
import { create as createStopReason } from './stopReason'

async function createBaseData() {
    const stopReason = await createStopReason({ name: 'random' })
    const vehicle = await createVehicle(seedVehicle)
    return { vehicle, stopReason }
}

describe('GpsStops', () => {
    test('should able to access gpsStops', async () => {
        const vehicle = await createVehicle(seedVehicle)
        await create({
            ...seedGpsStop,
            vehicleId: vehicle.id
        })
        const actual = await getGpsStops()
        expect(actual.length).toBe(1)
        expect(actual[0].latitude).toBe(seedGpsStop.latitude)
        expect(actual[0].longitude).toBe(seedGpsStop.longitude)
    })

    test('should create many if not existing', async () => {
        const { vehicle, stopReason } = await createBaseData()
        await createManyIfNotExist([
            {
                ...seedGpsStop,
                vehicleId: vehicle.id,
                stopReasonId: stopReason.id
            }
        ])
        const actual = await getGpsStops()
        expect(actual.length).toBe(1)
        expect(actual[0].durationInMillis).toBe(seedGpsStop.durationInMillis)
    })
    test('should not create many if exist already', async () => {
        const { vehicle, stopReason } = await createBaseData()
        await create({
            ...seedGpsStop,
            vehicleId: vehicle.id,
            durationInMillis: 100
        })
        await createManyIfNotExist([
            {
                ...seedGpsStop,
                vehicleId: vehicle.id,
                stopReasonId: stopReason.id
            }
        ])
        const actual = await getGpsStops()
        expect(actual.length).toBe(1)
        expect(actual[0].durationInMillis).toBe(100)
    })
    test('should create stops on creation of gps stops', async () => {
        const { vehicle, stopReason } = await createBaseData()

        await createManyIfNotExist([
            {
                ...seedGpsStop,
                vehicleId: vehicle.id,
                stopReasonId: stopReason.id
            }
        ])
        const actual = await getGpsStops()
        expect(actual.length).toBe(1)
    })
})
