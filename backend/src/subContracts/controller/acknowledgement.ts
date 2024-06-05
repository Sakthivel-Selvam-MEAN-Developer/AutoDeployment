import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getAllActivetripTripByTripStatus,
    getAllTripByAcknowledgementStatus,
    getOverAllTripById
} from '../models/overallTrip.ts'
import {
    updateUnloadWeightforTrip,
    updateUnloadingKilometer
} from '../models/loadingToUnloadingTrip.ts'
import { updateUnloadWeightForStockTrip } from '../models/stockPointToUnloadingPoint.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { create as createShortageQuantity } from '../models/shortageQuantity.ts'
import { updateStockunloadingKilometer } from '../models/loadingToStockPointTrip.ts'
import { allTrips, gstCalculation } from '../domain/gstDueLogic.ts'

export const listAllActivetripTripByTripStatus = (_req: Request, res: Response) => {
    getAllActivetripTripByTripStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listAllTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
const checkUnloadingPointTrip = (overallTrip: allTrips) => {
    if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        return overallTrip.loadingPointToUnloadingPointTrip.truck.transporter
    }
}
export const getTransporterName = (overallTrip: allTrips) => {
    if (overallTrip.stockPointToUnloadingPointTrip !== null) {
        return overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
            ? overallTrip.stockPointToUnloadingPointTrip?.loadingPointToStockPointTrip?.truck
                  .transporter
            : null
    }
    return checkUnloadingPointTrip(overallTrip)
}
export const updateAcknowledgementStatusforOverAllTrip = async (req: Request, res: Response) => {
    await closeAcknowledgementStatusforOverAllTrip(parseInt(req.params.id))
        .then(() => {
            res.sendStatus(200)
        })
        .catch(() => res.sendStatus(500))
}

export const OverAllTripById = (req: Request, res: Response) => {
    getOverAllTripById(parseInt(req.params.id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const closeTripById = async (req: Request, res: Response) => {
    await getOverAllTripById(req.body.overallTripId)
        .then(async (overAllTripData) => {
            let gstPercentage = null
            if (overAllTripData === null) return res.sendStatus(500)
            const transporter = getTransporterName(overAllTripData)
            if (transporter?.gstPercentage !== undefined) {
                gstPercentage = transporter?.gstPercentage
            }
            const shortage = {
                overallTripId: req.body.overallTripId,
                reason: req.body.reason,
                filledLoad: req.body.filledLoad,
                shortageAmount: req.body.shortageAmount,
                shortageQuantity: req.body.shortageQuantity,
                approvalStatus: req.body.approvalStatus,
                unloadedDate: req.body.unloadedDate,
                unloadedQuantity: req.body.unloadedQuantity
            }
            await createShortageQuantity(shortage)
            if (overAllTripData && overAllTripData.stockPointToUnloadingPointTrip !== null) {
                await updateUnloadWeightForStockTrip(
                    overAllTripData.stockPointToUnloadingPointTrip.id
                )
            } else if (
                overAllTripData &&
                overAllTripData?.loadingPointToUnloadingPointTrip !== null
            ) {
                await updateUnloadingKilometer(
                    overAllTripData.loadingPointToUnloadingPointTrip.id,
                    req.body.unloadingKilometer
                )
                await updateUnloadWeightforTrip(overAllTripData.loadingPointToUnloadingPointTrip.id)
            }
            if (overAllTripData && overAllTripData.loadingPointToStockPointTrip !== null) {
                await updateStockunloadingKilometer(
                    overAllTripData.loadingPointToStockPointTrip.id,
                    req.body.unloadingKilometer
                )
            }
            await gstCalculation(shortage, gstPercentage, overAllTripData).then(async (gstDue) => {
                if (gstDue === undefined) return res.sendStatus(200)
                await createPaymentDues(gstDue)
            })
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
