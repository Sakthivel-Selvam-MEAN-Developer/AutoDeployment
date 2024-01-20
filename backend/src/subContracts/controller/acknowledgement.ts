import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getOverAllTripByAcknowledgementStatus,
    getOverAllTripById
} from '../models/overallTrip.ts'
import { closeTrip } from '../models/loadingToUnloadingTrip.ts'
import { closeStockTrip } from '../models/loadingToStockPointTrip.ts'

export const listAllActivetripTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getOverAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateAcknowledgementStatusforOverAllTrip = (req: Request, res: Response) => {
    closeAcknowledgementStatusforOverAllTrip(req.body.id)
        .then((data) => res.status(200).json(data))
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
            if (overAllTripData && overAllTripData?.loadingPointToStockPointTrip !== null) {
                await closeStockTrip(overAllTripData.loadingPointToStockPointTrip.id)
            } else if (
                overAllTripData &&
                overAllTripData?.loadingPointToUnloadingPointTrip !== null
            ) {
                await closeTrip(overAllTripData.loadingPointToUnloadingPointTrip.id)
            }
        })
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
