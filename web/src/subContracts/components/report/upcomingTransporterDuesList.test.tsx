import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ListAllUpcomingDues from './upcomingTransporterDuesList'

const mockgetUpcomingDuesByFilter = vi.fn()
const mockAllTransporter = vi.fn()
const mockGetUpcomingDuesByFilterByDefault = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getUpcomingDuesByFilter: (name: any, from: any, to: any) =>
        mockgetUpcomingDuesByFilter(name, from, to),
    getUpcomingDuesByFilterByDefault: () => mockGetUpcomingDuesByFilterByDefault()
}))
vi.mock('../../services/transporter', () => ({
    getAllTransporter: () => mockAllTransporter()
}))

const mockStockTripData = [
    {
        name: 'Barath Logistics',
        dueDate: 1708626600,
        payableAmount: 20000,
        overallTrip: {
            loadingPointToStockPointTrip: {
                id: 1,
                startDate: 1700764200,
                filledLoad: 40,
                wantFuel: null,
                tripStatus: false,
                acknowledgeDueTime: null,
                freightAmount: 1000,
                transporterAmount: 900,
                totalFreightAmount: 40000,
                totalTransporterAmount: 36000,
                margin: 4000,
                invoiceNumber: 'ABC123',
                loadingPointId: 1,
                unloadingPointId: 1,
                truckId: 1,
                loadingPoint: {
                    id: 1,
                    name: 'Chennai-south',
                    cementCompany: {
                        name: 'UltraTech Cements'
                    }
                },
                truck: {
                    vehicleNumber: 'TN93D5512',
                    transporter: {
                        id: 1,
                        name: 'Barath Logistics',
                        csmName: 'Muthu'
                    }
                }
            }
        }
    }
]
const mockTransporterData = [
    {
        name: 'Barath Logistics'
    }
]

describe('Report Test', () => {
    beforeEach(() => {
        mockgetUpcomingDuesByFilter.mockResolvedValue(mockStockTripData)
        mockAllTransporter.mockResolvedValue(mockTransporterData)
        mockGetUpcomingDuesByFilterByDefault.mockResolvedValue(mockStockTripData)
    })

    test('should to able to make inputs working', async () => {
        render(
            <BrowserRouter>
                <ListAllUpcomingDues />
            </BrowserRouter>
        )
        //  Select Transporter
        const transporter = screen.getByRole('combobox', {
            name: 'Select Transporter'
        })
        await userEvent.click(transporter)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const options = screen.getByRole('option', {
            name: 'Barath Logistics'
        })
        await userEvent.click(options)
        await userEvent.type(screen.getByLabelText('Due Start Date'), '08022024')
        await userEvent.type(screen.getByLabelText('Due End Date'), '23022024')
        expect(mockAllTransporter).toHaveBeenCalledTimes(1)
    })
    test('should to able to filter transporter due with user input', async () => {
        render(
            <BrowserRouter>
                <ListAllUpcomingDues />
            </BrowserRouter>
        )
        //  Select Transporter
        const transporter = screen.getByRole('combobox', {
            name: 'Select Transporter'
        })
        await userEvent.click(transporter)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const options = screen.getByRole('option', {
            name: 'Barath Logistics'
        })
        await userEvent.click(options)
        await userEvent.type(screen.getByLabelText('Due Start Date'), '08022024')
        await userEvent.type(screen.getByLabelText('Due End Date'), '23022024')

        const start = screen.getByRole('button', { name: 'Filter' })
        await userEvent.click(start)
        expect(screen.getByText('Due Date')).toBeInTheDocument()
        expect(screen.getByText('Transporter Name')).toBeInTheDocument()
        expect(screen.getByText('Amount')).toBeInTheDocument()

        expect(screen.getByText('Barath Logistics')).toBeInTheDocument()
        expect(screen.getByText('20000')).toBeInTheDocument()

        expect(mockgetUpcomingDuesByFilter).toHaveBeenCalledTimes(1)
        expect(mockAllTransporter).toHaveBeenCalledTimes(2)
    })
})
