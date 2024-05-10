import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import DriverSalaryConatiner from './driverDetails'
import userEvent from '@testing-library/user-event'

const mockGetDriverTripByDriverId = vi.fn()
const mockGetAllDriver = vi.fn()

vi.mock('../../services/driverTrip', () => ({
    getDriverTripByDriverId: (input: any) => mockGetDriverTripByDriverId(input)
}))
vi.mock('../../services/driver', () => ({
    getAllDriver: () => mockGetAllDriver()
}))

const mockDriverDetailsData = [{ id: 1, name: 'sakthi', mobileNumber: '09876543' }]
const mockTripDetailsData = {
    trips: [
        {
            id: 2,
            loadingPointToUnloadingPointTrip: {
                id: 2,
                loadingPoint: {
                    name: 'Chennai-south'
                },
                invoiceNumber: 'asdxasasd',
                startDate: 1714588200,
                unloadingPoint: {
                    name: 'Salem'
                },
                truck: {
                    vehicleNumber: 'TN12G9456'
                }
            },
            loadingPointToStockPointTrip: null,
            tripSalaryDeatails: {
                totalTripBetta: 4500,
                totalDriverAdvance: 2000,
                totalTripSalary: 2500,
                dailyBetta: 350
            }
        }
    ],
    expensesDetails: [
        {
            acceptedAmount: 1200,
            tripId: 2
        }
    ]
}
describe('Driver Test', () => {
    beforeEach(() => {
        mockGetDriverTripByDriverId.mockResolvedValue(mockTripDetailsData)
        mockGetAllDriver.mockResolvedValue(mockDriverDetailsData)
    })
    test('should be able to list driver trip details', async () => {
        render(
            <BrowserRouter>
                <DriverSalaryConatiner />
            </BrowserRouter>
        )
        // Check Cards
        expect(screen.getByText('Welcome Sakthivel Selvam')).toBeInTheDocument()
        expect(screen.getByText('Number of Trips Taken')).toBeInTheDocument()
        expect(screen.getByText('Number of Expenses Submitted')).toBeInTheDocument()
        expect(screen.getByText('Number of Days Present')).toBeInTheDocument()
        expect(screen.getByText('Daily Betta')).toBeInTheDocument()
        expect(screen.getByText('Total Salary')).toBeInTheDocument()
        expect(screen.getByText('List of Trips')).toBeInTheDocument()
        expect(screen.getByText('Select Driver to Display Trips ..!')).toBeInTheDocument()

        expect(mockGetDriverTripByDriverId).toHaveBeenCalledTimes(1)

        // Select Driver Name
        const driverList = screen.getByRole('combobox', { name: 'Select Driver Name' })
        userEvent.click(driverList)
        await waitFor(() => screen.getByRole('listbox'))
        const cementCompanyOption = screen.getByRole('option', { name: 'sakthi - 09876543' })
        userEvent.click(cementCompanyOption)
        expect(await screen.findByDisplayValue('sakthi - 09876543')).toBeInTheDocument()

        //Check Driver trip List
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByText('Invoice Number')).toBeInTheDocument()
        expect(screen.getByText('asdxasasd')).toBeInTheDocument()
        expect(screen.getByText('Expenses Amount')).toBeInTheDocument()
        // screen.debug(undefined, 70000000)
        expect(screen.getByText('₹ 1200')).toBeInTheDocument()
        expect(screen.getByText('₹ 4500')).toBeInTheDocument()
        expect(screen.getByText('₹ 2000')).toBeInTheDocument()
        expect(screen.getByText('Chennai-south - Salem')).toBeInTheDocument()

        await userEvent.type(screen.getByLabelText('Select Month & Year'), 'May2024')

        expect(mockGetDriverTripByDriverId).toHaveBeenCalledTimes(2)
    })
})
