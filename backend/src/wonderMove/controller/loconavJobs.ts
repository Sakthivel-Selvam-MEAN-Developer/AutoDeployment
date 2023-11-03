import { Request, Response } from 'express'
import { fetchDeviceDetails } from '../jobs/loconav/fetchVehicles.ts'

const loconavDeviceData = (req: Request, res: Response) => {
    const { authToken }: any = req.query
    fetchDeviceDetails(authToken).then(() => res.sendStatus(200))
}

export default loconavDeviceData
