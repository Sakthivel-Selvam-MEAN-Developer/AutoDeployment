import { Request, Response } from 'express'
import { create, getAllDriver } from '../models/driver.ts'
import { getAllDriverAttendanceDetails } from '../models/driverAttendance.ts'
import { driverAttenance } from '../domain/driverAttenance.ts'

export const createDriver = async (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(500))
}
export const listAllDriver = async (_req: Request, res: Response) => {
    getAllDriver()
        .then((data) => res.status(200).json(data))
        .catch(() => res.status(500))
}
export const fillterDriverByAttendance = async (_req: Request, res: Response) => {
    const data = await getAllDriver()
    const driverIds = data.map((driver) => driver.id)
    const attendanceDetails = await getAllDriverAttendanceDetails(driverIds)
    driverAttenance(data, res, attendanceDetails)
}
