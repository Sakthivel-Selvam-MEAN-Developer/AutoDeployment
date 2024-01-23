import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import SelectTrip from './list'

const mockActiveTripsByAcknowledgement = vi.fn()
const mockgetTripById = vi.fn()
const mockCloseTrip = vi.fn()
const mockUpdateAcknowledgementStatus = vi.fn()

vi.mock('../../services/acknowledgement', () => ({
    getAllActiveTripsByAcknowledgement: () => mockActiveTripsByAcknowledgement(),
    getTripById: (inputs: any) => mockgetTripById(inputs),
    closeTrip: (inputs: any) => mockCloseTrip(inputs),
    updateAcknowledgementStatus: (inputs: any) => mockUpdateAcknowledgementStatus(inputs)
}))

const mockOverAllTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTrip: null,
        stockPointToUnloadingPointTrip: null,
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
    stockPointToUnloadingPointTrip: null,
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
            name: 'Search vehicle by number to act on it'
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
        await userEvent.click(screen.getByRole('button', { name: 'Close Trip' }))
        await userEvent.click(screen.getByRole('button', { name: 'Create Due' }))
        expect(screen.getByText('TN93D5512')).toBeInTheDocument()
        expect(screen.getByText('salem')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Unload Quantity'), '40')
        expect(screen.getByDisplayValue('40')).toBeVisible()
        expect(mockActiveTripsByAcknowledgement).toHaveBeenCalledTimes(1)
        expect(mockgetTripById).toHaveBeenCalledTimes(1)
    })
})
