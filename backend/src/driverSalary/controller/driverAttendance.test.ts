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
const mockDailyAttendanceReqBody = {
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
const mockUpdateDriverAttendanceDetailsData = [
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

const mockGetDriverAttendanceDetailsData = {
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
        await createDriverAttendance(mockDailyAttendanceReqBody, mockRes)
        expect(mockCreateDriverDailyAttendance).toHaveBeenCalledWith({
            attendance: mockAttendanceObj,
            driverId: 1
        })
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledWith(
            mockDailyAttendanceReqBody.body[0]
        )
        expect(mockCreateDriverDailyAttendance).toHaveBeenCalledTimes(1)
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledTimes(1)
    })
    test('should update driver daily attendance details', async () => {
        mockGetDriverAttendanceDetails.mockResolvedValue(mockGetDriverAttendanceDetailsData)
        mockUpdateDriverAttendanceDetails.mockResolvedValue(mockUpdateDriverAttendanceDetailsData)
        await createDriverAttendance(mockDailyAttendanceReqBody, mockRes)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledWith(
            mockGetDriverAttendanceDetailsData.id,
            mockGetDriverAttendanceDetailsData.attendance
        )
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledWith(
            mockDailyAttendanceReqBody.body[0]
        )
        expect(mockGetDriverAttendanceDetails).toHaveBeenCalledTimes(2)
        expect(mockUpdateDriverAttendanceDetails).toHaveBeenCalledTimes(1)
    })
})
