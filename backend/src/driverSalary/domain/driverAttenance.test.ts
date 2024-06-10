import { Response } from 'express'
import { driverAttenance } from './driverAttenance.ts'

const mockRes = {
    sendStatus: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
} as unknown as Response

const attendanceDetails = [
    { id: 1, name: 'sakthi', mobileNumber: '09876543' },
    { id: 2, name: 'ravi', mobileNumber: '345435' },
    { id: 3, name: 'name', mobileNumber: '53453245' },
    { id: 14, name: 'fsdaf', mobileNumber: '454356325' },
    { id: 15, name: 'asdssa', mobileNumber: '4355234' },
    { id: 24, name: 'Ravishankar Venkatasamy', mobileNumber: '53245435' },
    { id: 25, name: 'ravibuddy', mobileNumber: '345345' },
    { id: 26, name: 'Ravishankar Venkatasamy', mobileNumber: '5634535' },
    { id: 33, name: 'pockets', mobileNumber: '3532453' },
    { id: 34, name: 'turmeric', mobileNumber: '342352345' },
    { id: 35, name: 'young', mobileNumber: '3423423' },
    { id: 36, name: 'pooja', mobileNumber: '23441234' },
    { id: 37, name: 'ravis', mobileNumber: '4354325243' }
]

const getAllDriver = [
    {
        id: 1,
        driverId: 3,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [7] }] }]
    },
    {
        id: 3,
        driverId: 1,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [7, 27] }] }]
    },
    {
        id: 2,
        driverId: 2,
        attendance: [
            { year: 2024, attendance: [{ month: 'June', datesPresent: [7, 27, 8, 8, 8] }] }
        ]
    },
    {
        id: 4,
        driverId: 14,
        attendance: [
            { year: 2024, attendance: [{ month: 'June', datesPresent: [20, 8, 8, 8, 8, 8, 8] }] }
        ]
    },
    {
        id: 5,
        driverId: 15,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [8] }] }]
    },
    {
        id: 6,
        driverId: 24,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [8] }] }]
    },
    {
        id: 7,
        driverId: 25,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [8] }] }]
    },
    {
        id: 8,
        driverId: 26,
        attendance: [
            { year: 2024, attendance: [{ month: 'June', datesPresent: [10, 13, 14, 15] }] }
        ]
    },
    {
        id: 9,
        driverId: 33,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [10] }] }]
    },
    {
        id: 10,
        driverId: 34,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [10] }] }]
    },
    {
        id: 11,
        driverId: 35,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [10] }] }]
    },
    {
        id: 12,
        driverId: 37,
        attendance: [{ year: 2024, attendance: [{ month: 'June', datesPresent: [10] }] }]
    }
]

describe('when driver attendance event clicking', () => {
    test('should get all driver attendance details', async () => {
        driverAttenance(attendanceDetails, mockRes, getAllDriver)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith([
            { id: 36, name: 'pooja', mobileNumber: '23441234' }
        ])
    })
    test('should not get all driver attendance details', async () => {
        attendanceDetails.splice(11, 1)
        driverAttenance(attendanceDetails, mockRes, getAllDriver)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.json).toHaveBeenCalledWith([])
    })
})
