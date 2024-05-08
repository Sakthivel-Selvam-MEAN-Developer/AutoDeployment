import { Request, Response } from 'express'
import {
    createTripSalary as create,
    getTripSalaryDetailsByLoactionId
} from '../models/tripSalary.ts'

export const createTripSalaryDetails = async (req: Request, res: Response) => {
    await create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
export interface RequestQuery {
    cementCompanyId: string
    loadingPointId: string
    unloadingPointId: string
    stockPointId: string
}

export const getTripSalaryDetails = async (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => {
    const { loadingPointId, unloadingPointId, stockPointId } = req.query
    getTripSalaryDetailsByLoactionId(loadingPointId, unloadingPointId, stockPointId)
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
