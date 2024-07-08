import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DriverBulkAttendance from './driverBulkAttendance'
import userEvent from '@testing-library/user-event'

const mockGetAllDriver = vi.fn()
const mockGetDriverDailyAttendanceById = vi.fn()
const mockUpsertDriverAttendanceById = vi.fn()

vi.mock('../../services/driver', () => ({
    getAllDriver: () => mockGetAllDriver()
}))
vi.mock('../../services/driverAttendance', () => ({
    getDriverDailyAttendanceById: (driverID: number) => mockGetDriverDailyAttendanceById(driverID),
    upsertDriverAttendanceById: (id: number, driverId: number, attendance: JSON) =>
        mockUpsertDriverAttendanceById(id, driverId, attendance)
}))
const mockDriverDetails = [
    {
        id: 1,
        name: 'sakthi',
        mobileNumber: '09876543'
    },
    {
        id: 34,
        name: 'Chettinad Chennai',
        mobileNumber: '2343423'
    }
]
const mockGetDriverDailyAttendanceByIdData = {
    id: 6,
    driverId: 1,
    attendance: [
        {
            year: 2024,
            attendance: [
                {
                    month: 'May',
                    datesPresent: [22]
                }
            ]
        }
    ]
}

const mockUpsertDriverAttendanceByIdData = {
    id: 6,
    attendance: [
        {
            year: 2024,
            attendance: [
                {
                    month: 'May',
                    datesPresent: [22, 24]
                }
            ]
        }
    ],
    driverId: 1
}

describe('Bulk Attendance test', () => {
    beforeEach(() => {
        mockGetAllDriver.mockResolvedValue(mockDriverDetails)
        mockGetDriverDailyAttendanceById.mockResolvedValue(mockGetDriverDailyAttendanceByIdData)
        mockUpsertDriverAttendanceById.mockResolvedValue(mockUpsertDriverAttendanceByIdData)
    })
    test('should display driver attendance details by id', async () => {
        render(
            <BrowserRouter>
                <DriverBulkAttendance />
            </BrowserRouter>
        )
        expect(mockGetDriverDailyAttendanceById).toHaveBeenCalledTimes(1)
        const driverList = screen.getByRole('combobox', { name: 'Select Driver Name' })
        userEvent.click(driverList)
        await waitFor(() => screen.getByRole('listbox'))
        const driverListOption = screen.getByRole('option', { name: 'sakthi - 09876543' })
        userEvent.click(driverListOption)
        expect(await screen.findByDisplayValue('sakthi - 09876543')).toBeInTheDocument()
        expect(mockGetAllDriver).toHaveBeenCalledTimes(1)
        expect(mockGetDriverDailyAttendanceById).toHaveBeenCalledTimes(2)
        waitFor(async () => {
            await screen.findAllByRole('presentation')
            expect(screen.getByText('Selected Dates')).toBeInTheDocument()
            expect(screen.getByText('May 22, 2024')).toBeInTheDocument()
            expect(await screen.findByText('Submit')).toBeInTheDocument()
            expect(await screen.findByText('Cancel')).toBeInTheDocument()
        })
    })
    test('should update driver attendance details by id', async () => {
        render(
            <BrowserRouter>
                <DriverBulkAttendance />
            </BrowserRouter>
        )
        expect(mockGetDriverDailyAttendanceById).toHaveBeenCalledTimes(3)
        const driverList = screen.getByRole('combobox', { name: 'Select Driver Name' })
        userEvent.click(driverList)
        await waitFor(() => screen.getByRole('listbox'))
        const driverListOption = screen.getByRole('option', { name: 'sakthi - 09876543' })
        userEvent.click(driverListOption)
        expect(await screen.findByDisplayValue('sakthi - 09876543')).toBeInTheDocument()
        expect(mockGetAllDriver).toHaveBeenCalledTimes(2)
        expect(mockGetDriverDailyAttendanceById).toHaveBeenCalledTimes(4)
        waitFor(async () => {
            await screen.findAllByRole('presentation')
            expect(screen.getByText('May 22, 2024')).toBeInTheDocument()
            expect(screen.getByText('Selected Dates')).toBeInTheDocument()
            expect(await screen.findByText('Submit')).toBeInTheDocument()
            expect(await screen.findByText('Cancel')).toBeInTheDocument()

            const date = screen.getByText('10')
            fireEvent.click(date)

            expect(screen.getByText('May 10, 2024')).toBeInTheDocument()

            const submit = screen.getByText('Submit')
            fireEvent.click(submit)
            expect(mockUpsertDriverAttendanceById).toHaveBeenCalledTimes(1)
        })
    })
})
