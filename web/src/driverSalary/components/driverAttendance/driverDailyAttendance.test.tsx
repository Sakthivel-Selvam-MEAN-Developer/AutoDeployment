import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import DriverDailyAttendance from './driverAttendance'

const mockGetFilteredDriverDetails = vi.fn()
const mockMarkDriverDailyAttendance = vi.fn()

vi.mock('../../services/driver', () => ({
    getFilteredDriverDetails: () => mockGetFilteredDriverDetails()
}))
vi.mock('../../services/driverAttendance', () => ({
    markDriverDailyAttendance: (driverId: number) => mockMarkDriverDailyAttendance(driverId)
}))

const mockGetFilteredDriverDetailsData = [
    {
        id: 1,
        name: 'sakthi',
        mobileNumber: '09876543'
    }
]
const mockMarkDriverDailyAttendanceData = [
    {
        id: 1,
        attendance: [
            {
                year: 2024,
                attendance: [
                    {
                        month: 'May',
                        datesPresent: [23]
                    }
                ]
            }
        ],
        driverId: 1
    }
]
describe('Bulk Daily Attendance test', () => {
    beforeEach(() => {
        mockGetFilteredDriverDetails.mockResolvedValue(mockGetFilteredDriverDetailsData)
        mockMarkDriverDailyAttendance.mockResolvedValue(mockMarkDriverDailyAttendanceData)
    })
    test('should display driver attendance details', async () => {
        expect(mockGetFilteredDriverDetails).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <DriverDailyAttendance />
            </BrowserRouter>
        )
        expect(mockGetFilteredDriverDetails).toHaveBeenCalledTimes(1)
        waitFor(() => {
            expect(screen.getByText('Driver Name')).toBeInTheDocument()
            expect(screen.getByText('Phone Number')).toBeInTheDocument()
            expect(screen.getByText('sakthi')).toBeInTheDocument()
            expect(screen.getByText('09876543')).toBeInTheDocument()
            expect(screen.getByText('Add Attendance')).toBeInTheDocument()
        })
    })
    test('should mark attendance for driver by id', async () => {
        render(
            <BrowserRouter>
                <DriverDailyAttendance />
            </BrowserRouter>
        )
        expect(mockGetFilteredDriverDetails).toHaveBeenCalledTimes(2)
        waitFor(() => {
            expect(screen.getByText('Driver Name')).toBeInTheDocument()
            expect(screen.getByText('Phone Number')).toBeInTheDocument()
            expect(screen.getByText('sakthi')).toBeInTheDocument()
            expect(screen.getByText('09876543')).toBeInTheDocument()
            const checkbox = screen.getByRole('checkbox')
            expect(checkbox).not.toBeChecked()
            userEvent.click(checkbox)
            const addAttendanceButton = screen.getByText('Add Attendance')
            fireEvent.click(addAttendanceButton)
            expect(mockMarkDriverDailyAttendance).toHaveBeenCalledTimes(1)
            expect(mockGetFilteredDriverDetails).toHaveBeenCalledTimes(3)
        })
    })
})
