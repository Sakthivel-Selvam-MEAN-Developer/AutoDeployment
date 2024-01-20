import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import SelectTrip from './list'

const mockActiveTripsByAcknowledgement = vi.fn()
const mockgetTripById = vi.fn()

vi.mock('../../services/acknowledgement', () => ({
    getAllActiveTripsByAcknowledgement: () => mockActiveTripsByAcknowledgement(),
    getTripById: (inputs: any) => mockgetTripById(inputs)
}))

const mockOverAllTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 1,
            truck: {
                vehicleNumber: 'TN93D5512'
            }
        }
    }
]
const mockOverAllTripDataById = {
    id: 1,
    acknowledgementStatus: false,
    loadingPointToStockPointTrip: null,
    loadingPointToUnloadingPointTrip: {
        id: 1,
        truck: {
            vehicleNumber: 'TN93D5512'
        },
        loadingPoint: {
            name: 'salem'
        },
        unloadingPoint: {
            name: 'erode'
        }
    }
}

describe('Acknowledgement Test', () => {
    beforeEach(() => {
        mockActiveTripsByAcknowledgement.mockResolvedValue(mockOverAllTripData)
        mockgetTripById.mockResolvedValue(mockOverAllTripDataById)
    })
    test('should fetch vehicle Number from Db', async () => {
        render(
            <BrowserRouter>
                <SelectTrip />
            </BrowserRouter>
        )
        const truckNumber = screen.getByRole('combobox', {
            name: 'Truck Number'
        })
        await userEvent.click(truckNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'TN93D5512'
        })
        await userEvent.click(opt)
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
        expect(screen.getByText('TN93D5512')).toBeInTheDocument()
        expect(screen.getByText('salem')).toBeInTheDocument()
        expect(screen.getByText('Close the active trip')).toBeInTheDocument()
        expect(screen.getByText('Add Acknowledgement for the Trip')).toBeInTheDocument()
        expect(mockActiveTripsByAcknowledgement).toHaveBeenCalledTimes(1)
        expect(mockgetTripById).toHaveBeenCalledTimes(1)
    })
})
