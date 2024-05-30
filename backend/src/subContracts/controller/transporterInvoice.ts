import { Request, Response } from 'express'
import { getTripByTransporterInvoice, updateTransporterInvoice } from '../models/overallTrip.ts'
import finalDueLogic from '../domain/finalDueLogic.ts'
import { create as createPaymentDues, getDueByOverallTripId } from '../models/paymentDues.ts'
import { getTransporterName } from './acknowledgement.ts'
import { getPercentageByTransporter } from '../models/transporter.ts'
import { getShortageQuantityByOverallTripId } from '../models/shortageQuantity.ts'

export const listTripByTransporterInvoice = (_req: Request, res: Response) => {
    getTripByTransporterInvoice()
        .then((data) => res.status(200).json(data))
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
export const updateTransporterInvoiceinTrip = (req: Request, res: Response) => {
    updateTransporterInvoice(req.body.invoice, req.body.id)
        .then(async (data) => {
            if (data.acknowledgementStatus === false) return res.status(200).json(data)
            const finalPay = data.paymentDues.filter((due) => due.type === 'final pay')
            if (finalPay.length > 0) {
                return res.status(200).json(data)
            }
            await finalDueCreation(data, res)
        })
        .catch(() => res.status(500))
}
