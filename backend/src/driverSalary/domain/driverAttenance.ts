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
    currentYear.attendance.find(
        (attendanceMonth: { month: string }) => attendanceMonth.month === dayjs().format('MMMM')
    )
const singleDriverData = {
    id: 0,
    mobileNumber: '',
    name: ''
}
export const driverAttenanceList = (
    currentYear: Attendance,
    currentMonth: Attendance,
    attendanceData: attendanceDetailsProps,
    driverList: driverProps[],
    data: dataProps[]
) => {
    let singleDriver: driverProps = singleDriverData
    if (!currentYear && !currentMonth) {
        singleDriver =
            data.find((driver) => driver.id === attendanceData.driverId) || singleDriverData
    } else if (!currentMonth.datesPresent.includes(parseInt(dayjs().format('DD')))) {
        driverList.push(singleDriver)
    }
}

export const driverAttenanceMonthValidation = async (
    attendanceData: attendanceDetailsProps,
    data: dataProps[],
    driverList: driverProps[]
) => {
    const currentYear = await findcurrentYear(attendanceData)
    const currentMonth = await findcurrentMonth(currentYear)
    driverAttenanceList(currentYear, currentMonth, attendanceData, driverList, data)
}

export const driverAttenanceId = (attendanceDetails: attendanceDetailsProps[]) =>
    attendanceDetails.map((attendandedDriver) => attendandedDriver.driverId)

export const driverAttenanceexcludeDriver = (
    data: dataProps[],
    attendandedDriverIds: driverIds,
    driverList: driverProps[]
) => data.filter((driver) => !attendandedDriverIds.includes(driver.id)).concat(driverList)

export const driverAttenance = (
    data: dataProps[],
    res: Response,
    attendanceDetails: attendanceDetailsProps[] = []
) => {
    const driverList: driverProps[] = []
    attendanceDetails.forEach((attendanceData: attendanceDetailsProps) => {
        driverAttenanceMonthValidation(attendanceData, data, driverList)
    })
    const attendandedDriverIds = driverAttenanceId(attendanceDetails)
    const excludeDriver = driverAttenanceexcludeDriver(data, attendandedDriverIds, driverList)
    res.status(200).json(excludeDriver)
}
