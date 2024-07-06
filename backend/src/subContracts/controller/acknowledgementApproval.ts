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
import { gstCalculation } from '../domain/gstDueLogic.ts'
import overallTripProps from '../domain/overallTripsTypes.ts'

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
    name?: string
    type: string
    dueDate: number
    overallTripId: number
    vehicleNumber?: string
    payableAmount: number
}
interface paymentDuesCreateManyInput {
    name: string
    type: string
    dueDate: number
    overallTripId: number
    vehicleNumber: string
    payableAmount: number
}
export const convertData = (finalDue: finalDuePropsfalse[]): paymentDuesCreateManyInput[] =>
    finalDue.map((item) => ({
        name: item.name ?? '',
        type: item.type,
        dueDate: item.dueDate,
        overallTripId: item.overallTripId,
        vehicleNumber: item.vehicleNumber ?? '',
        payableAmount: item.payableAmount
    }))
const createGstPaymentDue = async (overallTrip: overallTripProps) => {
    gstCalculation(overallTrip).then(async (due) => {
        if (due === undefined) return
        await createPaymentDues(due)
    })
}
export const approveAcknowledgement = async (req: Request, res: Response) => {
    const shortage = await getShortageQuantityByOverallTripId(req.body.id)
    if (shortage === null) return res.sendStatus(500)
    const newShortage = calculateShortage(req.body, shortage)
    await updateShortageByOverallTripId(shortage.id, newShortage)
    await updateAcknowledgementApproval(req.body.id)
        .then(async (overallTrip) => {
            await createGstPaymentDue(overallTrip).catch(() => res.sendStatus(500))
            await finalDueCreation(overallTrip).then(
                async (due: boolean | undefined | finalDuePropsfalse[]) => {
                    if (due === undefined || typeof due === 'boolean') return res.sendStatus(200)
                    await createPaymentDues(convertData(due)).then(() => res.sendStatus(200))
                }
            )
        })
        .catch(() => res.sendStatus(500))
}
