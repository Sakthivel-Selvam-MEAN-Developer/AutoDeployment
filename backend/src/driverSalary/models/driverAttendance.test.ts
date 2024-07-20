import { JsonArray } from '@prisma/client/runtime/library'
import prisma from '../../../prisma'
import {
    create,
    getAllDriverAttendanceDetails,
    getDriverAttendanceDetails,
    updateDriverAttendanceDetails,
    upsertDriverAttendanceDetails
} from './driverAttendance'
import seedDriver from '../seed/driver.ts'
import { create as createDriver } from './driver.ts'

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
        await prisma().$transaction(async (prismas) => {
            await createDriver(seedDriver, prismas)
        })
        const actual = await create(mockCreateDriverDailyAttendanceData)
        expect(actual.driverId).toBe(mockCreateDriverDailyAttendanceData.driverId)
    })
    test('should able to update driver daily attendance details', async () => {
        await prisma().$transaction(async (prismas) => {
            await createDriver(seedDriver, prismas)
        })
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
        await prisma().$transaction(async (prismas) => {
            await createDriver(seedDriver, prismas)
        })
        await create(mockCreateDriverDailyAttendanceData)
        const actual = await getDriverAttendanceDetails(
            mockCreateDriverDailyAttendanceData.driverId
        )
        expect(actual?.driverId).toStrictEqual(mockCreateDriverDailyAttendanceData.driverId)
    })
    test('should able to get driver daily attendance details', async () => {
        await prisma().$transaction(async (prismas) => {
            await createDriver(seedDriver, prismas)
        })
        await create(mockCreateDriverDailyAttendanceData)
        const actual = await getAllDriverAttendanceDetails([
            mockCreateDriverDailyAttendanceData.driverId
        ])
        expect(actual[0].attendance).toStrictEqual(mockCreateDriverDailyAttendanceData.attendance)
    })
    test('should able to upsertDriverAttendanceDetails', async () => {
        await prisma().$transaction(async (prismas) => {
            await createDriver(seedDriver, prismas)
        })
        const existingId = 1
        const actual = await upsertDriverAttendanceDetails(
            existingId,
            mockCreateDriverDailyAttendanceData.driverId,
            [mockCreateDriverDailyAttendanceData.attendance]
        )
        expect(actual.attendance[0]).toStrictEqual(mockCreateDriverDailyAttendanceData.attendance)
    })
})
