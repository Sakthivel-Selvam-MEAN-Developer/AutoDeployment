import { Request, Response } from 'express'
import { create } from '../models/stockPointToUnloadingPoint.ts'
import { create as createOverallTrip } from '../models/overallTrip.ts'

export const createStockPointToUnloadingPointTrip = (req: Request, res: Response) => {
    create(req.body)
        .then((data) => createOverallTrip({ stockPointToUnloadingPointTripId: data.id }))
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
