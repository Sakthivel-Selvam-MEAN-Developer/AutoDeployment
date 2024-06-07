import { Request, Response } from 'express'
import {
    getTripForAcknowlegementApproval,
    updateAcknowledgementApproval
} from '../models/overallTrip.ts'
import {
    getShortageQuantityByOverallTripId,
    updateShortageByOverallTripId
} from '../models/shortageQuantity.ts'
import { calculateShortage } from '../domain/shortageLogic.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { finalDueCreation } from '../domain/overallTrip/acknowledgementApprovalEvent.ts'

export const listTripForAcknowlegementApproval = (_req: Request, res: Response) => {
    getTripForAcknowlegementApproval()
        .then((data) => {
            const tripDetails = data.map((trip) => {
                const pay = trip.paymentDues.filter((due) => due.type === 'final pay')
                return pay.length === 0 ? trip : null
            })
            res.status(200).json(tripDetails.filter((trip) => trip !== null))
        })
        .catch(() => res.status(500))
}
interface finalDuePropsfalse {
    name: string
    type: string
    dueDate: number
    overallTripId: number
    vehicleNumber: string
    payableAmount: number
}
export const approveAcknowledgement = async (req: Request, res: Response) => {
    const shortage = await getShortageQuantityByOverallTripId(req.body.id)
    if (shortage === null) return res.sendStatus(500)
    const newShortage = calculateShortage(req.body, shortage)
    await updateShortageByOverallTripId(shortage.id, newShortage)
    await updateAcknowledgementApproval(req.body.id)
        .then(async (overallTrip) => {
            await finalDueCreation(overallTrip).then(
                async (finalDue: boolean | undefined | finalDuePropsfalse[]) => {
                    if (finalDue === undefined) return res.sendStatus(200)
                    if (typeof finalDue === 'boolean') return res.sendStatus(200)
                    await createPaymentDues(finalDue).then(() => res.sendStatus(200))
                }
            )
        })
        .catch(() => res.sendStatus(500))
}
