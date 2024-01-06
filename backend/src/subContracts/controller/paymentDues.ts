import { Request, Response } from 'express'
import {
    create,
    findTripWithActiveDues,
    getOnlyActiveDuesByName,
    updatePaymentDues
} from '../models/paymentDues.ts'
import { getAllTrip } from '../models/loadingToUnloadingTrip.ts'

export const createPaymentDues = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

export const groupDataByName = async (duesData: any[], tripsData: any[], tripDetails: any[]) => {
    const groupedData = duesData.map((due) => {
        const matchingTrips = tripsData.filter((trip) => trip.name === due.name)
        return {
            name: due.name,
            dueDetails: {
                // eslint-disable-next-line no-underscore-dangle
                count: due._count.status,
                // eslint-disable-next-line no-underscore-dangle
                totalPayableAmount: due._sum.payableAmount
            },
            tripDetails: matchingTrips.map((matchingTrip) => {
                const tripData = tripDetails.filter(
                    (trip) =>
                        trip.id === matchingTrip.tripId ||
                        (matchingTrip.tripId === null &&
                            matchingTrip.status === false &&
                            matchingTrip.type === 'fuel pay')
                )
                const details = {
                    id: matchingTrip.id,
                    tripId: matchingTrip.tripId,
                    payableAmount: matchingTrip.payableAmount,
                    type: matchingTrip.type,
                    number: matchingTrip.vehicleNumber,
                    vehicleNumber: tripData[0].truck.vehicleNumber,
                    loadingPoint: tripData[0].loadingPoint.name,
                    unloadingPoint: tripData[0].unloadingPoint.name
                }
                return details
            })
        }
    })
    return groupedData
}

export const listOnlyActiveTransporterDues = async (req: Request, res: Response) => {
    const { duedate, type } = req.params
    const duesData = await getOnlyActiveDuesByName(parseInt(duedate), type)
    const tripsData = await findTripWithActiveDues(parseInt(duedate), type)
    const tripDetails = await getAllTrip().then()
    await groupDataByName(duesData, tripsData, tripDetails)
        .then((data: any) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updatePayment = (req: Request, res: Response) => {
    updatePaymentDues(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
