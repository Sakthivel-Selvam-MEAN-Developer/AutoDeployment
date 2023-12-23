import {
    getLoconavByVehicleNumber,
    loconavDeviceByVehicleNumber
} from '../../models/loconavDevice.ts'
import getMovements from '../../httpClient/loconav/getMovements.ts'
import { LoconavMovement } from '../../httpClient/loconav/loconavMovement.ts'
import computeStops, { RawStop } from '../computeStops.ts'
import { createMany } from '../../models/gpsStop.ts'
// import { createMany as createMovements } from '../../models/movement.ts'

const fetchMovementFromLoconav = (
    from: number,
    to: number,
    loconavDevice: loconavDeviceByVehicleNumber
) => getMovements(loconavDevice.loconavDeviceId, from, to, loconavDevice.loconavToken)

const convertToGenericFormat = (loconavMovements: LoconavMovement[]) =>
    loconavMovements.map((loconavMovement) => {
        const { time, speed, longitude, latitude } = loconavMovement
        return { time, speed, longitude, latitude }
    })
const enrichStops = (rawStops: RawStop[], vehicleId: number, source: string) =>
    rawStops.map((stop) => ({ ...stop, vehicleId, source }))

export const fetchMovements = async (from: number, to: number, vehicleNumber: string) => {
    const deviceClient = await getLoconavByVehicleNumber(vehicleNumber)
    const loconavMovements = await fetchMovementFromLoconav(from, to, deviceClient)
    const movementsInGenericFormat = convertToGenericFormat(loconavMovements)
    const rawStops = computeStops(movementsInGenericFormat)
    const gpsStop = enrichStops(rawStops, deviceClient.vehicle.id, 'loconav')
    await createMany(gpsStop)
    // await createMovements(genericFormat)
}
