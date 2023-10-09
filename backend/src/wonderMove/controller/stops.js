import { getCombinedDuration } from '../models/stops/stopsReports'
import { getAllReason, getDefaultReason } from '../models/stopReason'
import { getAllVehicles } from '../models/vehicle'
import {
    allPendingStopsForSingleVehicle,
    create as createInDb,
    fetchStopsByVehicle as getDetailsFromDb,
    getVehicleDetailByReason,
    updateStopReason
} from '../models/stops/stops.crud'

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(res.send(200))
}

export const getDetails = (req: Request, res: Response) => {
    getDetailsFromDb(req.params.number).then((detail) => {
        res.status(200).json(detail)
    })
}

const mapNamesToReason = async (aggregatedStops) => {
    const reasons = await getAllReason()
    return aggregatedStops.map((item) => {
        const { name } = reasons.find(
            (reason) => reason.id === item.stopReasonId
        )
        return { ...item, name }
    })
}

export const stopDurations = (req: Request, res: Response) => {
    getCombinedDuration(
        parseInt(req.query.from, 10),
        parseInt(req.query.to, 10)
    )
        .then(mapNamesToReason)
        .then((data) => {
            res.status(200).json(data)
        })
}

export const updateStopsDb = (req: Request, res: Response) => {
    updateStopReason(parseInt(req.params.id, 10), req.body.stopReasonId).then(
        (data) => {
            res.status(200).json(data)
        }
    )
}
const mapNumberToVehicle = async (aggregatedReason) => {
    const numbers = await getAllVehicles()
    return aggregatedReason.map((item) => {
        const { number } = numbers.find(
            (vehicle) => vehicle.id === item.vehicleId
        )
        return { ...item, number }
    })
}
export const pendingStopReason = (req: Request, res: Response) => {
    getDefaultReason()
        .then(({ id }) => getVehicleDetailByReason(id))
        .then(mapNumberToVehicle)
        .then((data) => {
            res.status(200).json(data)
        })
}
export const allPendingSRforSingleVehicle = (req: Request, res: Response) => {
    allPendingStopsForSingleVehicle(req.params.number).then((detail) => {
        res.status(200).json(detail)
    })
}
