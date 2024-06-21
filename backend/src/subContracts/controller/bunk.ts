/* eslint-disable no-console */
import { Request, Response } from 'express'
import { create, getAllBunk, getAllBunkName } from '../models/bunk.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getFuelReport } from '../models/fuel.ts'
import { getFuelTransactionId } from '../models/paymentDues.ts'

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
export const createBunk = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch((error) => handlePrismaError(error, res))
}

export const listAllBunk = (_req: Request, res: Response) => {
    getAllBunk()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

export const listAllBunkName = (_req: Request, res: Response) => {
    getAllBunkName()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}

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
        console.error('Error generating fuelReportFinalData', error)
        throw error
    })

const processfuelDataFormat = async (fuelDataFormat: FuelingEvent) => {
    const transactionId = await getFuelTransactionId(fuelDataFormat.id)
    if (fuelDataFormat.overallTrip !== null) {
        return generateFuelData(fuelDataFormat, transactionId?.transactionId)
    }
    return generateFuelData(fuelDataFormat, transactionId?.transactionId)
}
const fuelReport: FuelReport[] = []
export const generateFuelReport = async (fuel: FuelingEvent[]) => {
    await Promise.all(
        fuel.map(async (fuelDataFormat) => {
            const fuelReportFinalData = await processfuelDataFormat(fuelDataFormat)
            if (fuelReportFinalData) fuelReport.push(fuelReportFinalData)
        })
    )
    return fuelReport
}

export const listAllFuelList = async (_req: Request, res: Response) => {
    try {
        const fuel = await getFuelReport()
        const finalFuelReport = await generateFuelReport(fuel)
        res.status(200).json(finalFuelReport)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
