import { render, screen, waitFor } from '@testing-library/react'
import TripList from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'

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

const mockUnloadingPoint = [
    {
        id: 1,
        name: 'australia',
        cementCompanyId: 1,
        pricePointMarkerId: 2
    }
]
const mockCreateStockPointTrip = {
    startDate: dayjs().unix(),
    invoiceNumber: '12345abc',
    freightAmount: 10001,
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
    test('should to able to create stock-unloading trip', async () => {
        render(
            <BrowserRouter>
                <TripList />
            </BrowserRouter>
        )
        userEvent.click(await screen.findByText('TN22E3456'))
        await waitFor(() => {
            expect(screen.getByLabelText('Invoice Number')).toBeInTheDocument()
            expect(screen.getByLabelText('Freight Amount')).toBeInTheDocument()
        })
        await userEvent.type(screen.getByLabelText('Invoice Number'), '12345abc')
        await userEvent.type(screen.getByLabelText('Freight Amount'), '1')
        const unLoadingPoint = screen.getByRole('combobox', {
            name: 'Unloading Point'
        })
        await userEvent.click(unLoadingPoint)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'australia'
        })
        await userEvent.click(opt)
        await userEvent.click(screen.getByRole('button', { name: 'Create' }))
        expect(mockCreateStockTrip).toHaveBeenCalledTimes(1)
    })
})
