import { getLoconavByVehicleNumber } from '../../models/loconavDevice.ts'
import getMovements from '../../httpClient/loconav/getMovements.ts'
import { LoconavMovement } from '../../httpClient/loconav/loconavMovement.ts'
import { Movement } from '../computeStops.ts'
import { saveStops } from '../saveStops.ts'

const fetchMovementFromLoconav = (from: number, to: number, loconavDevice: any) =>
    getMovements(loconavDevice.loconavDeviceId, from, to, loconavDevice.loconavToken)

const convertToGenericFormat = (
    loconavMovements: LoconavMovement[],
    vehicleId: number,
    source: string
): Movement[] =>
    loconavMovements.map((loconavMovement) => {
        const { time, speed, longitude, latitude } = loconavMovement
        return { eventTime: time, speed, longitude, latitude, vehicleId, source }
    })

export const fetchMovements = async (from: number, to: number, vehicleNumber: string) => {
    const deviceClient = await getLoconavByVehicleNumber(vehicleNumber)
    const loconavMovements = await fetchMovementFromLoconav(from, to, deviceClient)
    const movementsInGenericFormat = convertToGenericFormat(
        loconavMovements,
        deviceClient.vehicle.id,
        'loconav'
    )
    await saveStops(movementsInGenericFormat, deviceClient.vehicle.id, 'loconav')
}
