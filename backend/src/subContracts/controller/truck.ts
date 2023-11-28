import { Request, Response } from 'express'
import { getAllTruck } from '../models/truck.ts'

export const listAllTruck = (_req: Request, res: Response) => {
    getAllTruck().then((data) => res.status(200).json(data))
}
