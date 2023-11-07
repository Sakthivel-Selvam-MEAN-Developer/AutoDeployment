import { Request, Response } from 'express'
import fetchTraccarStops from '../jobs/fetchTraccarStops.ts'

const fetchTraccarData = (req: Request, res: Response) => {
    const { vehicleNumber, from, to } = req.query
    // eslint-disable-next-line
    // @ts-ignore
    fetchTraccarStops(vehicleNumber, from, to).then(() => res.sendStatus(200))
}

export default fetchTraccarData
