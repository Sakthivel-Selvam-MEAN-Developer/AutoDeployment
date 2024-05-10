import ExpenseApprovalList from './expenseApproval'
import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockGetAllExpenseByTripIdForApproval = vi.fn()
const mockGetAllDriver = vi.fn()
const mockUpdateExpenseApproval = vi.fn()

vi.mock('../../services/expenses', () => ({
    getAllExpenseByTripIdForApproval: (driverID: number) =>
        mockGetAllExpenseByTripIdForApproval(driverID),
    updateExpenseApproval: (expenseApproval: any, expenseId: number) =>
        mockUpdateExpenseApproval(expenseApproval, expenseId)
}))
vi.mock('../../services/driver', () => ({
    getAllDriver: () => mockGetAllDriver()
}))

const mockDriverDetails = [
    {
        id: 1,
        name: 'sakthi',
        mobileNumber: '09876543'
    },
    {
        id: 34,
        name: 'Chettinad Chennai',
        mobileNumber: '2343423'
    }
]
const mockExpenseData = [
    {
        trip: {
            id: 37,
            loadingPointToUnloadingPointTrip: null,
            loadingPointToStockPointTrip: {
                id: 3,
                loadingPoint: {
                    name: 'Chennai-south'
                },
                invoiceNumber: 'asdfsd',
                startDate: 1715193000,
                stockPointToUnloadingPointTrip: [
                    {
                        unloadingPoint: {
                            name: 'Salem'
                        }
                    }
                ],
                truck: {
                    vehicleNumber: 'TN12G9456'
                }
            }
        },
        expense: [
            {
                expenseType: 'UNLOADING_CHARGES',
                tripId: 37,
                id: 5,
                placedAmount: 1232134
            }
        ]
    }
]

describe('Expense Approval test', () => {
    beforeEach(() => {
        mockGetAllDriver.mockResolvedValue(mockDriverDetails)
        mockGetAllExpenseByTripIdForApproval.mockResolvedValue(mockExpenseData)
    })
    test('should display expenses aprroval list', async () => {
        expect(mockGetAllExpenseByTripIdForApproval).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <ExpenseApprovalList />
            </BrowserRouter>
        )
        const cementCompany = screen.getByRole('combobox', { name: 'Select Driver Name' })
        userEvent.click(cementCompany)
        await waitFor(() => screen.getByRole('listbox'))
        const cementCompanyOption = screen.getByRole('option', { name: 'sakthi - 09876543' })
        userEvent.click(cementCompanyOption)
        expect(await screen.findByDisplayValue('sakthi - 09876543')).toBeInTheDocument()
        expect(mockGetAllDriver).toHaveBeenCalledTimes(1)

        expect(await screen.findByText('TN12G9456')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Enter Rejection Reason'), 'Too much Expense')
        expect(await screen.findByText('asdfsd')).toBeInTheDocument()
        expect(await screen.findByText('Chennai-south - Salem')).toBeInTheDocument()
        expect(await screen.findByText('Submit')).toBeInTheDocument()
        expect(screen.getByText('UNLOADING_CHARGES')).toBeInTheDocument()
        expect(await screen.findByText('₹ 1232134')).toBeInTheDocument()
        expect(mockGetAllExpenseByTripIdForApproval).toHaveBeenCalledTimes(2)
    })
    test('should add expense approval for waiting expense', async () => {
        render(
            <BrowserRouter>
                <ExpenseApprovalList />
            </BrowserRouter>
        )
        const driverList = screen.getByRole('combobox', { name: 'Select Driver Name' })
        userEvent.click(driverList)
        await waitFor(() => screen.getByRole('listbox'))
        const driverListOption = screen.getByRole('option', { name: 'sakthi - 09876543' })
        userEvent.click(driverListOption)
        expect(await screen.findByDisplayValue('sakthi - 09876543')).toBeInTheDocument()
        expect(mockGetAllDriver).toHaveBeenCalledTimes(2)
        expect(mockGetAllExpenseByTripIdForApproval).toHaveBeenCalledWith(1)
        expect(await screen.findByText('TN12G9456')).toBeInTheDocument()
        const vehicleNumber = screen.getByText('TN12G9456')
        userEvent.click(vehicleNumber)

        await userEvent.type(screen.getByLabelText('Enter Rejection Reason'), 'Too much Expense')
        expect(await screen.findByText('asdfsd')).toBeInTheDocument()
        expect(await screen.findByText('Chennai-south - Salem')).toBeInTheDocument()
        expect(screen.getByText('UNLOADING_CHARGES')).toBeInTheDocument()
        expect(await screen.findByText('₹ 1232134')).toBeInTheDocument()

        const approvalType = screen.getByRole('combobox', { name: 'Approval Type' })
        userEvent.click(approvalType)
        await waitFor(() => screen.getByRole('listbox'))
        const approvalTypeOption = screen.getByRole('option', { name: 'Acceptable' })
        userEvent.click(approvalTypeOption)
        expect(await screen.findByDisplayValue('Acceptable')).toBeInTheDocument()

        expect(await screen.findByText('Submit')).toBeInTheDocument()
        const submit = screen.getByText('Submit')
        userEvent.click(submit)
        // expect(mockUpdateExpenseApproval).toHaveBeenCalledTimes(1)
    })
})
