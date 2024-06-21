/* eslint-disable no-console */
import { Request, Response } from 'express'
import { create, getAllBunk, getAllBunkName, getBunkNameById } from '../models/bunk.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'
import { getAllFuel } from '../models/fuel.ts'
import { getOverAllTripById } from '../models/overallTrip.ts'
import { getFuelPaymentDuesTripId } from '../models/paymentDues.ts'
import { getTrip } from './acknowledgement.ts'

export interface FuelReport {
    fueledDate: Date | number
    bunkName: string
    vehicleNumber: string
    loadingPoint: string | null
    unLodaingPoint: string | null
    quantity: number
    pricePerliter: number
    totalprice: number
    fuelInvoiceNumber: string
    transactionId: string | null
    tripInvoiceNumber: string | null
}
export interface FuelDataProps {
    id: number
    fueledDate: number
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    dieselkilometer: number
    fuelType: string | null
    paymentStatus: boolean
    vehicleNumber: string
    bunkId: number
    overallTripId: number | null
    createdAt: Date
    updatedAt: Date
}

export interface paymentDueForFuelProps {
    transactionId: string | null
}

interface LoadingPoint {
    name: string
}
interface UnloadingPoint {
    name: string
}
interface Transporter {
    name: string
    transporterType: string
    gstPercentage: number | null
}
interface Truck {
    vehicleNumber: string
    transporter: Transporter
}
export interface stockTrip {
    id: number
    invoiceNumber: string
    filledLoad: number
    startDate: number
    acknowledgeDueTime: number | null
    totalTransporterAmount: number
    tripStatus: boolean
    loadingPoint: LoadingPoint | undefined
    unloadingPoint: UnloadingPoint
    truck: Truck
}
export interface TripProps {
    id: number
    invoiceNumber: string
    filledLoad: number
    startDate: number
    acknowledgeDueTime: number | null
    totalTransporterAmount: number
    tripStatus: boolean
    loadingPoint: LoadingPoint
    unloadingPoint: UnloadingPoint
    loadingPointToStockPointTrip: stockTrip
    truck: Truck
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
    fuelDataFormat: FuelDataProps,
    bunkName: string,
    tripCheck: TripProps | null,
    paymentDueForFuel: paymentDueForFuelProps | null
) => ({
    fueledDate: fuelDataFormat.fueledDate,
    bunkName,
    vehicleNumber: fuelDataFormat.vehicleNumber,
    loadingPoint:
        tripCheck?.loadingPoint?.name ||
        tripCheck?.loadingPointToStockPointTrip?.loadingPoint?.name ||
        null,
    unLodaingPoint:
        tripCheck?.unloadingPoint?.name ||
        tripCheck?.loadingPointToStockPointTrip?.unloadingPoint?.name ||
        null,
    quantity: fuelDataFormat.quantity,
    pricePerliter: fuelDataFormat.pricePerliter,
    totalprice: fuelDataFormat.totalprice,
    fuelInvoiceNumber: fuelDataFormat.invoiceNumber,
    transactionId: paymentDueForFuel?.transactionId || null,
    tripInvoiceNumber:
        tripCheck?.invoiceNumber || tripCheck?.loadingPointToStockPointTrip?.invoiceNumber || null
})

export const fetchTripData = async (id: number) => {
    try {
        const tripData = await getOverAllTripById(id)
        const tripCheck = getTrip(tripData)
        return tripCheck
    } catch (error) {
        console.error(`Error fetching trip data for ID ${id}:`, error)
        throw error
    }
}

const generateFuelData = async (
    fuelDataFormat: FuelDataProps,
    bunkName: string,
    tripCheck: TripProps | null,
    paymentDueForFuel: paymentDueForFuelProps | null
) =>
    generateFuel(fuelDataFormat, bunkName, tripCheck, paymentDueForFuel).catch((error) => {
        console.error('Error generating fuelReportFinalData', error)
        throw error
    })

const tripNull = null
const processfuelDataFormat = async (fuelDataFormat: FuelDataProps) => {
    const id = fuelDataFormat.overallTripId
    const [bunkName] = await getBunkNameById(fuelDataFormat.bunkId)
    const paymentDueForFuel = await getFuelPaymentDuesTripId(fuelDataFormat.id)
    if (id !== null) {
        const tripCheck = await fetchTripData(id)
        return generateFuelData(fuelDataFormat, bunkName.bunkName, tripCheck, paymentDueForFuel)
    }
    return generateFuelData(fuelDataFormat, bunkName.bunkName, tripNull, paymentDueForFuel)
}
const fuelReport: FuelReport[] = []
export const generateFuelReport = async (fuel: FuelDataProps[]) => {
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
        const fuel = await getAllFuel()
        const finalFuelReport = await generateFuelReport(fuel)
        res.status(200).json(finalFuelReport)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
