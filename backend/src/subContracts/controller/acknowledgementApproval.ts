import { Request, Response } from 'express'
import {
    getTripForAcknowlegementApproval,
    updateAcknowledgementApproval
} from '../models/overallTrip.ts'
import {
    getShortageQuantityByOverallTripId,
    updateShortageInOverallTrip
} from '../models/shortageQuantity.ts'
import { calculateShortage } from '../domain/shortageLogic.ts'

export const listTripForAcknowlegementApproval = (_req: Request, res: Response) => {
    getTripForAcknowlegementApproval()
        .then((data) => {
            const tripDetails = data.map((trip) => {
                const pay = trip.paymentDues.filter((due) => due.type === 'final pay')
                return pay.length === 0 ? trip : null
            })
            res.status(200).json(tripDetails)
        })
        .catch(() => res.status(500))
}
export const approveAcknowledgement = async (req: Request, res: Response) => {
    const shortage = await getShortageQuantityByOverallTripId(req.body.id)
    if (shortage === null) return res.status(500)
    const newShortage = calculateShortage(req.body, shortage)
    await updateShortageInOverallTrip(req.body.id, newShortage)
    updateAcknowledgementApproval(req.body.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
