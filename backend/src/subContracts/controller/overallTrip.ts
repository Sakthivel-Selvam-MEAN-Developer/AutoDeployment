import { Request, Response } from 'express'
import {
    getAllDiscrepancyReport,
    getOverallTrip,
    getTripByUnloadDate,
    getTripDetailsByCompanyName,
    overallTripByFilter
} from '../models/overallTrip.ts'

export const listOverallTripWithPaymentStatus = (_req: Request, res: Response) => {
    getOverallTrip()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listgetOverallTripById = (req: Request, res: Response) => {
    const { companyId, transporterId, loadingPointId, from, to } = req.params
    overallTripByFilter(
        parseInt(companyId),
        parseInt(transporterId),
        parseInt(loadingPointId),
        parseInt(from),
        parseInt(to)
    )
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listTripDetailsByCompanyName = (req: Request, res: Response) => {
    getTripDetailsByCompanyName(req.params.company, parseInt(req.params.loadingDate))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listTripDetailsByUnloadDate = (req: Request, res: Response) => {
    getTripByUnloadDate(parseInt(req.params.date))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

function differenceCalculation(tripData: any, totalPaidAmount: number) {
    if (tripData.loadingPointToStockPointTrip !== null) {
        const totalTransporterAmount =
            tripData.loadingPointToStockPointTrip.totalTransporterAmount +
            tripData.stockPointToUnloadingPointTrip.totalTransporterAmount
        return totalTransporterAmount - (totalTransporterAmount - totalPaidAmount)
    }
    if (tripData.loadingPointToUnloadingPointTrip !== null) {
        return (
            tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount -
            (tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount - totalPaidAmount)
        )
    }
}
export const listAllDiscrepancyReport = async (req: Request, res: Response) => {
    const { from, to } = req.params
    await getAllDiscrepancyReport(parseInt(from), parseInt(to))
        .then(async (data) => {
            const tripDetails = await data.map((overallTrip) => {
                let dueAmount = 0
                let tripType
                overallTrip.paymentDues.forEach((dues) => {
                    if (dues.type !== 'gst pay') {
                        dueAmount += dues.payableAmount
                    }
                })
                if (overallTrip.loadingPointToStockPointTrip !== null) {
                    tripType = overallTrip.loadingPointToStockPointTrip
                } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
                    tripType = overallTrip.loadingPointToUnloadingPointTrip
                }
                const differenceAmount = differenceCalculation(
                    overallTrip,
                    dueAmount - overallTrip.shortageQuantity.length !== 0
                        ? overallTrip.shortageQuantity[0].shortageAmount
                        : 0
                )
                const details = {
                    vehicleNumber: tripType !== undefined && tripType.truck.vehicleNumber,
                    invoiceNumber: tripType !== undefined && tripType.invoiceNumber,
                    transporterName: tripType !== undefined && tripType.truck.transporter.name,
                    csmName: tripType !== undefined && tripType.truck.transporter.csmName,
                    transporterAmount:
                        tripType !== undefined &&
                        overallTrip.stockPointToUnloadingPointTrip !== null
                            ? (
                                  tripType.totalTransporterAmount +
                                  overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount
                              ).toFixed(2)
                            : tripType?.totalTransporterAmount.toFixed(2),
                    totalPaidAmount: dueAmount.toFixed(2),
                    differenceAmount
                }

                return details
            })
            return tripDetails
        })
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
