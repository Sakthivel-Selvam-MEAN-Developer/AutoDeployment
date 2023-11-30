import { Request, Response } from 'express'
import {  getAllTrip } from '../models/factoryToCustomerTrip'


export const listAllTrip = (_req: Request, res: Response) => {
    getAllTrip().then((data) => res.status(200).json(data))
}

// export const postTrip = (req: Request, res: Response) => {
//     create(req.body).then((data) => res.status(200).json(data))
// }