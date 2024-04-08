import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import SelectTrip from './list'

const getAllActivetripTripByTripStatus = vi.fn()
const mockgetTripById = vi.fn()
const mockCloseTrip = vi.fn()

vi.mock('../../services/acknowledgement', () => ({
    getAllActivetripTripByTripStatus: () => getAllActivetripTripByTripStatus(),
    getTripById: (inputs: any) => mockgetTripById(inputs),
    closeTrip: (inputs: any) => mockCloseTrip(inputs)
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
        startDate: 1705989708,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Sakthivel Logistics'
            }
        },
        loadingPoint: {
            name: 'salem'
        },
        unloadingPoint: {
            name: 'erode'
        },
        tripStatus: false,
        filledLoad: 20,
        invoiceNumber: 'abc123',
        unloadedDate: 1709145000
    }
}
const mockOverAllTripDataByIdAfterTripClosed = {
    id: 1,
    acknowledgementStatus: false,
    loadingPointToStockPointTrip: null,
    stockPointToUnloadingPointTrip: null,
    loadingPointToUnloadingPointTrip: {
        id: 1,
        startDate: 1705989708,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Sakthivel Logistics'
            }
        },
        loadingPoint: {
            name: 'salem'
        },
        unloadingPoint: {
            name: 'erode'
        },
        tripStatus: true,
        acknowledgeDueTime: 1706338250,
        filledLoad: 20,
        invoiceNumber: 'abc123',
        unloadedDate: 1709145000
    }
}
const mockOverAllTripDataByIdAfterAcknowledgeAdded = {
    id: 1,
    acknowledgementStatus: true,
    loadingPointToStockPointTrip: null,
    stockPointToUnloadingPointTrip: null,
    loadingPointToUnloadingPointTrip: {
        id: 1,
        startDate: 1705989708,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Sakthivel Logistics'
            }
        },
        loadingPoint: {
            name: 'salem'
        },
        unloadingPoint: {
            name: 'erode'
        },
        tripStatus: true,
        acknowledgeDueTime: 1706338250,
        filledLoad: 20,
        invoiceNumber: 'abc123',
        unloadedDate: 1709145000
    }
}

describe('Acknowledgement Test', () => {
    beforeEach(() => {
        getAllActivetripTripByTripStatus.mockResolvedValue(mockOverAllTripData)
    })
    test('should able to close the trip', async () => {
        mockgetTripById.mockResolvedValue(mockOverAllTripDataById)
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
        expect(screen.getByText('TN93D5512')).toBeInTheDocument()
        expect(screen.getByText(': salem')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Unload Quantity'), '40')
        const approvalType = screen.getByRole('combobox', {
            name: 'Approval Type'
        })
        await userEvent.click(approvalType)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const option = screen.getByRole('option', {
            name: 'Acceptable'
        })
        await userEvent.click(option)
        await userEvent.type(screen.getByLabelText('Unloaded Date'), '12122024')
        await userEvent.click(screen.getByRole('button', { name: 'Unload' }))
        mockgetTripById.mockResolvedValue(mockOverAllTripDataByIdAfterTripClosed)
        expect(getAllActivetripTripByTripStatus).toHaveBeenCalledTimes(1)
        expect(mockgetTripById).toHaveBeenCalledTimes(2)
        expect(mockCloseTrip).toHaveBeenCalledTimes(1)
    })
    test('should able to add the acknowledgement due for the trip', async () => {
        mockgetTripById.mockResolvedValue(mockOverAllTripDataByIdAfterTripClosed)
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
        expect(screen.getByText('TN93D5512')).toBeInTheDocument()
        expect(screen.getByText(': salem')).toBeInTheDocument()
        mockgetTripById.mockResolvedValue(mockOverAllTripDataByIdAfterAcknowledgeAdded)
        expect(getAllActivetripTripByTripStatus).toHaveBeenCalledTimes(2)
        expect(mockgetTripById).toHaveBeenCalledTimes(3)
    })
})
