import { axiosInstance, getData } from '../../apiCalls'
import { attendanceProps } from '../components/driverAttendance/type'

export const markDriverDailyAttendance = (driverId: number[]) =>
    axiosInstance.post(`/driver/dailyAttendance`, driverId).then(getData)

export const getDriverDailyAttendanceById = async (driverId: number) =>
    axiosInstance.get(`/driver/dailyAttendance`, { params: { driverId } }).then(getData)

export const upsertDriverAttendanceById = async (
    id: number | undefined,
    driverId: number,
    attendance: attendanceProps[]
) =>
    axiosInstance
        .put(`/driver/upsert/bulkAttendance`, attendance, { params: { id, driverId } })
        .then(getData)
