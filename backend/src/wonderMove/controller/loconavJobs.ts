import { fetchDeviceDetails } from "../jobs/loconav/fetchVehicles"
import { Request, Response } from 'express'

const loconavDeviceData = (req: Request, res: Response) => {
    const { authToken } = req.headers
    fetchDeviceDetails(authToken).then(() => res.sendStatus(200))
}

export default loconavDeviceData