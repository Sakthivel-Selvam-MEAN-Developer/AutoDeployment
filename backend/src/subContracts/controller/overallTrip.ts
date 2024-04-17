import { Request, Response } from 'express'
import {
    getAllDiscrepancyReport,
    getOverallTrip,
    getTripByUnloadDate,
    getTripDetailsByCompanyName,
    tripStatusFilter,
    tripStatusFilterCount
} from '../models/overallTrip.ts'

export const listOverallTripWithPaymentStatus = (_req: Request, res: Response) => {
    getOverallTrip()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listTripStatusReportDetails = async (req: any, res: Response) => {
    const { cementCompanyId, transporterId, loadingPointId, from, to, pageNumber } = req.query
    const skipNumber = (parseInt(pageNumber) - 1) * 200
    tripStatusFilter(cementCompanyId, transporterId, loadingPointId, from, to, skipNumber)
        .then((filterData) => {
            tripStatusFilterCount(cementCompanyId, transporterId, loadingPointId, from, to).then(
                (count) => res.status(200).json({ filterData, count })
            )
        })
        .catch(() => res.status(500))
}

export const listTripDetailsByCompanyName = (req: Request, res: Response) => {
    getTripDetailsByCompanyName(
        req.params.company,
        parseInt(req.params.startDate),
        parseInt(req.params.endDate)
    )
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listTripDetailsByUnloadDate = (req: Request, res: Response) => {
    getTripByUnloadDate(parseInt(req.params.date))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

const differenceCalculation = (tripData: any, totalPaidAmount: number) => {
    if (tripData.loadingPointToStockPointTrip !== null) {
        const { tdsPercentage } = tripData.loadingPointToStockPointTrip.truck.transporter
        const totalTransporterAmount =
            tripData.loadingPointToStockPointTrip.totalTransporterAmount +
            tripData.stockPointToUnloadingPointTrip.totalTransporterAmount
        return (
            totalTransporterAmount -
            totalPaidAmount -
            (totalTransporterAmount / 100) * tdsPercentage
        )
    }
    if (tripData.loadingPointToUnloadingPointTrip !== null) {
        const { tdsPercentage } = tripData.loadingPointToUnloadingPointTrip.truck.transporter
        return (
            tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount -
            totalPaidAmount -
            (tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount / 100) * tdsPercentage
        )
    }
}
export const listAllDiscrepancyReport = async (req: Request, res: Response) => {
    const { from, to } = req.params
    await getAllDiscrepancyReport(parseInt(from), parseInt(to))
        .then((data) =>
            data.map((overallTrip) => {
                let tripType
                let dueAmount = 0
                let tdsPercentage: number | null = 0
                let totalTransporterAmount = 0
                if (
                    overallTrip.loadingPointToStockPointTrip !== null &&
                    overallTrip.stockPointToUnloadingPointTrip !== null
                ) {
                    tripType = overallTrip.loadingPointToStockPointTrip
                    totalTransporterAmount =
                        overallTrip.loadingPointToStockPointTrip.totalTransporterAmount +
                        overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount
                    tdsPercentage =
                        overallTrip.loadingPointToStockPointTrip.truck.transporter.tdsPercentage
                } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
                    tripType = overallTrip.loadingPointToUnloadingPointTrip
                    totalTransporterAmount =
                        overallTrip.loadingPointToUnloadingPointTrip.totalTransporterAmount
                    tdsPercentage =
                        overallTrip.loadingPointToUnloadingPointTrip.truck.transporter.tdsPercentage
                }
                overallTrip.paymentDues.forEach((dues) => {
                    if (dues.type !== 'gst pay' && dues.payableAmount > 0) {
                        dueAmount += dues.payableAmount
                    }
                })
                const differenceAmount = differenceCalculation(overallTrip, dueAmount)
                dueAmount += (totalTransporterAmount / 100) * (tdsPercentage || 0)
                const transporterAmount =
                    tripType !== undefined && overallTrip.stockPointToUnloadingPointTrip !== null
                        ? (
                              tripType.totalTransporterAmount +
                              overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount
                          ).toFixed(2)
                        : tripType?.totalTransporterAmount.toFixed(2)
                if (
                    transporterAmount !== undefined &&
                    parseInt(transporterAmount) === parseFloat(dueAmount.toFixed(2))
                ) {
                    return null
                }
                const details = {
                    startDate: tripType?.startDate,
                    vehicleNumber: tripType?.truck.vehicleNumber,
                    invoiceNumber: tripType?.invoiceNumber,
                    transporterName: tripType?.truck.transporter.name,
                    csmName: tripType?.truck.transporter.csmName,
                    transporterAmount,
                    totalPaidAmount: dueAmount.toFixed(2),
                    differenceAmount
                }
                return details
            })
        )
        .then((data) => {
            const filteredData = data.filter((item) => item !== null)
            res.status(200).json(filteredData)
        })
        .catch(() => res.status(500))
}
