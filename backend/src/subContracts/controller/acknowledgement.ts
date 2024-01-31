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
import {
    create as createShortageQuantity,
    getShortageQuantityByOverallTripId
} from '../models/shortageQuantity.ts'
import { getTransporterByName } from '../models/transporter.ts'

export const listAllActivetripTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getOverAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updateAcknowledgementStatusforOverAllTrip = async (req: Request, res: Response) => {
    await closeAcknowledgementStatusforOverAllTrip(parseInt(req.params.id))
        .then(async (overallTrip) => {
            let transporterName = ''
            if (overallTrip.stockPointToUnloadingPointTrip !== null) {
                transporterName =
                    overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
                        ? overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                              .truck.transporter.name
                        : ''
            } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
                transporterName =
                    overallTrip.loadingPointToUnloadingPointTrip !== null
                        ? overallTrip.loadingPointToUnloadingPointTrip.truck.transporter.name
                        : ''
            }
            const { tdsPercentage } = (await getTransporterByName(transporterName)) || {
                tdsPercentage: 0
            }
            const paymentDueDetails = await getDueByOverallTripId(overallTrip.id)
            const { shortageAmount } = (await getShortageQuantityByOverallTripId(
                overallTrip.id
            )) || { shortageAmount: 0 }
            await finalDueLogic(overallTrip, paymentDueDetails, shortageAmount, tdsPercentage).then(
                (data) => createPaymentDues(data)
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
    await getOverAllTripById(req.body.overallTripId)
        .then(async (overAllTripData) => {
            await createShortageQuantity(req.body)
            if (
                overAllTripData &&
                overAllTripData?.stockPointToUnloadingPointTrip !== null &&
                overAllTripData.stockPointToUnloadingPointTripId
            ) {
                await updateUnloadWeightForStockTrip(
                    overAllTripData.stockPointToUnloadingPointTrip.id
                )
            } else if (
                overAllTripData &&
                overAllTripData?.loadingPointToUnloadingPointTrip !== null &&
                overAllTripData.loadingPointToUnloadingPointTrip
            ) {
                await updateUnloadWeightforTrip(overAllTripData.loadingPointToUnloadingPointTrip.id)
            }
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
