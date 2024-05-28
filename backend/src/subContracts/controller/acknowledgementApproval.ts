import { Request, Response } from 'express'
import {
    getTripForAcknowlegementApproval,
    updateAcknowledgementApproval
} from '../models/overallTrip.ts'
import { getTransporterName } from './acknowledgement.ts'
import { getPercentageByTransporter } from '../models/transporter.ts'
import { getDueByOverallTripId, create as createPaymentDues } from '../models/paymentDues.ts'
import {
    getShortageQuantityByOverallTripId,
    updateShortageInOverallTrip
} from '../models/shortageQuantity.ts'
import finalDueLogic from '../domain/finalDueLogic.ts'
import { calculateShortage } from '../domain/shortageLogic.ts'

export const listTripForAcknowlegementApproval = (_req: Request, res: Response) => {
    getTripForAcknowlegementApproval()
        .then((data) => {
            const filteredData = data.filter((trip) => {
                const finalpay = trip.paymentDues.filter(({ type }) => type === 'final pay')
                return finalpay.length === 0
            })
            res.status(200).json(filteredData)
        })
        .catch(() => res.status(500))
}
const finalDueCreation = async (overallTrip: any, res: Response) => {
    const transporterName = getTransporterName(overallTrip)
    const { tdsPercentage } = (await getPercentageByTransporter(transporterName)) || {
        tdsPercentage: null
    }
    const paymentDueDetails = await getDueByOverallTripId(overallTrip.id)
    const { shortageAmount } = (await getShortageQuantityByOverallTripId(overallTrip.id)) || {
        shortageAmount: 0
    }
    if (overallTrip.loadingPointToUnloadingPointTrip?.truck.transporter.transporterType !== 'Own') {
        if (
            overallTrip.stockPointToUnloadingPointTrip?.loadingPointToStockPointTrip?.truck
                .transporter.transporterType !== 'Own'
        ) {
            return finalDueLogic(
                overallTrip,
                paymentDueDetails,
                shortageAmount,
                tdsPercentage
            ).then((finalDue) => {
                if (finalDue !== null && finalDue !== undefined) {
                    return createPaymentDues(finalDue).then(() =>
                        res.status(200).json({ ...finalDue[0], id: finalDue[0].overallTripId })
                    )
                }
            })
        }
    }
}

export const approveAcknowledgement = async (req: Request, res: Response) => {
    const shortage = await getShortageQuantityByOverallTripId(req.body.id)
    if (shortage === null) return res.status(500)
    if (req.body.unloadedQuantity !== shortage?.unloadedQuantity) {
        const newShortage = calculateShortage(req.body.unloadedQuantity, shortage)
        await updateShortageInOverallTrip(req.body.id, newShortage)
    }
    updateAcknowledgementApproval(req.body.id)
        .then(async (data) => {
            await finalDueCreation(data, res)
            res.status(200).json(data)
        })
        .catch(() => res.status(500))
}
