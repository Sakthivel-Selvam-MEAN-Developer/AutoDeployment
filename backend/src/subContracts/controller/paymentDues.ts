import { Request, Response } from 'express'
import { create, findTripWithActiveDues, getOnlyActiveDuesByName } from '../models/paymentDues.ts'

export const createPaymentDues = (req: Request, res: Response) => {
    create(req.body).then(() => res.sendStatus(200))
}

const groupDataByName = async (duesData: any[], tripsData: any[]) => {
    const groupedData = duesData.map((due) => {
        const matchingTrips = tripsData.filter((trip) => trip.name === due.name)
        return {
            name: due.name,
            dueDetails: {
                // eslint-disable-next-line no-underscore-dangle
                count: due._count.tripId,
                // eslint-disable-next-line no-underscore-dangle
                totalPayableAmount: due._sum.payableAmount
            },
            tripDetails: matchingTrips.map((matchingTrip) => {
                const details = {
                    tripId: matchingTrip.tripId,
                    payableAmount: matchingTrip.payableAmount,
                    type: matchingTrip.type
                }
                return details
            })
        }
    })
    return groupedData
}

export const listOnlyActiveDues = async (_req: Request, res: Response) => {
    const duesData = await getOnlyActiveDuesByName()
    const tripsData = await findTripWithActiveDues()
    await groupDataByName(duesData, tripsData).then((data: any) => res.status(200).json(data))
}
