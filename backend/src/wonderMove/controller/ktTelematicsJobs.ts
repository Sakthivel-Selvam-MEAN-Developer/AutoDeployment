import { Request, Response } from 'express'
import { fetchDeviceDetails } from '../jobs/ktTelematics/fetchVehicles.ts'

interface RequestQuery {
    authToken: string
}
const ktTelematicsDeviceData = (
    req: Request<object, object, object, RequestQuery>,
    res: Response
) => {
    const { authToken } = req.query
    fetchDeviceDetails(authToken).then(() => res.sendStatus(200))
}

export default ktTelematicsDeviceData
