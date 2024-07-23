import { Request, Response } from 'express'
import {
    closeAcknowledgementStatusforOverAllTrip,
    getAcknowledgementFile,
    getAllActivetripTripByTripStatus,
    getAllTripByAcknowledgementStatus,
    getOverAllTripById,
    uploadAcknowledgementFile
} from '../models/overallTrip.ts'
import { updateUnloadWeightforTrip } from '../models/loadingToUnloadingTrip.ts'
import { updateUnloadWeightForStockTrip } from '../models/stockPointToUnloadingPoint.ts'
import { create as createShortageQuantity } from '../models/shortageQuantity.ts'
import { shortageAmountCalculation } from '../domain/shortageLogic.ts'
import { allTrips } from '../domain/types.ts'
import { getFileFromS3 } from './acknowledgementGet.ts'
export interface S3File extends Express.MulterS3.File {
    location: string
}
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
            if (overAllTripData === null) throw new Error('Overall Trip Is Empty')
            const getTripDetails = getTrip(overAllTripData)
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
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
export const acknowledgementFileUpload = async (req: Request, res: Response) => {
    const file = req.file as S3File
    if (file?.location !== undefined) {
        await uploadAcknowledgementFile(parseInt(req.body.id), file?.location)
            .then((data) => res.status(200).json(data))
            .catch(() => res.status(500))
    }
}
export const acknowledgementFileGet = async (req: Request, res: Response) => {
    const bucketName = req.query.bucketName as string
    const fileName = req.query.fileName as string
    await getFileFromS3(bucketName, fileName)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(() => res.status(500).json({ error: 'Error Getting data' }))
}
export const getAcknowledgementFileByOverallTripId = async (req: Request, res: Response) => {
    const id = req.query.id as string
    await getAcknowledgementFile(parseInt(id))
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}
