import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import ReasonList from './list.tsx'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

const mockAllReason = vi.fn()

vi.mock('../../services/reason', () => ({
    getAllReasons: () => mockAllReason()
}))

describe('Reason Page', () => {
    test('should fetch reason from Db', async () => {
        const mockReason = [
            {
                id: 1,
                name: 'Puncture'
            }
        ]
        mockAllReason.mockResolvedValue(mockReason)
        render(<ReasonList />)
        await waitFor(() => {
            const listItems = screen.getAllByTestId('list-item')
            listItems.forEach((item) => {
                expect(item).toBeInTheDocument()
            })
        })
        expect(mockAllReason).toHaveBeenCalledTimes(1)
    })
    test('clicking add button shows input field', async () => {
        render(<ReasonList />)
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull()
        fireEvent.click(screen.getByTestId('add-button'))
        expect(await screen.findByPlaceholderText('Add New Reason')).toBeInTheDocument()
    })
    test('clicking close button closes input field', () => {
        render(<ReasonList />)
        fireEvent.click(screen.getByTestId('add-button'))
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-button'))
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull()
    })
    test.skip('clicking save button which post data and close input field', async () => {
        render(<ReasonList />)
        fireEvent.click(screen.getByTestId('add-button'))
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument()
        await userEvent.type(screen.getByPlaceholderText('Add New Reason'), 'hi buddy')
        fireEvent.click(screen.getByTestId('done-button'))
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull()
    })
})
