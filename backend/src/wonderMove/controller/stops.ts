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
import { Request, Response } from "express";

interface AggregatedStop {
    stopReasonId: number;
}
interface Reason {
    id: number;
}

export const create = (req: Request, res: Response) => {
    createInDb(req.body).then(() => res.sendStatus(200))
}

export const getDetails = (req: Request, res: Response) => {
    getDetailsFromDb(req.params.number).then((detail) => {
        res.status(200).json(detail)
    })
}

const mapNamesToReason = async (aggregatedStops: AggregatedStop[]): Promise<AggregatedStop[]> => {
    const reasons: Reason[] = await getAllReason()
    return aggregatedStops.map((item) => {
        const { name }: any = reasons.find(
            (reason) => reason.id === item.stopReasonId
        )
        return { ...item, name }
    })
}

export const stopDurations = (req: Request, res: Response) => {
    getCombinedDuration(parseInt(req.query.from as string), parseInt(req.query.to as string))
        .then(mapNamesToReason)
        .then((data) => {
            res.status(200).json(data)
        })
}

export const updateStopsDb = (req: Request, res: Response) => {
    updateStopReason(parseInt(req.params.id as string), req.body.stopReasonId).then(
        (data) => {
            res.status(200).json(data)
        }
    )
}
const mapNumberToVehicle = async (aggregatedReason: any[]) => {
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
