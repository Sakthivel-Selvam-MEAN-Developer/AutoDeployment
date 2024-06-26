import { Request, Response } from 'express'
import {
    create,
    getAllFuel,
    getFuelWithoutTrip,
    updateFuelWithTripId,
    getFuelReport,
    getFuelReportCount
} from '../models/fuel.ts'
import fuelLogics from '../domain/fuelLogics.ts'
import { create as createPaymentDues, getFuelTransactionId } from '../models/paymentDues.ts'
import { getActiveTripByVehicle, getOnlyActiveTripByVehicle } from '../models/overallTrip.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export interface dataProps {
    id: number
    overallTripId: number | null
    fueledDate: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    paymentStatus: boolean
    vehicleNumber: string
    bunkId: number
    createdAt: Date
    updatedAt: Date
}
export interface FuelReport {
    id: number
    fueledDate: Date | number
    bunkName: string
    vehicleNumber: string
    loadingPoint: string | null
    stockPointName: string | null
    unLodaingPoint: string | null
    quantity: number
    pricePerliter: number | null
    totalprice: number | null
    fuelInvoiceNumber: string
    transactionId: string | null
    tripInvoiceNumber: string | null
}

interface LoadingPoint {
    name: string
}

interface UnloadingPoint {
    name: string
}

interface StockPoint {
    name: string
}

interface LoadingPointToUnloadingPointTrip {
    invoiceNumber: string
    loadingPoint: LoadingPoint
    unloadingPoint: UnloadingPoint
}
interface stockPointToUnloadingPointTrip {
    unloadingPoint: UnloadingPoint
}
interface LoadingPointToStockPointTrip {
    invoiceNumber: string
    loadingPoint: LoadingPoint
    stockPoint: StockPoint
    stockPointToUnloadingPointTrip: stockPointToUnloadingPointTrip[]
}

export interface OverallTrip {
    id: number
    loadingPointToStockPointTrip: LoadingPointToStockPointTrip | null
    loadingPointToUnloadingPointTrip: LoadingPointToUnloadingPointTrip | null
}

interface Bunk {
    bunkName: string
}

export interface FuelingEvent {
    id: number
    fueledDate: number
    vehicleNumber: string
    quantity: number
    pricePerliter: number
    totalprice: number
    invoiceNumber: string
    bunk: Bunk
    overallTrip: OverallTrip | null
}

async function createDues(
    fuel: dataProps,
    overallTripId: number | null | undefined,
    bunkname: string,
    vehicleNumber: string
) {
    return fuelLogics(fuel, overallTripId, bunkname, vehicleNumber).then((dues) =>
        createPaymentDues(dues)
    )
}

export const createFuel = async (req: Request, res: Response) => {
    try {
        const { vehicleNumber } = req.body
        const { bunkname } = req.params
        const activeTrip = await getOnlyActiveTripByVehicle(vehicleNumber)
        const fuel = await create({ ...req.body, overallTripId: activeTrip?.id })
        const overallTrip = await getActiveTripByVehicle(vehicleNumber)
        return createDues(fuel, overallTrip?.id, bunkname, vehicleNumber)
            .then(() => res.sendStatus(200))
            .catch((error) => handlePrismaError(error, res))
    } catch (error) {
        handlePrismaError(error, res)
    }
}

export const listAllFuel = (_req: Request, res: Response) => {
    getAllFuel()
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
export const listFuelWithoutTripId = (req: Request, res: Response) => {
    getFuelWithoutTrip(req.params.vehiclenumber)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
export const updateFuelWithTrip = (req: Request, res: Response) => {
    updateFuelWithTripId(req.body)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
// eslint-disable-next-line max-lines-per-function
export const generateFuel = async (
    fuelDataFormat: FuelingEvent,
    transactionId: string | null | undefined
): Promise<FuelReport> => ({
    id: fuelDataFormat.id,
    fueledDate: fuelDataFormat.fueledDate,
    bunkName: fuelDataFormat.bunk.bunkName,
    vehicleNumber: fuelDataFormat.vehicleNumber,
    loadingPoint:
        fuelDataFormat?.overallTrip?.loadingPointToUnloadingPointTrip?.loadingPoint?.name ||
        fuelDataFormat?.overallTrip?.loadingPointToStockPointTrip?.loadingPoint?.name ||
        null,
    unLodaingPoint:
        fuelDataFormat?.overallTrip?.loadingPointToUnloadingPointTrip?.unloadingPoint?.name ||
        fuelDataFormat?.overallTrip?.loadingPointToStockPointTrip?.stockPointToUnloadingPointTrip[0]
            ?.unloadingPoint?.name ||
        null,
    stockPointName:
        fuelDataFormat?.overallTrip?.loadingPointToStockPointTrip?.stockPoint?.name || null,
    quantity: fuelDataFormat.quantity,
    pricePerliter: fuelDataFormat.pricePerliter,
    totalprice: fuelDataFormat?.totalprice,
    fuelInvoiceNumber: fuelDataFormat.invoiceNumber,
    transactionId: transactionId || null,
    tripInvoiceNumber:
        fuelDataFormat?.overallTrip?.loadingPointToUnloadingPointTrip?.invoiceNumber ||
        fuelDataFormat?.overallTrip?.loadingPointToStockPointTrip?.invoiceNumber ||
        null
})

const generateFuelData = async (
    fuelDataFormat: FuelingEvent,
    transactionId: string | null | undefined
) =>
    generateFuel(fuelDataFormat, transactionId).catch((error) => {
        throw error
    })

const processfuelDataFormat = async (fuelDataFormat: FuelingEvent) => {
    const transactionId = await getFuelTransactionId(fuelDataFormat.id)
    if (fuelDataFormat.overallTrip !== null) {
        return generateFuelData(fuelDataFormat, transactionId?.transactionId)
    }
    return generateFuelData(fuelDataFormat, transactionId?.transactionId)
}
let fuelReport: FuelReport[] = []
export const generateFuelReport = async (fuel: FuelingEvent[]) => {
    await Promise.all(
        fuel.map(async (fuelDataFormat) => {
            const fuelReportFinalData = await processfuelDataFormat(fuelDataFormat)
            if (fuelReportFinalData) fuelReport.push(fuelReportFinalData)
        })
    )
    return fuelReport
}
type RequestQuery = {
    bunkId: string
    paymentStatus?: string
    vehicleNumber: string
    from: string
    to: string
    pageNumber: string
}
type fuelReportDetail = (req: Request<object, object, object, RequestQuery>, res: Response) => void
export const listAllFuelList: fuelReportDetail = async (_req, res) => {
    const { bunkId, paymentStatus, vehicleNumber, from, to, pageNumber } = _req.query
    const skipNumber = (parseInt(pageNumber) - 1) * 200
    await getFuelReport(bunkId, paymentStatus, vehicleNumber, from, to, skipNumber)
        .then((filterList) => {
            generateFuelReport(filterList).then((data) => {
                data.sort((a, b) => a.id - b.id)
                fuelReport = []
                getFuelReportCount(bunkId, paymentStatus, vehicleNumber, from, to).then((count) =>
                    res.status(200).json({ data, count })
                )
            })
        })
        .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
}
