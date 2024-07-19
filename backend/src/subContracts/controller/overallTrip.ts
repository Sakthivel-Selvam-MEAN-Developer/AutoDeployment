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
import { findTrip } from '../findTripType.ts'
import { getPricePoint } from '../models/pricePoint.ts'

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

export const listAllDiscrepancyReport = async (req: Request, res: Response) => {
    const { from, to } = req.params
    await getAllDiscrepancyReport(parseInt(from), parseInt(to))
        .then(async (data) =>
            Promise.all(
                data.map(async (overallTrip) => {
                    let paidAmount = 0
                    let shortageAmount = 0
                    let secondaryRate = 0
                    const { trip, type } = findTrip(overallTrip)
                    const pricePoint = await getPricePoint(
                        trip.loadingPointId,
                        trip.unloadingPointId,
                        trip.stockPointId
                    )
                    overallTrip.paymentDues.forEach((dues) => {
                        if (dues.type !== 'gst pay' && dues.payableAmount > 0) {
                            paidAmount += dues.payableAmount
                        }
                    })
                    overallTrip.shortageQuantity.forEach((shortage) => {
                        shortageAmount += shortage.shortageAmount
                    })
                    if (overallTrip.stockPointToUnloadingPointTrip?.billingRate) {
                        const billingRate = overallTrip.stockPointToUnloadingPointTrip.billingRate
                        const pricePoint = await getPricePoint(
                            null,
                            overallTrip.stockPointToUnloadingPointTrip.unloadingPointId,
                            trip.stockPointId
                        )
                        secondaryRate +=
                            billingRate -
                            (billingRate * (pricePoint?.transporterPercentage ?? 0)) / 100
                    }
                    const pirmaryRate =
                        trip.billingRate -
                        (trip.billingRate * (pricePoint?.transporterPercentage ?? 0)) / 100
                    const totalPrimaryAmount = pirmaryRate * trip.filledLoad
                    const totalSecondaryAmount = secondaryRate * trip.filledLoad
                    const tdsAmount = overallTrip.tdsAmount ?? 0
                    const totalTransporterAmount = totalPrimaryAmount + totalSecondaryAmount
                    const differenceAmount = parseFloat(
                        (paidAmount + shortageAmount + tdsAmount - totalTransporterAmount).toFixed(
                            2
                        )
                    )
                    const details = {
                        startDate: trip.startDate,
                        loadingPoint: trip.loadingPoint.name,
                        unloadingPoint:
                            type === 'LoadingToStock'
                                ? overallTrip.stockPointToUnloadingPointTrip?.unloadingPoint.name
                                : trip.unloadingPoint.name,
                        vehicleNumber: overallTrip.truck?.vehicleNumber,
                        invoiceNumber: trip.invoiceNumber,
                        transporterName: overallTrip.truck?.transporter.name,
                        csmName: overallTrip.truck?.transporter.employee?.name || null,
                        transporterAmount: totalTransporterAmount.toFixed(2),
                        totalPaidAmount: paidAmount.toFixed(2),
                        differenceAmount
                    }
                    if (differenceAmount > 1 || differenceAmount < -1) {
                        return details
                    }
                    return null
                })
            )
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
    month: string
}
export const listOverAllTripByArrayOfIds = async (
    req: Request<object, object, object, queryParams>,
    res: Response
) =>
    getOverAllTripByArrayOfId(JSON.parse(req.query.ids), req.query.month)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
