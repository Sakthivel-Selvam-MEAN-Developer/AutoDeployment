import seedStop from 'apps/wonderMove/seed/stops'
import seedVehicle from 'apps/wonderMove/seed/vehicle'
import seedReason from 'apps/wonderMove/seed/reason'
import seedStopWithoutDependency from 'apps/wonderMove/seed/stopsWithoutDependency'
import seedGpsStopsWithoutDep from 'apps/wonderMove/seed/gpsStopsWithoutDependency'
import gpsStops from 'apps/wonderMove/seed/gpsStops'
import { create as createNewReason } from '../stopReason'
import { create as createNewVehicle, getAllVehicles } from '../vehicle'
import { create as createGpsStop } from '../gpsStop'
import {
    allPendingStopsForSingleVehicle,
    create,
    overrideStops,
    fetchStopsByVehicle,
    getVehicleDetailByReason,
    updateStopReason
} from './stops.crud'

describe('Stop model', () => {
    test('should fetch stops by vehicle number', async () => {
        await create(seedStop)
        const actual = await fetchStopsByVehicle(
            seedStop.gpsStop.create.vehicle.create.number
        )
        expect(actual.length).toBe(1)
        expect(actual[0].durationInMillis).toBe(seedStop.durationInMillis)
    })
    test('should exclude inactive stops in fetch stops by vehicle number ', async () => {
        await create({ ...seedStop, active: false })
        const actual = await fetchStopsByVehicle(
            seedStop.gpsStop.create.vehicle.create.number
        )
        expect(actual.length).toBe(0)
    })
    test('should get vehicle details by reason', async () => {
        const vehicleToSearch = await createNewVehicle(seedVehicle)
        const secondVehicleForSearch = await createNewVehicle({
            ...seedVehicle,
            number: 'tn93d5512'
        })
        const reasonToSearch = await createNewReason(seedReason)
        const reasonToExclude = await createNewReason({
            ...seedReason,
            name: 'Reason Not Updated'
        })
        const gpsStopToSearch = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicleToSearch.id
        })
        const secondGpsStopForSearch = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: secondVehicleForSearch.id
        })
        const stopExpected = {
            ...seedStopWithoutDependency,
            stopReasonId: reasonToSearch.id,
            gpsStopId: gpsStopToSearch.id
        }
        const stopExpectedForSecondVehicle = {
            ...seedStopWithoutDependency,
            stopReasonId: reasonToSearch.id,
            gpsStopId: secondGpsStopForSearch.id
        }
        const stopToExcludeByReason = {
            ...seedStopWithoutDependency,
            stopReasonId: reasonToExclude.id,
            gpsStopId: gpsStopToSearch.id
        }
        const stopToExcludeByReasonForSecondVehicle = {
            ...seedStopWithoutDependency,
            stopReasonId: reasonToExclude.id,
            gpsStopId: secondGpsStopForSearch.id
        }
        await create({ ...stopExpected, startTime: 120, endTime: 80 })
        await create({ ...stopToExcludeByReason, startTime: 140 })
        await create({
            ...stopExpectedForSecondVehicle,
            startTime: 160,
            endTime: 180
        })
        await create({
            ...stopToExcludeByReasonForSecondVehicle,
            startTime: 180
        })
        const actual = await getVehicleDetailByReason(reasonToSearch.id)
        expect(actual).toHaveLength(2)
        expect(actual).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    stopReasonId: reasonToSearch.id,
                    startTime: 120,
                    endTime: 80
                }),
                expect.objectContaining({
                    stopReasonId: reasonToSearch.id,
                    startTime: 160,
                    endTime: 180
                })
            ])
        )
    })
    test('should exclude inactive stops in get vehicle details by reason', async () => {
        const vehicleToSearch = await createNewVehicle(seedVehicle)
        const reasonToSearch = await createNewReason(seedReason)
        const gpsStopToSearch = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicleToSearch.id
        })
        const inactiveStop = {
            ...seedStopWithoutDependency,
            stopReasonId: reasonToSearch.id,
            gpsStopId: gpsStopToSearch.id,
            active: false
        }
        await create({ ...inactiveStop, startTime: 120, endTime: 80 })
        const actual = await getVehicleDetailByReason(reasonToSearch.id)
        expect(actual).toHaveLength(0)
    })
    test('should get all pending stop reasons for single vehicle', async () => {
        const reason1 = await createNewReason(seedReason)
        const reason2 = await createNewReason({
            ...seedReason,
            name: 'Reason Not Updated'
        })
        const vehicle = await createNewVehicle(seedVehicle)
        const vehicle1 = await createNewVehicle({
            ...seedVehicle,
            number: 'tn93d5512'
        })
        const gpsStop1 = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle.id
        })
        const gpsStop2 = await createGpsStop({
            ...seedGpsStopsWithoutDep,
            vehicleId: vehicle1.id
        })
        const stop1 = {
            ...seedStopWithoutDependency,
            stopReasonId: reason1.id,
            gpsStopId: gpsStop1.id
        }
        const stop2 = {
            ...seedStopWithoutDependency,
            stopReasonId: reason2.id,
            gpsStopId: gpsStop1.id
        }
        const stop3 = {
            ...seedStopWithoutDependency,
            stopReasonId: reason2.id,
            gpsStopId: gpsStop1.id
        }
        const stop4 = {
            ...seedStopWithoutDependency,
            stopReasonId: reason2.id,
            gpsStopId: gpsStop2.id
        }
        await create(stop1)
        await create({ ...stop2, startTime: 100 })
        await create({ ...stop3, startTime: 150 })
        await create(stop4)
        const actual = await allPendingStopsForSingleVehicle('tn33ba1234')
        expect(actual).toHaveLength(2)
        expect(actual).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    gpsStopId: gpsStop1.id,
                    stopReasonId: reason2.id,
                    startTime: 100
                }),
                expect.objectContaining({
                    gpsStopId: gpsStop1.id,
                    stopReasonId: reason2.id,
                    startTime: 150
                })
            ])
        )
    })
    test('should update stop reason details', async () => {
        const stop = await create(seedStop)
        const newReasonName = 'driver food break'
        const newReason = await createNewReason({
            ...seedReason,
            name: newReasonName
        })
        await updateStopReason(stop.id, newReason.id)
        const actual = await fetchStopsByVehicle(
            seedStop.gpsStop.create.vehicle.create.number
        )
        expect(actual[0].reason.name).toBe(newReasonName)
    })
    test('should override existing stops with new set of stops by gpsStop', async () => {
        const gpsStopsCreated = await createGpsStop(gpsStops)
        const reason = await createNewReason(seedReason)
        const vehicles = await getAllVehicles()
        await create({
            ...seedStopWithoutDependency,
            startTime: 20,
            endTime: 40,
            durationInMillis: 20,
            gpsStopId: gpsStopsCreated.id,
            stopReasonId: reason.id
        })
        await create({
            ...seedStopWithoutDependency,
            startTime: 40,
            endTime: 60,
            durationInMillis: 20,
            gpsStopId: gpsStopsCreated.id,
            stopReasonId: reason.id
        })
        await overrideStops(gpsStopsCreated.id, [
            {
                startTime: 20,
                endTime: 60,
                durationInMillis: 40,
                stopReasonId: reason.id,
                gpsStopId: gpsStopsCreated.id
            }
        ])
        const newStops = await fetchStopsByVehicle(vehicles[0].number)
        expect(newStops).toHaveLength(1)
        expect(newStops[0].durationInMillis).toBe(40)
    })
})
