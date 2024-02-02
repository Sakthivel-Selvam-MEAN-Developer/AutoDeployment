import { Request, Response } from 'express'
import { create, getAllFuel, getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import fuelLogics, { fuelDues } from '../domain/fuelLogics.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { getActiveTripByVehicle, getOnlyActiveTripByVehicle } from '../models/overallTrip.ts'

interface dataProps {
    id: number
    pricePerliter: number
    quantity: number
    totalprice: number
    vehicleNumber: string
    overallTripId: number | null
    fuelStationId: number
    createdAt: Date
    updatedAt: Date
}
async function createDues(fuel: dataProps, trip: any, bunkname: string, vehicleNumber: string) {
    return fuelLogics(fuel, trip, bunkname, vehicleNumber).then((dues: any) => {
        if (trip !== null) {
            return createPaymentDues(dues)
        }
        if (trip === null && dues === undefined) {
            const fuelDue = fuelDues(bunkname, vehicleNumber, fuel)
            return createPaymentDues(fuelDue)
        }
    })
}

export const createFuel = async (req: Request, res: Response) => {
    const { vehicleNumber } = req.body
    const { bunkname } = req.params
    const activeTrip = await getOnlyActiveTripByVehicle(vehicleNumber)
    const fuel = await create({ ...req.body, overallTripId: activeTrip?.id })
    const trip = await getActiveTripByVehicle(vehicleNumber)

    return createDues(fuel, trip, bunkname, vehicleNumber)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
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
