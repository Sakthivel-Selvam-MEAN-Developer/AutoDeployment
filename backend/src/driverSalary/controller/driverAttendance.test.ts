import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { createDriverAttendance } from './driverAttendance.ts'

const mockCreateDriverDailyAttendance = vi.fn()
const mockUpdateDriverAttendanceDetails = vi.fn()
const mockGetDriverAttendanceDetails = vi.fn()

vi.mock('../models/driverAttendance', () => ({
    create: (inputs: any) => mockCreateDriverDailyAttendance(inputs),
    updateDriverAttendanceDetails: (id: number, attendance: JSON) =>
        mockUpdateDriverAttendanceDetails(id, attendance),
    getDriverAttendanceDetails: (driverId: number) => mockGetDriverAttendanceDetails(driverId)
}))
const dailyAttendanceReqBody = {
    body: [1]
} as Request

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

const mockCreateDriverDailyAttendanceData = [
    {
        id: 1,
        attendance: [
            {
                year: dayjs().year(),
                attendance: [
                    {
                        month: dayjs().format('MMMM'),
                        datesPresent: [dayjs().format('DD')]
                    }
                ]
            }
        ],
        driverId: 1
    }
]
const updateAttendanceData = [
    {
        id: 1,
        attendance: [
            {
                year: 2024,
                attendance: [
                    {
                        month: 'May',
                        datesPresent: [19, 20]
                    }
                ]
            }
        ],
        driverId: 1
    }
]

const mockAttendanceObj = [
    {
        year: dayjs().year(),
        attendance: [
            {
                month: dayjs().format('MMMM'),
                datesPresent: [parseInt(dayjs().format('DD'))]
            }
        ]
    }
]

const driverAttendanceData = {
    id: 1,
    driverId: 1,
    attendance: [
        {
            year: 2024,
            attendance: [
                {
                    month: 'May',
                    datesPresent: [19]
                }
            ]
        }
    ]
}

describe('Driver Daily Attendance Controller', () => {
    test('should create driver daily attendance details', async () => {
        mockGetDriverAttendanceDetails.mockResolvedValue(null)
        mockCreateDriverDailyAttendance.mockResolvedValue(mockCreateDriverDailyAttendanceData)
        await createDriverAttendance(dailyAttendanceReqBody, mockRes)
        expect(mockCreateDriverDailyAttendance).toHaveBeenCalledWith({
            attendance: mockAttendanceObj,
            driverId: 1
        })
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledWith(dailyAttendanceReqBody.body[0])
        expect(mockCreateDriverDailyAttendance).toHaveBeenCalledTimes(1)
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledTimes(1)
    })
    test('should update driver daily attendance details', async () => {
        mockGetDriverAttendanceDetails.mockResolvedValue(driverAttendanceData)
        mockUpdateDriverAttendanceDetails.mockResolvedValue(updateAttendanceData)
        await createDriverAttendance(dailyAttendanceReqBody, mockRes)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledWith(
            driverAttendanceData.id,
            driverAttendanceData.attendance
        )
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledWith(dailyAttendanceReqBody.body[0])
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledTimes(2)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledTimes(1)
    })
})
const input = {
    ...driverAttendanceData,
    attendance: [
        {
            year: 2024,
            attendance: []
        }
    ]
}
describe('Driver Bulk Attendance Controller', () => {
    test('should add a year and update driver daily attendance details', async () => {
        const input = { ...driverAttendanceData, attendance: [] }
        mockGetDriverAttendanceDetails.mockResolvedValue(input)
        mockUpdateDriverAttendanceDetails.mockResolvedValue(updateAttendanceData)
        await createDriverAttendance(dailyAttendanceReqBody, mockRes)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledWith(
            driverAttendanceData.id,
            driverAttendanceData.attendance
        )
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledWith(dailyAttendanceReqBody.body[0])
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledTimes(3)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledTimes(2)
    })
    test('should add a month and update driver daily attendance details', async () => {
        mockGetDriverAttendanceDetails.mockResolvedValue(input)
        mockUpdateDriverAttendanceDetails.mockResolvedValue(updateAttendanceData)
        await createDriverAttendance(dailyAttendanceReqBody, mockRes)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledWith(
            driverAttendanceData.id,
            driverAttendanceData.attendance
        )
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledWith(dailyAttendanceReqBody.body[0])
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledTimes(4)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledTimes(3)
    })
})
