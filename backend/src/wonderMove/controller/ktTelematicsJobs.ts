import { Request, Response } from 'express'
import { fetchDeviceDetails } from '../jobs/ktTelematics/fetchVehicles.ts'

const ktTelematicsDeviceData = (req: Request, res: Response) => {
    const { authToken }: any = req.query
    fetchDeviceDetails(authToken).then(() => res.sendStatus(200))
}

export default ktTelematicsDeviceData
