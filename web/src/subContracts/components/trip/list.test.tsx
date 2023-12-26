import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

const mockAllTrip = vi.fn()
const mockTripByVehicleNumber = vi.fn()

vi.mock('../../services/trip', () => ({
    getAllTrip: () => mockAllTrip(),
    getTripByTruckNumber: () => mockTripByVehicleNumber()
}))

const mockTripData = [
    {
        startDate: 1696934739,
        loadingPoint: {
            name: 'salem'
        },
        unloadingPoint: {
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

const byVechicleNumber = {
    id: 1,
    totalTransporterAmount: 50000,
    truck: {
        transporter: { name: 'Something' }
    }
}

describe('Trip Test', () => {
    beforeEach(() => {
        mockAllTrip.mockResolvedValue(mockTripData)
        mockAllTrip.mockResolvedValue(mockTripData)
        mockTripByVehicleNumber.mockResolvedValue(byVechicleNumber)
    })
    test('should fetch data from Db', async () => {
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
