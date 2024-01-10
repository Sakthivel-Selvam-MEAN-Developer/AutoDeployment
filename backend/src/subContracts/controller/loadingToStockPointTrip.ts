import { Request, Response } from 'express'
import { create, getAllStockPointTrip } from '../models/loadingToStockPointTrip.ts'
import { getNumberByTruckId } from '../models/truck.ts'
import { getFuelWithoutStockTrip, updateFuelWithTripIdForStockPoint } from '../models/fuel.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import {
    create as createPaymentDues,
    getPaymentDuesWithoutTripId,
    updatePaymentDuesWithTripId
} from '../models/paymentDues.ts'
import tripLogic from '../domain/tripLogics.ts'

export const createStockPointTrip = async (req: Request, res: Response) => {
    const {
        vehicleNumber,
        transporter: { name }
    }: any = await getNumberByTruckId(req.body.truckId)
    const fuelDetails = await getFuelWithoutStockTrip(vehicleNumber)
    const paymentDetails = await getPaymentDuesWithoutTripId(vehicleNumber)
    const { id } = await create(req.body).then(async (data) =>
        createOverallTrip({ loadingPointToStockPointTripId: data.id })
    )
    await tripLogic(req.body, fuelDetails, name, id, vehicleNumber)
        .then(async (data: any) => {
            if (req.body.wantFuel !== true && fuelDetails !== null) {
                await updateFuelWithTripIdForStockPoint({ id: fuelDetails.id, tripId: id }).then(
                    async () => {
                        await updatePaymentDuesWithTripId({ id: paymentDetails?.id, tripId: id })
                        await createPaymentDues(data)
                    }
                )
            } else if (req.body.wantFuel !== true && fuelDetails === null) {
                await createPaymentDues(data)
            }
        })
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
}

export const listAllStockPointTrip = (_req: Request, res: Response) => {
    getAllStockPointTrip().then((data) => {
        const dataWithoutStock = data.filter(
            (trip) => trip.stockPointToUnloadingPointTrip.length === 0
        )
        res.status(200).json(dataWithoutStock)
    })
}
