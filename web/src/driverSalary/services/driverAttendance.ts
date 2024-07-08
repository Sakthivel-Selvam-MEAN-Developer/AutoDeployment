import { axiosInstance, getData } from '../../apiCalls'

export const markDriverDailyAttendance = (driverId: number[]) =>
    axiosInstance.post(`/driver/dailyAttendance`, driverId).then(getData)

export const getDriverDailyAttendanceById = async (driverId: number) =>
    axiosInstance.get(`/driver/dailyAttendance`, { params: { driverId } }).then(getData)

export const upsertDriverAttendanceById = async (
    id: number | undefined,
    driverId: number,
    dates: Date[]
) => {
    const localISODateString = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0')

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
    }
    const isoDates = dates.map((date) => localISODateString(date))
    axiosInstance
        .put(`/driver/upsert/bulkAttendance`, isoDates, { params: { id, driverId } })
        .then(getData)
}
