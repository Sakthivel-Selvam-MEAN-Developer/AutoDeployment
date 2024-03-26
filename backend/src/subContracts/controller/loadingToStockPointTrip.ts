import { Request, Response } from 'express'
import { create, getAllStockPointTrip } from '../models/loadingToStockPointTrip.ts'
import { getNumberByTruckId } from '../models/truck.ts'
import { getFuelWithoutTrip, updateFuelWithTripId } from '../models/fuel.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'
import {
    create as createPaymentDues,
    getPaymentDuesWithoutTripId,
    updatePaymentDuesWithTripId
} from '../models/paymentDues.ts'
import tripLogic from '../domain/tripLogics.ts'
import { getCementCompanyByLocation } from '../models/loadingPoint.ts'

export const createStockPointTrip = async (req: Request, res: Response) => {
    try {
        const {
            vehicleNumber,
            transporter: { name }
        } = (await getNumberByTruckId(req.body.truckId)) || {
            vehicleNumber: '',
            transporter: { name: '' }
        }
        const companyDetails = await getCementCompanyByLocation(req.body.loadingPointId)
        const fuelDetails = await getFuelWithoutTrip(vehicleNumber)
        const paymentDetails = await getPaymentDuesWithoutTripId(vehicleNumber)
        const { id } = await create(req.body).then(async (data) =>
            createOverallTrip({ loadingPointToStockPointTripId: data.id })
        )
        await tripLogic(
            req.body,
            fuelDetails,
            name,
            id,
            vehicleNumber,
            'LoadingToStock',
            companyDetails?.cementCompany.advanceType
        )
            .then(async (data) => {
                if (req.body.wantFuel !== true && fuelDetails !== null) {
                    await updateFuelWithTripId({ id: fuelDetails.id, overallTripId: id }).then(
                        async () => {
                            await updatePaymentDuesWithTripId({
                                id: paymentDetails?.id,
                                overallTripId: id
                            })
                            if (req.body.totalTransporterAmount !== 0) await createPaymentDues(data)
                        }
                    )
                } else if (req.body.wantFuel !== true && fuelDetails === null) {
                    if (req.body.totalTransporterAmount !== 0) await createPaymentDues(data)
                }
            })
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
    } catch (error) {
        res.status(500).json(error)
    }
}
export const listAllStockPointTrip = (_req: Request, res: Response) => {
    getAllStockPointTrip()
        .then((data) => {
            const dataWithoutStock = data.filter(
                (trip) => trip.stockPointToUnloadingPointTrip.length === 0
            )
            res.status(200).json(dataWithoutStock)
        })
        .catch(() => res.sendStatus(500))
}
