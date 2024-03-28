import { Request, Response } from 'express'
import { getDefaultReason } from '../models/stopReason.ts'
import { groupByStopReason } from '../models/stops/stops.crud.ts'
import { getGpsStops } from '../models/gpsStop.ts'
import { getAllVehicles } from '../models/vehicle.ts'

function groupNumber(groupedData: any[], gpsStopIdToVehicleId: any, vehicleDataMap: any) {
    return groupedData.reduce((acc, entry) => {
        const { gpsStopId } = entry
        const vehicleId = gpsStopIdToVehicleId.get(gpsStopId)
        const vehicleData = vehicleDataMap.get(vehicleId)
        if (!acc[vehicleId]) {
            acc[vehicleId] = {
                number: vehicleData.number,
                _count: 0
            }
        }
        // eslint-disable-next-line no-underscore-dangle
        acc[vehicleId]._count += entry._count
        return acc
    }, {})
}

const mapNumberToVehicle = async (groupedData: any[]) => {
    const gpsStop = await getGpsStops()
    const gpsStopIdToVehicleId = new Map()
    gpsStop.forEach((stop) => gpsStopIdToVehicleId.set(stop.id, stop.vehicleId))
    const vehicleData = await getAllVehicles()
    const vehicleDataMap = new Map(vehicleData.map((vehicle) => [vehicle.id, vehicle]))
    const result = groupNumber(groupedData, gpsStopIdToVehicleId, vehicleDataMap)
    return Object.values(result)
}

export const pendingStopReason = (_req: Request, res: Response) => {
    getDefaultReason()
        .then(({ id }: any) => groupByStopReason(id))
        .then(mapNumberToVehicle)
        .then((data) => res.status(200).json(data))
}
