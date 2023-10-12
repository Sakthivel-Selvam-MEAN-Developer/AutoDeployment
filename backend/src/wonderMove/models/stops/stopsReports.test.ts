import seedReason from '../../seed/reason'
import seedVehicle from '../../seed/vehicle'
import seedStop from '../../seed/stopsWithoutDependency'
import seedGpsStopsWithoutDep from '../../seed/gpsStopsWithoutDependency'
import seedVehicleWithoutDep from '../../seed/vehiclesWithoutDependency'
import {
    getCombinedDuration,
    getDurationGreaterThanFromTo,
    getDurationStopAfterTo,
    getDurationStopBeforeFrom,
    getDurationWithInRange
} from './stopsReports'
import { create as createNewReason } from '../stopReason'
import { create as createNewVehicle } from '../vehicle'
import { create as createGpsStop } from '../gpsStop'
import { create } from './stops.crud'

const createStop = async (stop: any, from: number, to: number) => {
    await create({
        ...stop,
        startTime: from,
        endTime: to,
        durationInMillis: to - from
    })
}

describe('Stops report', () => {
    test('should get stops with the range for all vehicle', async () => {
        const from = 10
        const to = 100
        const reason1 = await createNewReason(seedReason)
        const reason2 = await createNewReason({
            ...seedReason,
            name: 'Puncture'
        })
        const vehicle1 = await createNewVehicle(seedVehicleWithoutDep)
        const vehicle2 = await createNewVehicle({
            ...seedVehicleWithoutDep,
            number: 'tn93d5512'
        })
        const gpsStops1 = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle1.id
        })
        const gpsStops2 = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle2.id
        })
        const stop1 = {
            ...seedStop,
            stopReasonId: reason1.id,
            gpsStopId: gpsStops1.id
        }
        const stop2 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops1.id
        }
        const stop3 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops2.id
        }

        await create({
            ...stop1,
            startTime: 20,
            endTime: 30,
            durationInMillis: 10
        })
        await create({
            ...stop1,
            startTime: 10,
            endTime: 100,
            durationInMillis: 90
        })
        await create({
            ...stop2,
            startTime: 5,
            endTime: 30,
            durationInMillis: 25
        })
        await create({
            ...stop2,
            startTime: 40,
            endTime: 95,
            durationInMillis: 55
        })
        await create({
            ...stop3,
            startTime: 25,
            endTime: 60,
            durationInMillis: 35
        })

        const actual = await getDurationWithInRange(from, to)
        expect(actual).toHaveLength(2)

        expect(actual).toContainEqual({
            durationInMillis: 90,
            stopReasonId: reason2.id
        })
        expect(actual).toContainEqual({
            durationInMillis: 100,
            stopReasonId: reason1.id
        })
    })

    test.skip('should get stops lt from, only for range', async () => {
        const from = 50
        const to = 100
        const reason = await createNewReason(seedReason)
        const vehicle = await createNewVehicle(seedVehicle)
        const stop = {
            ...seedStop,
            stopReasonId: reason.id,
            vehicleId: vehicle.id
        }
        await create({
            ...stop,
            startTime: 20,
            endTime: 100,
            durationInMillis: 80
        })
        await create({
            ...stop,
            startTime: 80,
            endTime: 120,
            durationInMillis: 40
        })
        await create({
            ...stop,
            startTime: 50,
            endTime: 70,
            durationInMillis: 20
        })
        await create({
            ...stop,
            startTime: 20,
            endTime: 80,
            durationInMillis: 60
        })
        const actual = await getDurationStopBeforeFrom(from, to)

        expect(actual).toHaveLength(2)
        expect(actual).toContainEqual({
            startTime: 20,
            endTime: 100,
            durationInMillis: 80,
            stopReasonId: reason.id
        })
        expect(actual).toContainEqual({
            startTime: 20,
            endTime: 80,
            durationInMillis: 60,
            stopReasonId: reason.id
        })
    })

    test('should get stops lt from, for aggregated duration', async () => {
        const from = 50
        const to = 100
        const reason1 = await createNewReason(seedReason)
        const reason2 = await createNewReason({
            ...seedReason,
            name: 'Puncture'
        })
        const vehicle = await createNewVehicle(seedVehicle)
        const gpsStops = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle.id
        })
        const stop1 = {
            ...seedStop,
            stopReasonId: reason1.id,
            gpsStopId: gpsStops.id
        }
        const stop2 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop3 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop4 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }

        await createStop(stop1, 20, 100)
        await createStop(stop2, 5, 60)
        await createStop(stop3, 40, 80)
        await createStop(stop4, 60, 80)

        const actual = await getDurationStopBeforeFrom(from, to)
        expect(actual).toHaveLength(2)
        expect(actual).toContainEqual({
            durationInMillis: 50,
            stopReasonId: reason1.id
        })
        expect(actual).toContainEqual({
            durationInMillis: 40,
            stopReasonId: reason2.id
        })
    })

    test.skip('should get stops gt to, only for range', async () => {
        const from = 10
        const to = 50
        const reason = await createNewReason(seedReason)
        const vehicle = await createNewVehicle(seedVehicle)
        const stop = {
            ...seedStop,
            stopReasonId: reason.id,
            vehicleId: vehicle.id
        }
        await createStop(stop, 10, 50)
        await createStop(stop, 40, 120)
        await createStop(stop, 30, 50)
        await createStop(stop, 20, 80)

        const actual = await getDurationStopAfterTo(from, to)
        expect(actual).toHaveLength(2)
        expect(actual).toContainEqual({
            startTime: 40,
            endTime: 120,
            durationInMillis: 80,
            stopReasonId: reason.id
        })
        expect(actual).toContainEqual({
            startTime: 20,
            endTime: 80,
            durationInMillis: 60,
            stopReasonId: reason.id
        })
    })

    test('should get stops gt to, for aggregated duration', async () => {
        const from = 10
        const to = 50
        const reason1 = await createNewReason(seedReason)
        const reason2 = await createNewReason({
            ...seedReason,
            name: 'Break Down'
        })
        const vehicle = await createNewVehicle(seedVehicle)
        const gpsStops = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle.id
        })
        const stop1 = {
            ...seedStop,
            stopReasonId: reason1.id,
            gpsStopId: gpsStops.id
        }
        const stop2 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop3 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }

        await createStop(stop1, 20, 100)
        await createStop(stop2, 40, 60)
        await createStop(stop3, 25, 80)

        const actual = await getDurationStopAfterTo(from, to)
        expect(actual).toHaveLength(2)
        expect(actual).toContainEqual({
            durationInMillis: 30,
            stopReasonId: reason1.id
        })
        expect(actual).toContainEqual({
            durationInMillis: 35,
            stopReasonId: reason2.id
        })
    })

    test.skip('should get stops greater than from & to', async () => {
        const from = 50
        const to = 100
        const reason = await createNewReason(seedReason)
        const vehicle = await createNewVehicle(seedVehicle)
        const stop = {
            ...seedStop,
            stopReasonId: reason.id,
            vehicleId: vehicle.id
        }
        await createStop(stop, 10, 150)
        await createStop(stop, 30, 50)
        await createStop(stop, 20, 80)
        await createStop(stop, 40, 120)
        const actual = await getDurationGreaterThanFromTo(from, to)

        expect(actual).toHaveLength(2)
        expect(actual).toContainEqual({
            startTime: 10,
            endTime: 150,
            durationInMillis: 140,
            stopReasonId: reason.id
        })
        expect(actual).toContainEqual({
            startTime: 40,
            endTime: 120,
            durationInMillis: 80,
            stopReasonId: reason.id
        })
    })

    test('should get stops greater than from & to, agg the duration', async () => {
        const from = 50
        const to = 100
        const reason1 = await createNewReason(seedReason)
        const reason2 = await createNewReason({
            ...seedReason,
            name: 'Puncture'
        })
        const vehicle = await createNewVehicle(seedVehicle)
        const gpsStops = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle.id
        })
        const stop1 = {
            ...seedStop,
            stopReasonId: reason1.id,
            gpsStopId: gpsStops.id
        }
        const stop2 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop3 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop4 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }

        await createStop(stop1, 20, 110)
        await createStop(stop2, 5, 160)
        await createStop(stop3, 40, 180)
        await createStop(stop4, 20, 100)

        const actual = await getDurationGreaterThanFromTo(from, to)

        expect(actual).toHaveLength(2)
        expect(actual).toContainEqual({
            durationInMillis: 50,
            stopReasonId: reason1.id
        })
        expect(actual).toContainEqual({
            durationInMillis: 100,
            stopReasonId: reason2.id
        })
    })

    test('should get all stops with combined duration', async () => {
        const from = 50
        const to = 100
        const reason1 = await createNewReason(seedReason)
        const reason2 = await createNewReason({
            ...seedReason,
            name: 'Puncture'
        })
        const reason3 = await createNewReason({
            ...seedReason,
            name: 'Workshop'
        })
        const vehicle = await createNewVehicle(seedVehicle)
        const gpsStops = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle.id
        })
        const stop1 = {
            ...seedStop,
            stopReasonId: reason1.id,
            gpsStopId: gpsStops.id
        }
        const stop2 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop3 = {
            ...seedStop,
            stopReasonId: reason2.id,
            gpsStopId: gpsStops.id
        }
        const stop4 = {
            ...seedStop,
            stopReasonId: reason3.id,
            gpsStopId: gpsStops.id
        }

        await createStop(stop1, 60, 80)
        await createStop(stop2, 30, 80)
        await createStop(stop3, 80, 130)
        await createStop(stop4, 25, 125)

        const actual = await getCombinedDuration(from, to)
        expect(actual).toHaveLength(3)
        expect(actual).toContainEqual({
            durationInMillis: 20,
            stopReasonId: reason1.id
        })
        expect(actual).toContainEqual({
            durationInMillis: 50,
            stopReasonId: reason2.id
        })
        expect(actual).toContainEqual({
            durationInMillis: 50,
            stopReasonId: reason3.id
        })
    })
})
