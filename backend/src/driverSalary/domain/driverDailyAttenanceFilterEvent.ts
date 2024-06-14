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

export const findcurrentMonth = (currentYear: any) =>
    currentYear?.attendance.find(
        (attendanceMonth: { month: string }) => attendanceMonth.month === dayjs().format('MMMM')
    )
const singleDriverData = {
    id: 0,
    mobileNumber: '',
    name: ''
}
export const driverAttenanceList = async (
    currentYear: Attendance,
    currentMonth: Attendance,
    attendanceData: attendanceDetailsProps,
    driverList: driverProps[],
    data: dataProps[]
) => {
    if (
        !currentYear ||
        !currentMonth ||
        !currentMonth.datesPresent.includes(parseInt(dayjs().format('DD')))
    ) {
        const singleDriver =
            data.find((driver) => driver.id === attendanceData.driverId) || singleDriverData
        driverList.push(singleDriver)
    }
}

export const driverAttenanceMonthValidation = async (
    attendanceData: attendanceDetailsProps,
    data: dataProps[],
    driverList: driverProps[]
) => {
    const currentYear = await findcurrentYear(attendanceData)
    const currentMonth = findcurrentMonth(currentYear)
    await driverAttenanceList(currentYear, currentMonth, attendanceData, driverList, data)
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
    attendanceDetails.forEach((attendanceData: attendanceDetailsProps) => {
        driverAttenanceMonthValidation(attendanceData, data, driverList)
    })
    const attendandedDriverIds = driverAttenanceId(attendanceDetails)
    const excludeDriver = await driverAttenanceexclude(data, attendandedDriverIds, driverList)
    res.status(200).json(excludeDriver)
}
