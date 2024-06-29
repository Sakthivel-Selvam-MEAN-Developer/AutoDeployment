/* eslint-disable max-lines-per-function */
import { Request, Response } from 'express'
import dayjs from 'dayjs'
import {
    create,
    getDriverAttendanceDetails,
    updateDriverAttendanceDetails,
    upsertDriverAttendanceDetails
} from '../models/driverAttendance.ts'
import {
    dateFormatDetailsFinalData,
    getDateFormatDetails
} from '../domain/driverBulkAttenanceEvent.ts'

interface monthProps {
    month: string
    datesPresent: number[]
}
export interface jsonProps {
    year: number
    attendance: monthProps[]
}
export interface Attendance {
    month: string
    datesPresent: number[]
}
export interface filterData {
    year: number
    attendance: Attendance[]
}

export const attendanceObjYear = {
    year: dayjs().year(),
    attendance: [
        {
            month: dayjs().format('MMMM'),
            datesPresent: [parseInt(dayjs().format('DD'))]
        }
    ]
}
const updateCurrentYear = (attendance: jsonProps[]) => attendance.push(attendanceObjYear)

const updateCurrentMonth = (currentYearData: jsonProps | undefined) => {
    const attendanceObj = {
        month: dayjs().format('MMMM'),
        datesPresent: [parseInt(dayjs().format('DD'))]
    }
    return currentYearData?.attendance?.push(attendanceObj)
}
const getDriverAttendance = async (driverId: number) =>
    getDriverAttendanceDetails(driverId).then(async (attendanceDetails: any) => {
        if (attendanceDetails === null) {
            const attendanceJson = []
            attendanceJson.push(attendanceObjYear)
            return create({ attendance: attendanceJson, driverId }).then((data) => data)
        }
        const currentYearData = attendanceDetails.attendance.find(
            (details: { year: number }) => details.year === dayjs().year()
        )
        const currentMonthData = currentYearData?.attendance.find(
            (month: { month: string }) => month.month === dayjs().format('MMMM')
        )
        if (!currentYearData) updateCurrentYear(attendanceDetails.attendance)
        else if (!currentMonthData) updateCurrentMonth(currentYearData)
        else currentMonthData?.datesPresent.push(parseInt(dayjs().format('DD')))
        return updateDriverAttendanceDetails(attendanceDetails.id, attendanceDetails.attendance)
    })
export const createDriverAttendance = async (req: Request, res: Response) => {
    const driverIds = req.body
    await Promise.all(driverIds.map(getDriverAttendance)).then((data) => res.status(200).json(data))
}
interface attendanceQuery {
    driverId: string
}
interface QProp {
    id: string
    driverId: string
}
export const getDriverAttendanceDetailsById = async (
    req: Request<object, object, object, attendanceQuery>,
    res: Response
) => {
    const { driverId } = req.query
    const attendanceDetails = await getDriverAttendanceDetails(parseInt(driverId))
    res.status(200).json(attendanceDetails)
}
export const upsertDriverAttendanceDetailsById = async (
    req: Request<object, object, Date[], QProp>,
    res: Response
) => {
    const { id, driverId } = req.query
    const dateFormat = await getDateFormatDetails(req.body)
    const filteredDates = await dateFormatDetailsFinalData(dateFormat)
    await upsertDriverAttendanceDetails(parseInt(id), parseInt(driverId), filteredDates).then(
        (response) => {
            res.status(200).json(response)
        }
    )
}
