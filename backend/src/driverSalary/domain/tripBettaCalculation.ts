import dayjs from 'dayjs'

const monthNames = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
interface monthData {
    month: string
    datesPresent: number[]
}
interface yearData {
    year: number
    attendance: monthData[]
}
const getSelectedYearAndMonth = (date: number) => {
    const selectedYear = dayjs.unix(date).year()
    const selectedMonth = dayjs.unix(date).month()
    return { selectedYear, selectedMonth }
}
const checkMonthLength = (Month: monthData[]) => {
    if (Month.length === 0) return 0
    return Month[0].datesPresent.length
}
const findSelectedMonth = (Year: yearData[], selectedMonth: number) => {
    if (Year.length === 0) return []
    return Year[0].attendance.filter(
        ({ month }: monthData) => month === monthNames[`${selectedMonth}`]
    )
}
const totalBetta = (dailyBetta: number | null, totalDays: number) => {
    if (dailyBetta === null) return 0
    return totalDays * dailyBetta
}
export const tripBettaCalculation = async (tripDetails: any, date: number | undefined) => {
    if (date === undefined) return 0
    const { selectedYear, selectedMonth } = getSelectedYearAndMonth(date)
    const driverAttendance = tripDetails.driver.driverAttendance[0]
    const Year = driverAttendance.attendance.filter(({ year }: yearData) => year === selectedYear)
    const Month = findSelectedMonth(Year, selectedMonth)
    const totalDays = checkMonthLength(Month)
    return totalBetta(tripDetails.dailyBetta, totalDays)
}
