import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const mockAllTrip = vi.fn()
const mockAllStockTrip = vi.fn()

vi.mock('../../services/trip', () => ({
    getAllTrip: () => mockAllTrip()
}))
vi.mock('../../services/stockPointTrip', () => ({
    getAllStockPointTrip: () => mockAllStockTrip()
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
const mockStockTripData = [
    {
        id: 3,
        startDate: 1704886154,
        filledLoad: 312,
        wantFuel: false,
        tripStatus: false,
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 312000,
        totalTransporterAmount: 280800,
        margin: 31200,
        loadingPointId: 1,
        invoiceNumber: 'FDGT56465qwqw',
        stockPointId: 1,
        truckId: 4,
        loadingPoint: {
            name: 'Chennai'
        },
        stockPoint: {
            name: 'StockPoint'
        },
        truck: {
            vehicleNumber: 'TN22E3456',
            transporter: {
                name: 'Deepak Logistics Pvt Ltd'
            }
        },
        stockPointToUnloadingPointTrip: []
    }
]

describe('Trip Test', () => {
    beforeEach(() => {
        mockAllTrip.mockResolvedValue(mockTripData)
        mockAllStockTrip.mockResolvedValue(mockStockTripData)
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
    test('should fetch data from stock Db', async () => {
        render(
            <BrowserRouter>
                <TripList />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('Deepak Logistics Pvt Ltd')).toBeInTheDocument()
            expect(screen.getByText('StockPoint')).toBeInTheDocument()
            expect(screen.getByText('TN22E3456')).toBeInTheDocument()
        })
        const transporter = screen.getByText('Deepak Logistics Pvt Ltd')
        await userEvent.click(transporter)
        await userEvent.type(screen.getByLabelText('Invoice Number'), '12345abc')
        expect(await screen.findByDisplayValue('12345abc')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Freight Amount'), '1')
        expect(await screen.findByDisplayValue('10001')).toBeInTheDocument()

        const unLoadingPoint = screen.getByRole('combobox', {
            name: 'Unloading Point'
        })
        await userEvent.click(unLoadingPoint)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'Salem'
        })
        await userEvent.click(opt)
        expect(screen.getByRole('button', { name: 'Create' }))
        expect(mockAllStockTrip).toHaveBeenCalledTimes(2)
    })
})
