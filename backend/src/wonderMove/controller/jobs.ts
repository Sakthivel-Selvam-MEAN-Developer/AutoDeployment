import fetchTraccarStops from '../jobs/fetchTraccarStops'
import { Request, Response } from 'express'
const fetchTraccarData = (req: Request, res: Response) => {
    const { vehicleNumber, from, to } = req.query
    // @ts-ignore
    fetchTraccarStops(vehicleNumber, from, to).then(() => res.sendStatus(200))
}

export default fetchTraccarData
