import { Request, Response } from 'express'
import { create, getAllFuel, getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import fuelLogics from '../domain/fuelLogics.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
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
