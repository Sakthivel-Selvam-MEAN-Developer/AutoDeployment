import { Response } from 'express'
import dayjs from 'dayjs'
import { driverAttenance } from './driverDailyAttenanceFilterEvent.ts'

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

const attendanceDetails = [
    { id: 52, name: 'Ravishankar Venkatasamy', mobileNumber: '11111' },
    { id: 53, name: 'karthik', mobileNumber: '222222222' }
]

const getAllDriver = [
    {
        id: 14,
        driverId: 53,
        attendance: [
            {
                year: dayjs().year(),
                attendance: [
                    {
                        month: 'May',
                        datesPresent: [parseInt(dayjs().format('DD'))]
                    }
                ]
            }
        ]
    },
    {
        id: 15,
        driverId: 52,
        attendance: [
            {
                year: dayjs().year(),
                attendance: [
                    {
                        month: dayjs().format('MMMM').toString(),
                        datesPresent: [parseInt(dayjs().format('DD'))]
                    }
                ]
            }
        ]
    }
]

describe('when driver attendance event clicking', () => {
    test('should get all driver attendance details', async () => {
        await driverAttenance(attendanceDetails, mockRes, [getAllDriver[0]])
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith([
            { id: 52, name: 'Ravishankar Venkatasamy', mobileNumber: '11111' },
            { id: 53, name: 'karthik', mobileNumber: '222222222' }
        ])
    })
    test('should not get all driver attendance details', async () => {
        await driverAttenance(attendanceDetails, mockRes, getAllDriver)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith([
            { id: 53, name: 'karthik', mobileNumber: '222222222' }
        ])
    })
})
