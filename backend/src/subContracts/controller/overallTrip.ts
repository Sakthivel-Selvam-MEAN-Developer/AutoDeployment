import { Request, Response } from 'express'
import dayjs from 'dayjs'
import {
    getAllDiscrepancyReport,
    getOverallTrip,
    getOverAllTripByArrayOfId,
    getTripByUnloadDate,
    tripStatusFilter,
    tripStatusFilterCount
} from '../models/overallTrip.ts'
import { getAllUnloadingPointInvoiceNumbers } from '../models/loadingToUnloadingTrip.ts'
import { getAllStockPointInvoiceNumbers } from '../models/loadingToStockPointTrip.ts'
import { getAllStockToUnloadingPointInvoiceNumbers } from '../models/stockPointToUnloadingPoint.ts'

export const listOverallTripWithPaymentStatus = (_req: Request, res: Response) => {
    getOverallTrip()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
type RequestQuery = {
    cementCompanyId: string
    transporterId: string
    loadingPointId: string
    vehicleNumber: string
    invoiceNumber: string
    from: string
    to: string
    pageNumber: string
}
type listTripStatusReportDetailsProps = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => void
export const listTripStatusReportDetails: listTripStatusReportDetailsProps = async (req, res) => {
    const {
        cementCompanyId,
        transporterId,
        loadingPointId,
        vehicleNumber,
        invoiceNumber,
        from,
        to,
        pageNumber
    } = req.query
    const skipNumber = (parseInt(pageNumber) - 1) * 200
    tripStatusFilter(
        cementCompanyId,
        transporterId,
        loadingPointId,
        vehicleNumber,
        invoiceNumber,
        from,
        to,
        skipNumber
    )
        .then((filterData) => {
            filterData.sort((a, b) => {
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                if (dateA > dateB) return -1
                if (dateA < dateB) return 1
                return 0
            })
            tripStatusFilterCount(
                cementCompanyId,
                transporterId,
                loadingPointId,
                vehicleNumber,
                invoiceNumber,
                from,
                to
            ).then((count) => res.status(200).json({ filterData, count }))
        })
        .catch(() => res.status(500))
}

export const listTripDetailsByUnloadDate = (req: Request, res: Response) => {
    const date = dayjs().subtract(parseInt(req.params.date), 'days').startOf('day').unix()
    getTripByUnloadDate(date)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

const differenceCalculation = (
    tripData: any,
    totalPaidAmount: number,
    totalShortageAmount: number
) => {
    if (tripData.loadingPointToStockPointTrip !== null) {
        const { tdsPercentage } = tripData.loadingPointToStockPointTrip.truck.transporter
        const totalTransporterAmount =
            tripData.loadingPointToStockPointTrip.totalTransporterAmount +
            tripData.stockPointToUnloadingPointTrip.totalTransporterAmount
        return (
            totalTransporterAmount -
            (totalPaidAmount + totalShortageAmount) -
            (totalTransporterAmount / 100) * tdsPercentage
        )
    }
    if (tripData.loadingPointToUnloadingPointTrip !== null) {
        const { tdsPercentage } = tripData.loadingPointToUnloadingPointTrip.truck.transporter
        return (
            tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount -
            (totalPaidAmount + totalShortageAmount) -
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
                let totalShortageAmount = 0
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
                overallTrip.shortageQuantity.forEach((shortage) => {
                    totalShortageAmount += shortage.shortageAmount
                })
                const differenceAmount = differenceCalculation(
                    overallTrip,
                    dueAmount,
                    totalShortageAmount
                )
                dueAmount +=
                    (totalTransporterAmount / 100) * (tdsPercentage || 0) + totalShortageAmount
                const transporterAmount =
                    tripType !== undefined && overallTrip.stockPointToUnloadingPointTrip !== null
                        ? (
                              tripType.totalTransporterAmount +
                              overallTrip.stockPointToUnloadingPointTrip.totalTransporterAmount
                          ).toFixed(2)
                        : tripType?.totalTransporterAmount.toFixed(2)
                if (
                    transporterAmount !== undefined &&
                    parseFloat(transporterAmount) === parseFloat(dueAmount.toFixed(2))
                ) {
                    return null
                }
                if (differenceAmount === 0 || totalShortageAmount === differenceAmount) {
                    return null
                }
                const details = {
                    startDate: tripType?.startDate,
                    loadingPoint: tripType?.loadingPoint.name,
                    unloadingPoint:
                        // @ts-expect-error unloading missing
                        tripType?.unloadingPoint === undefined &&
                        overallTrip.stockPointToUnloadingPointTrip !== null
                            ? overallTrip.stockPointToUnloadingPointTrip.unloadingPoint.name
                            : // @ts-expect-error unloading missing
                              tripType?.unloadingPoint.name,
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
const getAllInvoiceNumbers = async () => [
    ...(await getAllStockPointInvoiceNumbers()),
    ...(await getAllStockToUnloadingPointInvoiceNumbers()),
    ...(await getAllUnloadingPointInvoiceNumbers())
]
export const listAllInvoiceNumbers = async (_req: Request, res: Response) => {
    try {
        const allInvoiceNumbers = await getAllInvoiceNumbers()
        res.status(200).json(allInvoiceNumbers)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
interface queryParams {
    ids: string
}
export const listOverAllTripByArrayOfIds = async (
    req: Request<object, object, object, queryParams>,
    res: Response
) =>
    getOverAllTripByArrayOfId(JSON.parse(req.query.ids))
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
