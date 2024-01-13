import { Request, Response } from 'express'
import { create } from '../models/pricePointMarker.ts'

export const createPricePointMarker = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
