/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
interface dateFormatArray {
    dateStr: Date
    day: number
    month: number
    year: number
    monthName: string
}

export const dateFormatDetailsFinalData = async (dateFormat: dateFormatArray[]) => {
    const filteredDates: any[] = []
    dateFormat.forEach(({ year, monthName, day }) => {
        const yearEntry =
            filteredDates.find((entry) => entry.year === year) ||
            filteredDates[filteredDates.push({ year, attendance: [] }) - 1]
        const monthEntry =
            yearEntry.attendance.find((entry: { month: string }) => entry.month === monthName) ||
            yearEntry.attendance[
                yearEntry.attendance.push({ month: monthName, datesPresent: [] }) - 1
            ]
        monthEntry.datesPresent.push(day)
    })
    return filteredDates
}
export const getDateFormatDetails = async (isoDates: Date[]) =>
    isoDates.map((dateStr) => {
        const date = dayjs.utc(dateStr)
        return {
            dateStr,
            day: date.date() + 1,
            month: date.month() + 1,
            year: date.year(),
            monthName: date.format('MMMM')
        }
    })
