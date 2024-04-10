import { Request, Response } from 'express'
import { fetchDeviceDetails } from '../jobs/loconav/fetchVehicles.ts'

interface RequestQuery {
    authToken: string
}
const loconavDeviceData = (req: Request<object, object, object, RequestQuery>, res: Response) => {
    const { authToken } = req.query
    fetchDeviceDetails(authToken).then(() => res.sendStatus(200))
}

export default loconavDeviceData
