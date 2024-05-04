import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ListExpenses from './addExpenses'
import userEvent from '@testing-library/user-event'

const mockGetDriverTripByDriverId = vi.fn()
const mockCreateExpense = vi.fn()
const mockGetAllDriver = vi.fn()
const mockGetAllExpenseByTripIdForApproval = vi.fn()

vi.mock('../../services/driverTrip', () => ({
    getDriverTripByDriverId: (input: any) => mockGetDriverTripByDriverId(input)
}))
vi.mock('../../services/driver', () => ({
    getAllDriver: () => mockGetAllDriver()
}))
vi.mock('../../services/expenses', () => ({
    createExpense: (input: any) => mockCreateExpense(input),
    getAllExpenseByTripIdForApproval: (input: any) => mockGetAllExpenseByTripIdForApproval(input)
}))
const mockDriverDetailsData = [{ id: 1, name: 'sakthi', mobileNumber: '09876543' }]
const mockTripDetailsData = {
    trips: [
        {
            id: 2,
            loadingPointToUnloadingPointTrip: {
                id: 2,
                loadingPoint: {
                    name: 'Chennai-south'
                },
                invoiceNumber: 'asdxasasd',
                startDate: 1714588200,
                unloadingPoint: {
                    name: 'Salem'
                },
                truck: {
                    vehicleNumber: 'TN12G9456'
                }
            },
            loadingPointToStockPointTrip: null
        }
    ],
    expensesDetails: [
        {
            amount: 1200,
            tripId: 2
        }
    ]
}

describe('Add Expense Test', () => {
    beforeEach(() => {
        mockGetAllDriver.mockResolvedValue(mockDriverDetailsData)
        mockGetDriverTripByDriverId.mockResolvedValue(mockTripDetailsData)
    })
    test('should to able to create Expense', async () => {
        render(
            <BrowserRouter>
                <ListExpenses />
            </BrowserRouter>
        )

        // Select Driver Name
        const driverList = screen.getByRole('combobox', { name: 'Select Driver Name' })
        userEvent.click(driverList)
        await waitFor(() => screen.getByRole('listbox'))
        const cementCompanyOption = screen.getByRole('option', { name: 'sakthi - 09876543' })
        userEvent.click(cementCompanyOption)
        expect(await screen.findByDisplayValue('sakthi - 09876543')).toBeInTheDocument()

        // Trip with Invoice Number
        const invoiceNumber = screen.getByRole('combobox', {
            name: 'Select Trip with Invoice Number'
        })
        await userEvent.click(invoiceNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const invoiceOption = screen.getByRole('option', {
            name: 'TN12G9456 - asdxasasd'
        })
        await userEvent.click(invoiceOption)
        //expenseType

        const expenseType = screen.getByRole('combobox', {
            name: 'Expense Type'
        })
        await userEvent.click(expenseType)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const expenseTypeList = screen.getByRole('option', {
            name: 'LOADING_CHARGES'
        })
        await userEvent.click(expenseTypeList)
        //amount

        await userEvent.type(screen.getByLabelText('Expense Amount'), '103')
        expect(screen.getByDisplayValue('103')).toBeVisible()

        //button
        const button = screen.getByRole('button', { name: 'Add Expense' })
        await userEvent.click(button)

        expect(screen.getByText('Expenses Details')).toBeInTheDocument()
        expect(screen.getByText('Amount')).toBeInTheDocument()
        expect(screen.getByText('LOADING_CHARGES')).toBeInTheDocument()

        const createExpense = screen.getByRole('button', { name: 'Create Expense' })
        await userEvent.click(createExpense)

        expect(mockCreateExpense).toHaveBeenCalledTimes(1)
        expect(mockGetDriverTripByDriverId).toHaveBeenCalledTimes(2)
    })
})
