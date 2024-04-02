import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ListExpenses from './addExpenses'
import userEvent from '@testing-library/user-event'

const mockGetDriverTripByDriverId = vi.fn()
const mockCreateExpense = vi.fn()

vi.mock('../../services/driverTrip', () => ({
    getDriverTripByDriverId: (input: any) => mockGetDriverTripByDriverId(input)
}))
vi.mock('../../services/expenses', () => ({
    createExpense: (input: any) => mockCreateExpense(input)
}))

const mockgetDriverTripData = [
    {
        id: 1,
        acknowledgementStatus: false,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 1,
        loadingPointToUnloadingPointTrip: {
            loadingPoint: {
                id: 1,
                name: 'Chennai-south',
                cementCompanyId: 1,
                pricePointMarkerId: 1
            },
            invoiceNumber: 'ABC123',
            startDate: 1700764200
        },
        loadingPointToStockPointTrip: null
    }
]

describe('Trip Test', () => {
    beforeEach(() => {
        mockGetDriverTripByDriverId.mockResolvedValue(mockgetDriverTripData)
    })
    test('should to able to create Expense', async () => {
        render(
            <BrowserRouter>
                <ListExpenses />
            </BrowserRouter>
        )
        //expenseNumber
        const invoiceNumber = screen.getByRole('combobox', {
            name: 'Select Trip Invoice Number'
        })
        await userEvent.click(invoiceNumber)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const invoiceOption = screen.getByRole('option', {
            name: 'ABC123'
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
        expect(mockGetDriverTripByDriverId).toHaveBeenCalledTimes(1)
    })
})
