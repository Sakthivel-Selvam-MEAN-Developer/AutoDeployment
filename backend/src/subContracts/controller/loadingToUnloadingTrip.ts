import { Request, Response } from 'express'
import { create, getAllTrip, getTripByVehicleNumber } from '../models/loadingToUnloadingTrip.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import tripLogic from '../domain/tripLogics.ts'
import { getNumberByTruckId } from '../models/truck.ts'
import {
    create as createPaymentDues,
    getPaymentDuesWithoutTripId,
    updatePaymentDuesWithTripId
} from '../models/paymentDues.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'

export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}
export const createTrip = async (req: Request, res: Response) => {
    try {
        const {
            vehicleNumber,
            transporter: { name }
        } = (await getNumberByTruckId(req.body.truckId)) || {
            vehicleNumber: '',
            transporter: { name: '' }
        }
        const fuelDetails = await getFuelWithoutTrip(vehicleNumber)
        const paymentDetails = await getPaymentDuesWithoutTripId(vehicleNumber)
        const { id } = await create(req.body).then(async (data) =>
            createOverallTrip({ loadingPointToUnloadingPointTripId: data.id })
        )
        await tripLogic(req.body, fuelDetails, name, id, vehicleNumber)
            .then(async (data) => {
                if (req.body.wantFuel !== true && fuelDetails !== null) {
                    await updateFuelWithTripId({ id: fuelDetails.id, overallTripId: id }).then(
                        async () => {
                            await updatePaymentDuesWithTripId({
                                id: paymentDetails?.id,
                                overallTripId: id
                            })
                            await createPaymentDues(data)
                        }
                    )
                } else if (req.body.wantFuel !== true && fuelDetails === null) {
                    await createPaymentDues(data)
                }
            })
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
    } catch (error) {
        res.status(500).json(error)
    }
}

export const ListTripByVehicleNumber = (req: Request, res: Response) => {
    getTripByVehicleNumber(req.params.trucknumber)
        .then((data) => res.status(200).json(data))
        .catch(() => res.sendStatus(500))
}
