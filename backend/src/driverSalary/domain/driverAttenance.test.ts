import { Response } from 'express'
import { driverAttenance } from './driverAttenance.ts'

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

const attendanceDetails = [
    {
        id: 1,
        name: 'sakthi',
        mobileNumber: '09876543'
    },
    {
        id: 2,
        name: 'ravi',
        mobileNumber: '345435'
    },
    {
        id: 3,
        name: 'name',
        mobileNumber: '53453245'
    },
    {
        id: 14,
        name: 'fsdaf',
        mobileNumber: '454356325'
    }
]
const getAllDriver = [
    {
        id: 1,
        driverId: 3,
        attendance: [
            {
                year: 2024,
                attendance: [
                    {
                        month: 'June',
                        datesPresent: [7]
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        driverId: 1,
        attendance: [
            {
                year: 2024,
                attendance: [
                    {
                        month: 'June',
                        datesPresent: [7, 27]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        driverId: 2,
        attendance: [
            {
                year: 2024,
                attendance: [
                    {
                        month: 'June',
                        datesPresent: [7, 27]
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        driverId: 14,
        attendance: [
            {
                year: 2024,
                attendance: [
                    {
                        month: 'June',
                        datesPresent: [20]
                    }
                ]
            }
        ]
    }
]
describe('when driver attendance event clicking', () => {
    test('should get all driver attendance details', async () => {
        const actual = driverAttenance(attendanceDetails, mockRes, getAllDriver)
        expect(actual).toEqual(undefined)
    })
})
