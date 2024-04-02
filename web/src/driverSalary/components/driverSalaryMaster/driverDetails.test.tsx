import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Driver_Salary from './driverDetails'

const mockGetDriverTripByDriverId = vi.fn()

vi.mock('../../services/driverTrip', () => ({
    getDriverTripByDriverId: (input: any) => mockGetDriverTripByDriverId(input)
}))
const mockgetDriverTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        loadingPointToUnloadingPointTrip: {
            loadingPoint: {
                id: 1,
                name: 'Chennai-south',
                cementCompanyId: 1,
                pricePointMarkerId: 1
            },
            invoiceNumber: 'ABC123',
            startDate: 1700764200
        },
        loadingPointToStockPointTrip: null
    }
]

describe('Trip Test', () => {
    beforeEach(() => {
        mockGetDriverTripByDriverId.mockResolvedValue(mockgetDriverTripData)
    })
    test('should to able to create see driver details', async () => {
        render(
            <BrowserRouter>
                <Driver_Salary />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('List of Trips')).toBeInTheDocument()
            expect(screen.getByText('Number of Trips Taken')).toBeInTheDocument()
            expect(screen.getByText('Daily Betta')).toBeInTheDocument()
            expect(screen.getByText('Total Salary')).toBeInTheDocument()
            expect(screen.getByText('Welcome Sakthivel Selvam')).toBeInTheDocument()
            expect(screen.getByText('Date')).toBeInTheDocument()
            expect(screen.getByText('Invoice Number')).toBeInTheDocument()
            expect(screen.getByText('Expenses Amount')).toBeInTheDocument()
            expect(screen.getByText('Chennai-south')).toBeInTheDocument()
            expect(screen.getByText('ABC123')).toBeInTheDocument()
        })

        expect(mockGetDriverTripByDriverId).toHaveBeenCalledTimes(1)
    })
})
