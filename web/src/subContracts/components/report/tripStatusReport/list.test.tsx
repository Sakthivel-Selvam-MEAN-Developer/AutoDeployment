import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi, beforeEach, describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ListAllReport from './list'

const mockGetOverallTrip = vi.fn()
const mockGetOverallTripByFilter = vi.fn()
const mockLoadingPointByCompanyName = vi.fn()
const mockAllTransporter = vi.fn()
const mockAllCementCompany = vi.fn()
const mockAllTruck = vi.fn()
const mockAllInvoiceNumbers = vi.fn()

vi.mock('../../../services/overallTrips', () => ({
    tripStatusFilter: (
        cementCompanyId: number,
        transporterId: number,
        loadingPointId: number,
        vehicleNumber: string,
        invoiceNumber: string
    ) =>
        mockGetOverallTripByFilter(
            cementCompanyId,
            transporterId,
            loadingPointId,
            vehicleNumber,
            invoiceNumber
        )
}))
vi.mock('../../../services/loadingPoint', () => ({
    getLoadingPointByCompanyName: () => mockLoadingPointByCompanyName()
}))
vi.mock('../../../services/transporter', () => ({
    getAllTransporter: () => mockAllTransporter()
}))
vi.mock('../../../services/cementCompany', () => ({
    getAllCementCompany: () => mockAllCementCompany()
}))
vi.mock('../../../services/truck', () => ({
    getAllTruck: () => mockAllTruck()
}))
vi.mock('../../../services/unloadingPoint', () => ({
    getAllInvoiceNumbers: () => mockAllInvoiceNumbers()
}))
vi.mock('../../../../auth/checkUser', () => ({
    CheckUser: () => () => {
        return { adminAccess: true, semiAccess: true }
    }
}))
const mockStockTripData = {
    count: 1,
    filterData: [
        {
            id: 1,
            acknowledgementStatus: false,
            loadingPointToStockPointTripId: null,
            stockPointToUnloadingPointTripId: null,
            loadingPointToUnloadingPointTripId: 1,
            fuel: [],
            shortageQuantity: [],
            paymentDues: [
                {
                    type: 'initial pay',
                    status: false
                }
            ],
            loadingPointToStockPointTrip: null,
            truckId: 1,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    id: 1,
                    name: 'Barath Logistics Pvt Ltd'
                }
            },
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
                        name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
                    }
                },
                unloadingPoint: {
                    name: 'Salem'
                },
                truck: {
                    vehicleNumber: 'TN93D5512',
                    transporter: {
                        id: 1,
                        name: 'Barath Logistics Pvt Ltd'
                    }
                }
            }
        }
    ]
}
const mockCompanyData = [
    {
        name: 'ULTRATECH CEMENT LIMITED,TADIPATRI',
        emailId: 'sample@gmail.com',
        contactPersonNumber: 9856453123
    }
]
const mockTransporterData = [
    {
        name: 'Barath Logistics Pvt Ltd',
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
const mockTruckData = [
    {
        vehicleNumber: 'TN93D5512'
    }
]
const mockInvoiceData = [
    {
        invoiceNumber: 'ABC123'
    }
]

describe('Report Test', () => {
    beforeEach(() => {
        mockGetOverallTrip.mockResolvedValue(mockStockTripData)
        mockGetOverallTripByFilter.mockResolvedValue(mockStockTripData)
        mockAllTransporter.mockResolvedValue(mockTransporterData)
        mockAllCementCompany.mockResolvedValue(mockCompanyData)
        mockLoadingPointByCompanyName.mockResolvedValue(mockFactory)
        mockAllTruck.mockResolvedValue(mockTruckData)
        mockAllInvoiceNumbers.mockResolvedValue(mockInvoiceData)
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
            name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
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
            name: 'Barath Logistics Pvt Ltd'
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
        // Select Vehicle Number
        const vehicleNumber = screen.getByRole('combobox', {
            name: 'Select Vehicle Number'
        })
        await userEvent.click(vehicleNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const vehicleChoice = screen.getByRole('option', {
            name: 'TN93D5512'
        })
        await userEvent.click(vehicleChoice)

        // Select Invoice Number
        const invoiceNumber = screen.getByRole('combobox', {
            name: 'Select Invoice Number'
        })
        await userEvent.click(invoiceNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const invoiceChoice = screen.getByRole('option', {
            name: 'ABC123'
        })
        await userEvent.click(invoiceChoice)

        expect(mockAllTransporter).toHaveBeenCalledTimes(1)
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)
        expect(mockLoadingPointByCompanyName).toHaveBeenCalledTimes(1)
        expect(mockAllTruck).toHaveBeenCalledTimes(1)
        expect(mockAllInvoiceNumbers).toHaveBeenCalledTimes(1)
    })
    test('should be able to view trip data after clicking submit', async () => {
        render(
            <BrowserRouter>
                <ListAllReport />
            </BrowserRouter>
        )
        const start = screen.getByRole('button', { name: 'Filter' })
        await userEvent.click(start)
        expect(screen.getByText('Transporter')).toBeInTheDocument()
        expect(screen.getByText('ULTRATECH CEMENT LIMITED,TADIPATRI')).toBeInTheDocument()
        expect(screen.getByText('TN93D5512')).toBeInTheDocument()
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
            name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
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
            name: 'Barath Logistics Pvt Ltd'
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

        //  Select Vehicle Number
        const vehicleNumber = screen.getByRole('combobox', {
            name: 'Select Vehicle Number'
        })
        await userEvent.click(vehicleNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const vehicleChoice = screen.getByRole('option', {
            name: 'TN93D5512'
        })
        await userEvent.click(vehicleChoice)

        //  Select Invoice Number
        const invoiceNumber = screen.getByRole('combobox', {
            name: 'Select Invoice Number'
        })
        await userEvent.click(invoiceNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const invoiceChoice = screen.getByRole('option', {
            name: 'ABC123'
        })
        await userEvent.click(invoiceChoice)
        const start = screen.getByRole('button', { name: 'Filter' })
        await userEvent.click(start)

        expect(screen.getByText('Transporter')).toBeInTheDocument()
        expect(screen.getByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
        expect(screen.getByText('TN93D5512')).toBeInTheDocument()
        expect(screen.getByText('ABC123')).toBeInTheDocument()
        expect(mockGetOverallTripByFilter).toHaveBeenCalledTimes(2)
    })
})
