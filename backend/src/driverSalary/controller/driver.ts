import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { create, getAllDriver } from '../models/driver.ts'
import { getAllDriverAttendanceDetails } from '../models/driverAttendance.ts'

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
interface driverProps {
    id: number
    name: string
    mobileNumber: string
}
export const fillterDriverByAttendance = async (_req: Request, res: Response) => {
    const driverList: driverProps[] = []
    const data = await getAllDriver()
    const driverIds = data.map((driver) => driver.id)
    const attendanceDetails = await getAllDriverAttendanceDetails(driverIds)

    attendanceDetails.forEach((attendanceData: any) => {
        const currentYear = attendanceData.attendance.find(
            (attendanceYear: { year: number }) => attendanceYear?.year === dayjs().year()
        )
        const currentMonth = currentYear?.attendance.find(
            (attendanceMonth: { month: string }) => attendanceMonth.month === dayjs().format('MMMM')
        )
        if (!currentYear) {
            const singleDriver = data.find((driver) => driver.id === attendanceData.driverId) || {
                id: 0,
                mobileNumber: '',
                name: ''
            }
            driverList.push(singleDriver)
        } else if (!currentMonth) {
            const singleDriver = data.find((driver) => driver.id === attendanceData.driverId) || {
                id: 0,
                mobileNumber: '',
                name: ''
            }
            driverList.push(singleDriver)
        } else if (!currentMonth.datesPresent.includes(parseInt(dayjs().format('DD')))) {
            const singleDriver = data.find((driver) => driver.id === attendanceData.driverId) || {
                id: 0,
                mobileNumber: '',
                name: ''
            }
            driverList.push(singleDriver)
        }
    })
    const attendandedDriverIds = attendanceDetails.map(
        (attendandedDriver) => attendandedDriver.driverId
    )
    const excludeDriver = data
        .filter((driver) => !attendandedDriverIds.includes(driver.id))
        .concat(driverList)
    res.status(200).json(excludeDriver)
}
