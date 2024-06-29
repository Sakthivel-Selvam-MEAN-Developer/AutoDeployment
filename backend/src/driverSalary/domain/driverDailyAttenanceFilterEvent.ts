import { JsonValue } from '@prisma/client/runtime/library'
import dayjs from 'dayjs'
import { Response } from 'express'

interface driverProps {
    id: number
    name: string
    mobileNumber: string
}
interface dataProps {
    id: number
    name: string
    mobileNumber: string
}
interface Attendance {
    month: string
    datesPresent: number[]
}
interface Attendance2 {
    year: number
    attendance: Attendance[]
}
interface attendanceDetailsProps {
    id: number
    driverId: number
    attendance: Attendance2[] | JsonValue[]
}
type driverIds = number[]

export const findcurrentYear = async (attendanceData: any) =>
    attendanceData.attendance.find(
        (attendanceYear: { year: number }) => attendanceYear.year === dayjs().year()
    )

interface findcurrentMonthProps {
    attendance: Attendance[]
}
export const findcurrentMonth = (currentYear: findcurrentMonthProps) =>
    currentYear?.attendance.find(
        (attendanceMonth) => attendanceMonth.month === dayjs().format('MMMM')
    )
const singleDriverData = {
    id: 0,
    mobileNumber: '',
    name: ''
}
export const driverAttenanceList = async (
    currentYear: Attendance,
    currentMonth: Attendance | undefined,
    attendanceData: attendanceDetailsProps,
    data: dataProps[]
) => {
    if (
        !currentYear ||
        !currentMonth ||
        !currentMonth.datesPresent.includes(parseInt(dayjs().format('DD')))
    ) {
        return data.find((driver) => driver.id === attendanceData.driverId) || singleDriverData
    }
}

export const driverAttenanceMonthValidation = async (
    attendanceData: attendanceDetailsProps,
    data: dataProps[]
) => {
    const currentYear = await findcurrentYear(attendanceData)
    const currentMonth = findcurrentMonth(currentYear)
    return driverAttenanceList(currentYear, currentMonth, attendanceData, data)
}

export const driverAttenanceId = (attendanceDetails: attendanceDetailsProps[]) =>
    attendanceDetails.map((attendandedDriver) => attendandedDriver.driverId)

export const driverAttenanceexclude = async (
    data: dataProps[],
    attendandedDriverIds: driverIds,
    driverList: driverProps[]
) => data.filter((driver) => !attendandedDriverIds.includes(driver.id)).concat(driverList)
type type = (data: dataProps[], res: Response, attendanceDetails: attendanceDetailsProps[]) => void
export const driverAttenance: type = async (data, res, attendanceDetails = []) => {
    const driverList: driverProps[] = []
    await Promise.all(
        attendanceDetails.map(async (attendanceData: attendanceDetailsProps) => {
            const details = await driverAttenanceMonthValidation(attendanceData, data)
            if (details !== undefined) driverList.push(details)
        })
    ).then(async () => {
        const driversIdData = driverAttenanceId(attendanceDetails)
        const finalDriverList: driverProps[] = driverList.filter((driver) => driver !== undefined)
        const excludeDriver = await driverAttenanceexclude(data, driversIdData, finalDriverList)
        res.status(200).json(excludeDriver)
    })
}
