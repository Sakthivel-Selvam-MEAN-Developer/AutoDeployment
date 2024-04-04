import ExpenseApprovalList from './expenseApproval'
import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockGetAllExpenseByTripIdForApproval = vi.fn()

vi.mock('../../services/expenses', () => ({
    getAllExpenseByTripIdForApproval: () => mockGetAllExpenseByTripIdForApproval()
}))

const mockExpenseData = [
    {
        tripId: 2,
        tripExpenses: [
            {
                expenseType: 'TRIP_ALLOWANCE',
                tripId: 2,
                id: 4,
                amount: 345345
            }
        ]
    }
]

describe('New trip test', () => {
    beforeEach(() => {
        mockGetAllExpenseByTripIdForApproval.mockResolvedValue(mockExpenseData)
    })
    test('should fetch company data from Db', async () => {
        expect(mockGetAllExpenseByTripIdForApproval).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <ExpenseApprovalList />
            </BrowserRouter>
        )
        expect(await screen.findByText('Sakthi Vel')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Enter Rejection Reason'), 'Too much Expense')
        expect(await screen.findByText('ABCD1234')).toBeInTheDocument()
        expect(await screen.findByText('Reject')).toBeInTheDocument()
        expect(await screen.findByText('Approve')).toBeInTheDocument()
        expect(await screen.getByText('TRIP_ALLOWANCE')).toBeInTheDocument()
        expect(await screen.findByText('345345')).toBeInTheDocument()
        expect(mockGetAllExpenseByTripIdForApproval).toHaveBeenCalledTimes(1)
    })
})
