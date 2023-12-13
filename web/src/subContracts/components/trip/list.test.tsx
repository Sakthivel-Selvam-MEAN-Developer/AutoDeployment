import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

const mockAllTrip = vi.fn()

vi.mock('../../services/trip', () => ({
    getAllTrip: () => mockAllTrip()
}))

describe('Trip Test', () => {
    test('should fetch data from Db', async () => {
        const mockTripData = [
            {
                startDate: 1696934739,
                factory: {
                    name: 'salem'
                },
                deliveryPoint: {
                    name: 'erode'
                },
                truck: {
                    vehicleNumber: 'TN93D5512',
                    transporter: {
                        name: 'Barath'
                    }
                },
                transporterBalance: 1000
            }
        ]
        mockAllTrip.mockResolvedValue(mockTripData)
        render(
            <BrowserRouter>
                <TripList />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('TN93D5512')).toBeInTheDocument()
            expect(screen.getByText('Oct 10, 2023')).toBeInTheDocument()
            expect(screen.getByText('salem')).toBeInTheDocument()
        })
        expect(mockAllTrip).toHaveBeenCalledTimes(1)
    })
})
