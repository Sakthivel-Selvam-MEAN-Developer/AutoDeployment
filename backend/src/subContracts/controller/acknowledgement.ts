import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getAllActivetripTripByTripStatus,
    getAllTripByAcknowledgementStatus,
    getOverAllTripById
} from '../models/overallTrip.ts'
import { updateUnloadWeightforTrip } from '../models/loadingToUnloadingTrip.ts'
import { updateUnloadWeightForStockTrip } from '../models/stockPointToUnloadingPoint.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { create as createShortageQuantity } from '../models/shortageQuantity.ts'
import { allTrips, gstCalculation } from '../domain/gstDueLogic.ts'
import { shortageAmountCalculation } from '../domain/shortageLogic.ts'

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
        return overallTrip.loadingPointToUnloadingPointTrip
    }
}
export const getTrip = (overallTrip: any) => {
    if (overallTrip.stockPointToUnloadingPointTrip !== null) {
        return overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
            ? overallTrip.stockPointToUnloadingPointTrip?.loadingPointToStockPointTrip
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
type shortCal = (filledLoad: number | boolean | undefined, unload: number) => number | false
export const shotageCalculation: shortCal = (filledLoad, unload) => {
    if (typeof filledLoad === 'number') {
        return shortageAmountCalculation(filledLoad as number, unload)
    }
    return false
}
export const closeTripById = async (req: Request, res: Response) => {
    await getOverAllTripById(req.body.overallTripId)
        .then(async (overAllTripData) => {
            let gstPercentage = null
            if (overAllTripData === null) return res.sendStatus(500)
            const getTripDetails = getTrip(overAllTripData)
            if (overAllTripData?.truck?.transporter.gstPercentage !== undefined) {
                gstPercentage = overAllTripData.truck.transporter.gstPercentage
            }
            let shortageAmount: number | boolean = false
            if (req.body.approvalStatus !== true) {
                shortageAmount = shotageCalculation(
                    getTripDetails?.filledLoad,
                    req.body.unloadedQuantity
                )
                if (shortageAmount === false) {
                    shortageAmount = 0
                }
            }
            const shortage = {
                overallTripId: req.body.overallTripId,
                reason: req.body.reason,
                filledLoad: req.body.filledLoad,
                shortageAmount: shortageAmount || 0,
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
                await updateUnloadWeightforTrip(overAllTripData.loadingPointToUnloadingPointTrip.id)
            }
            await gstCalculation(shortage, gstPercentage, overAllTripData).then(async (gstDue) => {
                if (gstDue === undefined) return res.sendStatus(200)
                await createPaymentDues(gstDue)
            })
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
