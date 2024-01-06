import { Request, Response } from 'express'
import { create, getAllFuel, getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import {
    getOnlyActiveTripByVehicleNumber,
    getTripByVehicleNumber
} from '../models/loadingToUnloadingTrip.ts'
import fuelLogics, { fuelDues } from '../domain/fuelLogics.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import {
    getOnlyActiveStockTripByVehicleNumber,
    getStockTripByVehicleNumber
} from '../models/loadingToStockPointTrip.ts'

interface dataProps {
    id: number
    pricePerliter: number
    quantity: number
    totalprice: number
    vehicleNumber: string
    loadingPointToStockPointTripId: number | null
    loadingPointToUnloadingPointTripId: number | null
    fuelStationId: number
    createdAt: Date
    updatedAt: Date
}
interface tripProps {
    id: number
    totalTransporterAmount: number
    truck: { transporter: { name: string } }
}
async function createDues(
    fuel: dataProps,
    trip: tripProps | null,
    bunkname: string,
    vehicleNumber: string
) {
    await fuelLogics(fuel, trip, bunkname, vehicleNumber).then((dues: any) => {
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
    let activeTrip = await getOnlyActiveTripByVehicleNumber(vehicleNumber)

    if (activeTrip === null) {
        activeTrip = await getOnlyActiveStockTripByVehicleNumber(vehicleNumber)
        const fuel = await create({ ...req.body, loadingPointToStockPointTripId: activeTrip?.id })
        const trip = await getStockTripByVehicleNumber(vehicleNumber)
        await createDues(fuel, trip, bunkname, vehicleNumber)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
    } else if (activeTrip !== null) {
        const fuel = await create({
            ...req.body,
            loadingPointToUnloadingPointTripId: activeTrip?.id
        })
        const trip = await getTripByVehicleNumber(vehicleNumber)
        await createDues(fuel, trip, bunkname, vehicleNumber)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
    }
}

export const listAllFuel = (_req: Request, res: Response) => {
    getAllFuel().then((data) => res.status(200).json(data))
}

export const listFuelWithoutTripId = (req: Request, res: Response) => {
    getFuelWithoutTrip(req.params.vehiclenumber).then((data) => res.status(200).json(data))
}

export const updateFuelWithTrip = (req: Request, res: Response) => {
    updateFuelWithTripId(req.body).then((data) => res.status(200).json(data))
}
