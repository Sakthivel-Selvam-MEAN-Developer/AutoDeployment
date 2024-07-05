import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import AddAcknowledgement from './addAcknowledgement'

const mockgGetAllTripByAcknowledgementStatus = vi.fn()
const mockgetTripById = vi.fn()
const mockUpdateAcknowledgementStatus = vi.fn()

vi.mock('../../services/acknowledgement', () => ({
    getAllTripByAcknowledgementStatus: () => mockgGetAllTripByAcknowledgementStatus(),
    getTripById: (inputs: any) => mockgetTripById(inputs),
    updateAcknowledgementStatus: (inputs: any) => mockUpdateAcknowledgementStatus(inputs)
}))

const mockOverAllTripDataById = {
    id: 1,
    acknowledgementStatus: false,
    loadingPointToStockPointTrip: null,
    stockPointToUnloadingPointTrip: null,
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Sakthivel Logistics'
        }
    },
    loadingPointToUnloadingPointTrip: {
        id: 1,
        startDate: 1705989708,
        acknowledgeDueTime: 1706338250,
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
        filledLoad: 20,
        invoiceNumber: 'abc123',
        unloadedDate: 1709145000
    }
}

const mockOverAllTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTrip: null,
        stockPointToUnloadingPointTrip: null,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Sakthivel Logistics'
            }
        },
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
]
const mockPaymentTripData = [
    {
        vehicleNUmber: 'TN93D5512',
        dueDate: 1709145000
    }
]

describe('Add Acknowledgement Test', () => {
    beforeEach(() => {
        mockgGetAllTripByAcknowledgementStatus.mockResolvedValue(mockOverAllTripData)
        mockUpdateAcknowledgementStatus.mockResolvedValue(mockPaymentTripData)
    })
    test('should able to close Acknowledgement', async () => {
        mockgetTripById.mockResolvedValue(mockOverAllTripDataById)
        render(
            <BrowserRouter>
                <AddAcknowledgement />
            </BrowserRouter>
        )
        const truckNumber = screen.getByRole('combobox', {
            name: 'Select Vehicle for Acknowledgement'
        })
        await userEvent.click(truckNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'TN93D5512-abc123'
        })
        await userEvent.click(opt)
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
        await userEvent.click(screen.getByText('Add Acknowledgement for the Trip'))
        await userEvent.click(screen.getByRole('button', { name: 'Acknowledgement Received' }))
        expect(screen.getByText('Acknowledgement Status:')).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Close' }))
        expect(mockgGetAllTripByAcknowledgementStatus).toHaveBeenCalledTimes(1)
        expect(mockgetTripById).toHaveBeenCalledTimes(1)
        expect(mockUpdateAcknowledgementStatus).toHaveBeenCalledTimes(1)
    })
})
