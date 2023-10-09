import fetchTraccarStops from '../jobs/fetchTraccarStops'

const fetchTraccarData = (req: Request, res: Response) => {
    const { vehicleNumber, from, to } = req.query
    fetchTraccarStops(vehicleNumber, from, to).then(res.send(200))
}

export default fetchTraccarData
