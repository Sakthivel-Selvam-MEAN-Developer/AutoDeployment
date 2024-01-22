import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getOverAllTripByAcknowledgementStatus,
    getOverAllTripById
} from '../models/overallTrip.ts'
import { closeTrip, updateUnloadWeightforTrip } from '../models/loadingToUnloadingTrip.ts'
import {
    closeUnloadingTrip,
    updateUnloadWeightForStockTrip
} from '../models/stockPointToUnloadingPoint.ts'

export const listAllActivetripTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getOverAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateAcknowledgementStatusforOverAllTrip = (req: Request, res: Response) => {
    closeAcknowledgementStatusforOverAllTrip(parseInt(req.params.id))
        .then(() => {
            // console.log(data)
            res.status(200)
        })
        .catch(() => res.status(500))
}

export const OverAllTripById = (req: Request, res: Response) => {
    getOverAllTripById(parseInt(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const closeTripById = async (req: Request, res: Response) => {
    await getOverAllTripById(req.body.id)
        .then(async (overAllTripData) => {
            if (overAllTripData && overAllTripData?.stockPointToUnloadingPointTrip !== null) {
                await updateUnloadWeightForStockTrip(
                    overAllTripData.stockPointToUnloadingPointTrip.id,
                    req.body.unload
                )
                await closeUnloadingTrip(overAllTripData.stockPointToUnloadingPointTrip.id)
            } else if (
                overAllTripData &&
                overAllTripData?.loadingPointToUnloadingPointTrip !== null
            ) {
                await updateUnloadWeightforTrip(
                    overAllTripData.loadingPointToUnloadingPointTrip.id,
                    req.body.unload
                )
                await closeTrip(overAllTripData.loadingPointToUnloadingPointTrip.id)
            }
        })
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
