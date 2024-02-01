import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ListAllReport from './list'

const mockGetOverallTrip = vi.fn()
const mockGetOverallTripByFilter = vi.fn()
const mockLoadingPointByCompanyName = vi.fn()
const mockAllTransporter = vi.fn()
const mockAllCementCompany = vi.fn()

vi.mock('../../services/overallTrips', () => ({
    getOverallTrip: () => mockGetOverallTrip(),
    getOverallTripByFilter: (cementCompanyId: any, transporterId: any, loadingPointId: any) =>
        mockGetOverallTripByFilter(cementCompanyId, transporterId, loadingPointId)
}))
vi.mock('../../services/loadingPoint', () => ({
    getLoadingPointByCompanyName: () => mockLoadingPointByCompanyName()
}))
vi.mock('../../services/transporter', () => ({
    getAllTransporter: () => mockAllTransporter()
}))
vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockAllCementCompany()
}))

const mockStockTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        fuel: [],
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
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
                    name: 'Barath Logistics'
                }
            }
        }
    }
]
const mockCompanyData = [
    {
        name: 'UltraTech Cements',
        emailId: 'sample@gmail.com',
        contactPersonNumber: 9856453123
    }
]
const mockTransporterData = [
    {
        name: 'Barath Logistics',
        bankDetails: {
            accountHolder: 'Barath',
            accountNumber: 15602
        }
    }
]
const mockFactory = [
    {
        name: 'Chennai-south',
        cementCompany: mockCompanyData
    }
]

describe('Report Test', () => {
    beforeEach(() => {
        mockGetOverallTrip.mockResolvedValue(mockStockTripData)
        mockGetOverallTripByFilter.mockResolvedValue(mockStockTripData)
        mockAllTransporter.mockResolvedValue(mockTransporterData)
        mockAllCementCompany.mockResolvedValue(mockCompanyData)
        mockLoadingPointByCompanyName.mockResolvedValue(mockFactory)
    })

    test('should to able to create inputs working', async () => {
        render(
            <BrowserRouter>
                <ListAllReport />
            </BrowserRouter>
        )
        //  Select Company Name
        const companyName = screen.getByRole('combobox', {
            name: 'Select Company'
        })
        await userEvent.click(companyName)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const choice = screen.getByRole('option', {
            name: 'UltraTech Cements'
        })
        await userEvent.click(choice)

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

        //  Select Loading Point
        const loading = screen.getByRole('combobox', {
            name: 'Select Factory'
        })
        await userEvent.click(loading)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'Chennai-south'
        })
        await userEvent.click(opt)

        expect(mockGetOverallTrip).toHaveBeenCalledTimes(1)
        expect(mockAllTransporter).toHaveBeenCalledTimes(1)
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)
        expect(mockLoadingPointByCompanyName).toHaveBeenCalledTimes(1)
    })
    test('should be able to view trip data after clicking submit', async () => {
        render(
            <BrowserRouter>
                <ListAllReport />
            </BrowserRouter>
        )
        const start = screen.getByRole('button', { name: 'Submit' })
        await userEvent.click(start)
        expect(screen.getByText('Trip Status')).toBeInTheDocument()
        expect(screen.getByText('Transporter')).toBeInTheDocument()
        expect(screen.getByText('11/24/2023')).toBeInTheDocument()
        expect(screen.getByText('Chennai-south')).toBeInTheDocument()
        expect(mockGetOverallTrip).toHaveBeenCalledTimes(2)
        expect(mockAllTransporter).toHaveBeenCalledTimes(2)
        expect(mockAllCementCompany).toHaveBeenCalledTimes(2)
    })
    test('should to able to filter trip with user input', async () => {
        render(
            <BrowserRouter>
                <ListAllReport />
            </BrowserRouter>
        )
        //  Select Company Name
        const companyName = screen.getByRole('combobox', {
            name: 'Select Company'
        })
        await userEvent.click(companyName)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const choice = screen.getByRole('option', {
            name: 'UltraTech Cements'
        })
        await userEvent.click(choice)

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

        //  Select Loading Point
        const loading = screen.getByRole('combobox', {
            name: 'Select Factory'
        })
        await userEvent.click(loading)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'Chennai-south'
        })
        await userEvent.click(opt)
        const start = screen.getByRole('button', { name: 'Submit' })
        await userEvent.click(start)

        expect(screen.getByText('Trip Status')).toBeInTheDocument()
        expect(screen.getByText('Transporter')).toBeInTheDocument()
        expect(screen.getByText('Barath Logistics')).toBeInTheDocument()
        expect(screen.getByText('Chennai-south')).toBeInTheDocument()

        expect(mockGetOverallTrip).toHaveBeenCalledTimes(3)
        expect(mockGetOverallTripByFilter).toHaveBeenCalledTimes(1)
    })
})
