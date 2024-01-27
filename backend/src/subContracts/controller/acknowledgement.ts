import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getOverAllTripByAcknowledgementStatus,
    getOverAllTripById
} from '../models/overallTrip.ts'
import { updateUnloadWeightforTrip } from '../models/loadingToUnloadingTrip.ts'
import { updateUnloadWeightForStockTrip } from '../models/stockPointToUnloadingPoint.ts'
import finalDueLogic from '../domain/finalDueLogic.ts'
import { create as createPaymentDues, getDueByOverallTripId } from '../models/paymentDues.ts'

export const listAllActivetripTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getOverAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateAcknowledgementStatusforOverAllTrip = async (req: Request, res: Response) => {
    await closeAcknowledgementStatusforOverAllTrip(parseInt(req.params.id))
        .then(async (overallTrip) => {
            const paymentDueDetails = await getDueByOverallTripId(overallTrip.id)
            await finalDueLogic(overallTrip, paymentDueDetails).then((data) =>
                createPaymentDues(data)
            )
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}

export const OverAllTripById = (req: Request, res: Response) => {
    getOverAllTripById(parseInt(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const closeTripById = async (req: Request, res: Response) => {
    await getOverAllTripById(req.body.id)
        .then(async (overAllTripData) => {
            if (
                overAllTripData &&
                overAllTripData?.stockPointToUnloadingPointTrip !== null &&
                overAllTripData.stockPointToUnloadingPointTripId
            ) {
                await updateUnloadWeightForStockTrip(
                    overAllTripData.stockPointToUnloadingPointTrip.id,
                    req.body.unload
                )
            } else if (
                overAllTripData &&
                overAllTripData?.loadingPointToUnloadingPointTrip !== null &&
                overAllTripData.loadingPointToUnloadingPointTrip
            ) {
                await updateUnloadWeightforTrip(
                    overAllTripData.loadingPointToUnloadingPointTrip.id,
                    req.body.unload
                )
            }
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
