import { Request, Response } from 'express'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import {
    getTripForPricePointApproval,
    updatePricePointApprovalStatus
} from '../models/overallTrip.ts'
import { updateFreightInDirectTrip } from '../models/loadingToUnloadingTrip.ts'
import { updateFreightInStockTrip } from '../models/loadingToStockPointTrip.ts'
import { amountCalculation } from '../domain/amountCalculation.ts'
import tripLogic from '../domain/tripLogics.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import {
    isInitialPayAvailable,
    preEventApproval
} from '../domain/overallTrip/pricePointApprovalEvent.ts'

const findTrip = (overallTrip: any) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { trip: overallTrip.loadingPointToStockPointTrip, type: 'LoadingToStock' }
    }
    return { trip: overallTrip.loadingPointToUnloadingPointTrip, type: 'LoadingToUnloading' }
}
export const listTripsForPricePointApproval = (_req: Request, res: Response) =>
    getTripForPricePointApproval()
        .then((tripDetails) => {
            const trips = tripDetails.map((overallTrip) => {
                const { trip } = findTrip(overallTrip)
                return preEventApproval(trip.wantFuel, overallTrip.fuel) ? overallTrip : undefined
            })
            res.status(200).json(trips.filter((trip) => trip !== undefined))
        })
        .catch((error) => handlePrismaError(error, res))

export const approvePricePoint = (req: Request, res: Response) =>
    updatePricePointApprovalStatus(req.body.id)
        .then(async (overallTrip) => {
            if (overallTrip === null) return res.sendStatus(500)
            const initialPay = isInitialPayAvailable(overallTrip.paymentDues)
            if (initialPay === true) return res.sendStatus(200)
            const { trip, type } = findTrip(overallTrip)
            const freightDetails = amountCalculation(
                req.body.transporterPercentage,
                req.body.approvedFreightAmount,
                trip
            )
            const updatedTripDetails =
                type === 'LoadingToUnloading'
                    ? await updateFreightInDirectTrip(trip.id, freightDetails)
                    : await updateFreightInStockTrip(trip.id, freightDetails)
            await tripLogic(updatedTripDetails, overallTrip, type).then(async (dues) => {
                if (dues === undefined) return
                await createPaymentDues(dues)
            })
            res.sendStatus(200)
        })
        .catch(() => res.sendStatus(500))
