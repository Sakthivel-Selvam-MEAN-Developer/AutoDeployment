import { Request, Response } from 'express'
import fetchTraccarStops from '../jobs/fetchTraccarStops.ts'

const fetchTraccarData = (req: Request, res: Response) => {
    const { vehicleNumber, from, to } = req.query
    // @ts-expect-error param is a string
    fetchTraccarStops(vehicleNumber, from, to).then(() => res.sendStatus(200))
}

export default fetchTraccarData
