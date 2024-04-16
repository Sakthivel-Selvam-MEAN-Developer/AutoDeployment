import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const mockPricePoint = vi.fn()
const mockAllTrip = vi.fn()
const mockAllStockTrip = vi.fn()
const mockAllUnloadingPoint = vi.fn()
const mockCreateStockTrip = vi.fn()

vi.mock('../../services/trip', () => ({
    getAllTrip: () => mockAllTrip()
}))
vi.mock('../../services/stockPointTrip', () => ({
    getAllStockPointTrip: () => mockAllStockTrip()
}))
vi.mock('../../services/unloadingPointTrip', () => ({
    createStockTrip: () => mockCreateStockTrip()
}))
vi.mock('../../services/unloadingPoint', () => ({
    getAllUnloadingPoint: () => mockAllUnloadingPoint()
}))
vi.mock('../../services/pricePoint', () => ({
    getPricePoint: () => mockPricePoint()
}))
vi.mock('../../../auth/checkUser', () => ({
    CheckUser: () => () => {
        return true
    }
}))
const mockUnloadingPoint = [
    {
        id: 1,
        name: 'erode',
        cementCompanyId: 1,
        pricePointMarkerId: 2
    }
]
const mockPricePointData = {
    freightAmount: 1000,
    transporterAmount: 900,
    transporterPercentage: 10
}
const mockCreateStockPointTrip = {
    startDate: 1706580172,
    invoiceNumber: '12345abc',
    freightAmount: 1000,
    transporterAmount: 900,
    unloadingPointId: 1,
    loadingPointToStockPointTripId: 1
}
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
        mockAllUnloadingPoint.mockResolvedValue(mockUnloadingPoint)
        mockCreateStockTrip.mockResolvedValue(mockCreateStockPointTrip)
        mockPricePoint.mockResolvedValue(mockPricePointData)
    })
    test('should to able to create stock-unloading trip', async () => {
        render(
            <BrowserRouter>
                <TripList />
            </BrowserRouter>
        )
        userEvent.click(await screen.findByText('TN22E3456'))
        await waitFor(() => {
            expect(screen.getByLabelText('Invoice Number')).toBeInTheDocument()
            expect(screen.getByLabelText('Company Freight')).toBeInTheDocument()
        })
        await userEvent.type(screen.getByLabelText('Stock Point Date'), '30012024')
        await userEvent.type(screen.getByLabelText('Invoice Number'), '12345abc')
        const unLoadingPoint = screen.getByRole('combobox', { name: 'Unloading Point' })
        await userEvent.click(unLoadingPoint)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', { name: 'erode' })
        await userEvent.click(opt)
        expect(screen.getByText('1000')).toBeInTheDocument()
        const create = screen.getByRole('button', { name: 'Create' })
        await userEvent.click(create)
        expect(mockCreateStockTrip).toHaveBeenCalledTimes(1)
    })
})
