import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi, describe, test, expect } from 'vitest'
import TransporterInvoiceList from './list'
import userEvent from '@testing-library/user-event'

const mockGetTripByTransporterInvoice = vi.fn()
const mockUpdateTransporterInvoice = vi.fn()

vi.mock('../../services/transporterInvoice', () => ({
    getTripByTransporterInvoice: () => mockGetTripByTransporterInvoice(),
    updateTransporterInvoice: () => mockUpdateTransporterInvoice()
}))
const mockOverallTripData = [
    {
        id: 4,
        acknowledgementStatus: false,
        finalPayDuration: 0,
        transporterInvoice: '',
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 3,
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 3,
            startDate: 1715193000,
            filledLoad: 2,
            wantFuel: false,
            tripStatus: false,
            acknowledgeDueTime: null,
            freightAmount: 1000,
            transporterAmount: 900,
            totalFreightAmount: 2000,
            totalTransporterAmount: 1800,
            margin: 200,
            invoiceNumber: '21ed23qw',
            loadingPointId: 1,
            unloadingPointId: 1,
            truckId: 4,
            billNo: null,
            loadingPoint: {
                name: 'Chennai-south'
            },
            unloadingPoint: {
                name: 'Salem'
            },
            truck: {
                vehicleNumber: 'TN22E3456',
                transporter: {
                    id: 2,
                    name: 'Deepak Logistics Pvt Ltd',
                    csmName: 'Barath'
                }
            }
        }
    }
]

describe('transporterInvoice Test', () => {
    test('should be able to view trip data for transporter', async () => {
        mockGetTripByTransporterInvoice.mockResolvedValue(mockOverallTripData)
        mockUpdateTransporterInvoice.mockResolvedValue(mockOverallTripData)
        render(
            <BrowserRouter>
                <TransporterInvoiceList />
            </BrowserRouter>
        )
        const invoiceNumberInput = screen.getByLabelText('Select Invoice Number')
        expect(invoiceNumberInput)
        await userEvent.type(invoiceNumberInput, '21ed23qw')
        const filterButton = screen.getByRole('button', { name: 'FILTER' })
        expect(filterButton)
        await userEvent.click(filterButton)
        await waitFor(() => {
            expect(screen.getAllByText('Invoice Number'))
            expect(screen.getAllByText('Start Date'))
            expect(screen.getAllByText('Vehicle Number'))
            expect(screen.getAllByText('Action'))
        })
        expect(screen.getAllByText('TN22E3456'))
        expect(screen.getAllByText('Invoice Number'))
        await userEvent.type(screen.getByLabelText('Invoice Number'), 'RTD43D')
        expect(screen.getAllByText('Submit'))
        const start = screen.getByRole('button', { name: 'Submit' })
        await userEvent.click(start)
        expect(mockGetTripByTransporterInvoice).toHaveBeenCalledTimes(2)
    })
})
