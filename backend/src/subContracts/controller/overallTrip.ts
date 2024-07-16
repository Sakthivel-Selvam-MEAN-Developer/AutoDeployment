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
// import { findTrip } from '../findTripType.ts'
// import { getPricePoint } from '../models/pricePoint.ts'

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

export const differenceCalculation = (
    tripData: any,
    totalPaidAmount: number,
    totalShortageAmount: number
) => {
    if (tripData.loadingPointToStockPointTrip !== null) {
        const { tdsPercentage } = tripData.truck.transporter
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
        const { tdsPercentage } = tripData.truck.transporter
        return (
            tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount -
            (totalPaidAmount + totalShortageAmount) -
            (tripData.loadingPointToUnloadingPointTrip.totalTransporterAmount / 100) * tdsPercentage
        )
    }
}
export const listAllDiscrepancyReport = async (req: Request, res: Response) => {
    const { from, to } = req.params
    // await newDiscrepancy(req, res)
    await getAllDiscrepancyReport(parseInt(from), parseInt(to))
        .then((data) =>
            data.map((overallTrip) => {
                let tripType
                let dueAmount = 0
                let tdsPercentage: number | null | undefined = 0
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
                    tdsPercentage = overallTrip.truck?.transporter.tdsPercentage
                } else if (overallTrip.loadingPointToUnloadingPointTrip !== null) {
                    tripType = overallTrip.loadingPointToUnloadingPointTrip
                    totalTransporterAmount =
                        overallTrip.loadingPointToUnloadingPointTrip.totalTransporterAmount
                    tdsPercentage = overallTrip.truck?.transporter.tdsPercentage
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
                    vehicleNumber: overallTrip?.truck?.vehicleNumber,
                    invoiceNumber: tripType?.invoiceNumber,
                    transporterName: overallTrip?.truck?.transporter.name,
                    csmName: overallTrip?.truck?.transporter.csmName,
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
// const getTransporterPercentage = async (
//     loadingPointId: number,
//     unloadingPointId: number,
//     stockPointId: number
// ) => {
//     const pricePoint = await getPricePoint(loadingPointId, unloadingPointId, stockPointId)
//     if (pricePoint === null) return 0
//     return pricePoint.transporterPercentage
// }
// export const newDiscrepancy = async (req: Request, _res: Response) => {
//     const { from, to } = req.params
//     await getAllDiscrepancyReport(parseInt(from), parseInt(to)).then((data) =>
//         data.map(async (overallTrip) => {
//             let paidAmount = 0
//             let shortageAmount = 0
//             let secondaryRate = 0
//             const { trip } = findTrip(overallTrip)
//             const transporterPercentage = await getTransporterPercentage(
//                 trip.loadingPointId,
//                 trip.unloadingPointId,
//                 trip.stockPointId
//             )
//             overallTrip.paymentDues.forEach((dues) => {
//                 if (dues.type !== 'gst pay' && dues.payableAmount > 0) {
//                     paidAmount += dues.payableAmount
//                 }
//             })
//             overallTrip.shortageQuantity.forEach((shortage) => {
//                 shortageAmount += shortage.shortageAmount
//             })
//             if (overallTrip.stockPointToUnloadingPointTrip?.billingRate) {
//                 const billingRate = overallTrip.stockPointToUnloadingPointTrip.billingRate
//                 const pricePoint = await getPricePoint(
//                     null,
//                     overallTrip.stockPointToUnloadingPointTrip.unloadingPointId,
//                     trip.stockPointId
//                 )
//                 if (pricePoint === null) return
//                 secondaryRate +=
//                     billingRate - (billingRate * pricePoint.transporterPercentage) / 100
//             }
//             const pirmaryRate = trip.billingRate - (trip.billingRate * transporterPercentage) / 100
//             const totalPrimaryAmount = pirmaryRate * trip.filledLoad
//             const totalSecondaryAmount = secondaryRate * trip.filledLoad
//             const tdsPercentage = overallTrip.truck?.transporter.tdsPercentage
//             const totalTransporterAmount = totalPrimaryAmount + totalSecondaryAmount
//             const tdsAmount = tdsPercentage ? (totalTransporterAmount * tdsPercentage / 100) : 0
//             console.log(paidAmount + shortageAmount, totalTransporterAmount - tdsAmount)
//         })
//     )
// }
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
