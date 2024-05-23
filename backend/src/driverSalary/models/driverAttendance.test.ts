import {
    create,
    getAllDriverAttendanceDetails,
    getDriverAttendanceDetails,
    updateDriverAttendanceDetails
} from './driverAttendance'
import { JsonArray } from '@prisma/client/runtime/library'

const mockCreateDriverDailyAttendanceData = {
    driverId: 1,
    attendance: [
        {
            year: 2024,
            attendance: [
                {
                    month: 'May',
                    datesPresent: [20]
                }
            ]
        }
    ]
}
const mockUpdateDriverDailyAttendanceData = {
    driverId: 1,
    attendance: [
        {
            year: 2024,
            attendance: [
                {
                    month: 'May',
                    datesPresent: [20]
                }
            ]
        }
    ]
}

describe('Driver Daily Attendance model', () => {
    test('should able to create driver daily attendance details', async () => {
        const actual = await create(mockCreateDriverDailyAttendanceData)
        expect(actual.driverId).toBe(mockCreateDriverDailyAttendanceData.driverId)
    })
    test('should able to update driver daily attendance details', async () => {
        await create(mockCreateDriverDailyAttendanceData)
        const mockDriverAttendanceDetails = await getDriverAttendanceDetails(
            mockCreateDriverDailyAttendanceData.driverId
        )
        const actual = await updateDriverAttendanceDetails(
            mockDriverAttendanceDetails?.id,
            mockDriverAttendanceDetails?.attendance as JsonArray[]
        )
        expect(actual?.attendance).toStrictEqual(mockUpdateDriverDailyAttendanceData.attendance)
    })
    test('should able to get driver daily attendance details', async () => {
        await create(mockCreateDriverDailyAttendanceData)
        const actual = await getDriverAttendanceDetails(
            mockCreateDriverDailyAttendanceData.driverId
        )
        expect(actual?.driverId).toStrictEqual(mockCreateDriverDailyAttendanceData.driverId)
    })
    test('should able to get driver daily attendance details', async () => {
        await create(mockCreateDriverDailyAttendanceData)
        const actual = await getAllDriverAttendanceDetails([
            mockCreateDriverDailyAttendanceData.driverId
        ])
        expect(actual[0].attendance).toStrictEqual(mockCreateDriverDailyAttendanceData.attendance)
    })
})
