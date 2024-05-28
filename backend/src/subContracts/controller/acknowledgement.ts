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
import { getPercentageByTransporter } from '../models/transporter.ts'
import { updateStockunloadingKilometer } from '../models/loadingToStockPointTrip.ts'
import gstDueLogic from '../domain/gstDueLogic.ts'

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
export const getTransporterName = (overallTrip: any) => {
    if (overallTrip.stockPointToUnloadingPointTrip !== null) {
        return overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
            ? overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.truck
                  .transporter.name
            : ''
    }
    if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        return overallTrip.loadingPointToUnloadingPointTrip.truck.transporter.name
    }
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
            let transporterAmount
            const transporterName = getTransporterName(overAllTripData)
            const { gstPercentage } = (await getPercentageByTransporter(transporterName)) || {
                gstPercentage: null
            }
            const newObj = {
                approvalStatus: req.body.approvalStatus,
                filledLoad: req.body.filledLoad,
                overallTripId: req.body.overallTripId,
                reason: req.body.reason,
                shortageAmount: req.body.shortageAmount,
                shortageQuantity: req.body.shortageQuantity,
                unloadedDate: req.body.unloadedDate,
                unloadedQuantity: req.body.unloadedQuantity
            }
            await createShortageQuantity(newObj)

            if (
                overAllTripData &&
                overAllTripData?.stockPointToUnloadingPointTrip !== null &&
                overAllTripData?.loadingPointToStockPointTrip !== null &&
                overAllTripData.stockPointToUnloadingPointTripId
            ) {
                if (req.body.approvalStatus) {
                    transporterAmount =
                        overAllTripData.stockPointToUnloadingPointTrip.totalTransporterAmount +
                        overAllTripData.loadingPointToStockPointTrip.totalTransporterAmount
                } else {
                    transporterAmount =
                        overAllTripData.stockPointToUnloadingPointTrip.totalTransporterAmount +
                        overAllTripData.loadingPointToStockPointTrip.totalTransporterAmount -
                        req.body.shortageAmount
                }
                const vehicleNumber =
                    overAllTripData.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                        ?.truck.vehicleNumber
                await updateUnloadWeightForStockTrip(
                    overAllTripData.stockPointToUnloadingPointTrip.id
                )
                if (gstPercentage !== null) {
                    await gstDueLogic(
                        gstPercentage,
                        transporterAmount,
                        transporterName,
                        vehicleNumber,
                        req.body.overallTripId
                    ).then((gstDue) => createPaymentDues(gstDue))
                }
            } else if (
                overAllTripData &&
                overAllTripData?.loadingPointToUnloadingPointTrip !== null &&
                overAllTripData.loadingPointToUnloadingPointTrip
            ) {
                if (req.body.approvalStatus) {
                    transporterAmount =
                        overAllTripData.loadingPointToUnloadingPointTrip.totalTransporterAmount
                } else {
                    transporterAmount =
                        overAllTripData.loadingPointToUnloadingPointTrip.totalTransporterAmount -
                        req.body.shortageAmount
                }
                if (overAllTripData && overAllTripData.loadingPointToStockPointTrip !== null) {
                    await updateStockunloadingKilometer(
                        overAllTripData.loadingPointToStockPointTrip.id,
                        req.body.unloadingKilometer
                    )
                } else {
                    await updateUnloadingKilometer(
                        overAllTripData.loadingPointToUnloadingPointTrip.id,
                        req.body.unloadingKilometer
                    )
                }
                const vehicleNumber =
                    overAllTripData.loadingPointToUnloadingPointTrip?.truck.vehicleNumber
                await updateUnloadWeightforTrip(overAllTripData.loadingPointToUnloadingPointTrip.id)
                if (gstPercentage !== null) {
                    await gstDueLogic(
                        gstPercentage,
                        transporterAmount,
                        transporterName,
                        vehicleNumber,
                        req.body.overallTripId
                    ).then((gstDue) => createPaymentDues(gstDue))
                }
            }
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
