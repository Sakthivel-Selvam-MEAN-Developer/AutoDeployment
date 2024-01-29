import { Request, Response } from 'express'
import {
    create,
    findTripWithActiveDues,
    getOnlyActiveDuesByName,
    updatePaymentDues
} from '../models/paymentDues.ts'
import { getOverallTrip } from '../models/overallTrip.ts'

export const createPaymentDues = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}

function tripInfo(matchingTrip: any, tripData: any) {
    const details = {
        id: matchingTrip.id,
        tripId: matchingTrip.tripId,
        payableAmount: matchingTrip.payableAmount,
        type: matchingTrip.type,
        number: matchingTrip.vehicleNumber,
        date:
            matchingTrip.type !== 'fuel pay' && tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.startDate
                : tripData[0].loadingPointToUnloadingPointTrip.startDate,
        invoiceNumber:
            matchingTrip.type !== 'fuel pay' && tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.invoiceNumber
                : tripData[0].loadingPointToUnloadingPointTrip.invoiceNumber,
        loadingPoint:
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.loadingPoint.name
                : tripData[0].loadingPointToUnloadingPointTrip.loadingPoint.name,
        unloadingPoint:
            tripData[0].loadingPointToStockPointTrip !== null
                ? tripData[0].loadingPointToStockPointTrip.stockPoint.name
                : tripData[0].loadingPointToUnloadingPointTrip.unloadingPoint.name
    }
    return details
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
                return tripInfo(matchingTrip, tripData)
            })
        }
    })
    return groupedData
}

export const listOnlyActiveTransporterDues = async (req: Request, res: Response) => {
    const { duedate } = req.params
    const duesData = await getOnlyActiveDuesByName(parseInt(duedate))
    const tripsData = await findTripWithActiveDues(parseInt(duedate))
    const tripDetails = await getOverallTrip()
    await groupDataByName(duesData, tripsData, tripDetails)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const updatePayment = (req: Request, res: Response) => {
    updatePaymentDues(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
