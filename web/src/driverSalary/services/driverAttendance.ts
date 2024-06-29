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
    const isoDates = dates.map((date) => date.toISOString())
    axiosInstance
        .put(`/driver/upsert/bulkAttendance`, isoDates, { params: { id, driverId } })
        .then(getData)
}
