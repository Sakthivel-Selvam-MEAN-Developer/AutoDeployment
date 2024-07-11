import { Request, Response } from 'express'
import {
    getAllTruck,
    getTruckByTransporter,
    create,
    getNumberByTruckId,
    updateTransporterId
} from '../models/truck.ts'
import { handlePrismaError } from '../../../prisma/errorHandler.ts'

export const listAllTruck = (_req: Request, res: Response) => {
    getAllTruck()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const createTruck = (req: Request, res: Response) => {
    create(req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => handlePrismaError(error, res))
}
export const listTruckByTransporter = (req: Request, res: Response) => {
    getTruckByTransporter(req.params.transporterName)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const listTruckByVehicleNumber = (req: Request, res: Response) => {
    const { id } = req.params
    getNumberByTruckId(parseInt(id))
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const updateTransporterIdInTruck = (req: Request, res: Response) => {
    const { transporterId, truckId } = req.body
    updateTransporterId(transporterId, truckId)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500).json('Truck has an Active Trip'))
}
