import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import TransporterPay from './transporterPay'

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
            expect(screen.getByText('70% Paid')).toBeInTheDocument()
        })
        expect(mockAllTrip).toHaveBeenCalledTimes(1)
    })
    test('checking the component called NewTrip', async () => {
        render(
            <BrowserRouter>
                <TransporterPay />
            </BrowserRouter>
        )
        const options2 = screen.getByRole('combobox', { name: 'Truck Number' })
        userEvent.click(options2)
        await waitFor(() => screen.getByRole('listbox'))
        const opt2 = screen.getByRole('option', { name: 'TN93D5512' })
        userEvent.click(opt2)
        expect(await screen.findByDisplayValue('TN93D5512')).toBeInTheDocument()
        expect(mockAllTrip).toHaveBeenCalledTimes(3)

        expect(screen.getByText('Paid First Payment')).toBeInTheDocument()

        expect(screen.getByRole('spinbutton', { name: 'Seventy Percentage' }))
        expect(screen.getByDisplayValue('35000')).toBeVisible()

        expect(screen.getByRole('textbox', { name: 'Transporter' }))
        expect(screen.getByDisplayValue('Something')).toBeVisible()

        expect(screen.getByRole('spinbutton', { name: 'Remaining' }))
        expect(screen.getByDisplayValue('15000')).toBeVisible()
    })
})
