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
import { getPercentageByTransporter } from '../models/transporter.ts'
import gstDueLogic from '../domain/gstDueLogic.ts'

export const listAllActivetripTripToByAcknowledgementStatus = (_req: Request, res: Response) => {
    getOverAllTripByAcknowledgementStatus()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
const getTransporterName = (overallTrip: any) => {
    let transporterName = ''
    if (overallTrip.stockPointToUnloadingPointTrip !== null) {
        transporterName =
            overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip !== null
                ? overallTrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.truck
                      .transporter.name
                : ''
    } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
        transporterName =
            overallTrip.loadingPointToUnloadingPointTrip !== null
                ? overallTrip.loadingPointToUnloadingPointTrip.truck.transporter.name
                : ''
    }
    return transporterName
}

export const updateAcknowledgementStatusforOverAllTrip = async (req: Request, res: Response) => {
    await closeAcknowledgementStatusforOverAllTrip(parseInt(req.params.id))
        .then(async (overallTrip) => {
            const transporterName = getTransporterName(overallTrip)
            const { tdsPercentage } = (await getPercentageByTransporter(transporterName)) || {
                tdsPercentage: null
            }
            const paymentDueDetails = await getDueByOverallTripId(overallTrip.id)
            const { shortageAmount } = (await getShortageQuantityByOverallTripId(
                overallTrip.id
            )) || { shortageAmount: 0 }
            if (
                paymentDueDetails.length === 0 ||
                overallTrip.loadingPointToUnloadingPointTrip?.truck.transporter.transporterType ===
                    'Own' ||
                overallTrip.loadingPointToStockPointTrip?.totalTransporterAmount !== 0
            ) {
                return finalDueLogic(
                    overallTrip,
                    paymentDueDetails,
                    shortageAmount,
                    tdsPercentage
                ).then((finalDue) => {
                    if (finalDue !== null) {
                        return createPaymentDues(finalDue)
                    }
                })
            }
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
            let transporterAmount
            const transporterName = getTransporterName(overAllTripData)
            const { gstPercentage } = (await getPercentageByTransporter(transporterName)) || {
                gstPercentage: null
            }
            await createShortageQuantity(req.body)

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
                        (overAllTripData.stockPointToUnloadingPointTrip.transporterAmount +
                            overAllTripData.loadingPointToStockPointTrip.transporterAmount) *
                        (req.body.unloadedQuantity / 1000)
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
                        overAllTripData.loadingPointToUnloadingPointTrip.transporterAmount *
                        (req.body.unloadedQuantity / 1000)
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
