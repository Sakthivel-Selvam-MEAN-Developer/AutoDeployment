import { Request, Response } from 'express'
import {
    create,
    updateTransporterBalance,
    getAllTrip,
    getTripByVehicleNumber
} from '../models/loadingToUnloadingTrip.ts'
import tripLogic from '../domain/tripLogics.ts'
import { getNumberByTruckId } from '../models/truck.ts'
import { create as createPaymentDues } from '../models/paymentDues.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'

export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}

export const createTrip = async (req: Request, res: Response) => {
    const {
        vehicleNumber,
        transporter: { name }
    }: any = await getNumberByTruckId(req.body.truckId)
    const fuelDetails = await getFuelWithoutTrip(vehicleNumber)
    const { id } = await create(req.body)
    await tripLogic(req.body, fuelDetails, name, id)
        .then(async (data: any) => {
            if (req.body.wantFuel !== true && fuelDetails !== null) {
                await updateFuelWithTripId({ id: fuelDetails.id, tripId: id }).then(async () => {
                    await createPaymentDues(data)
                })
            } else if (req.body.wantFuel !== true && fuelDetails === null) {
                await createPaymentDues(data)
            }
        })
        .then(() => res.sendStatus(200))
        .catch((e) => console.log(e))
}

export const updateBalance = (req: Request, res: Response) => {
    updateTransporterBalance(req.body).then((data) => res.status(200).json(data))
}

export const ListTripByVehicleNumber = (req: Request, res: Response) => {
    getTripByVehicleNumber(req.params.trucknumber).then((data) => res.status(200).json(data))
}
