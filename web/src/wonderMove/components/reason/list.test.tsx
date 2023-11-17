import { render, fireEvent, screen } from '@testing-library/react'
import ReasonList from './list.tsx'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('Reason Page', () => {
    test.skip('clicking add button shows input field', () => {
        render(<ReasonList />)
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull()
        fireEvent.click(screen.getByTestId('add-button'))
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument()
    })
    test.skip('clicking close button closes input field', () => {
        render(<ReasonList />)
        fireEvent.click(screen.getByTestId('add-button'))
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-button'))
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull()
    })
    test('clicking save button which post data and close input field', () => {
        render(<ReasonList />)
        fireEvent.click(screen.getByTestId('add-button'))
        expect(screen.getByPlaceholderText('Add New Reason')).toBeInTheDocument()
        userEvent.type(screen.getByPlaceholderText('Add New Reason'), 'hi buddy')
        const consoleSpy = vi.spyOn(console, 'log')
        fireEvent.click(screen.getByTestId('done-button'))
        expect(consoleSpy).toHaveBeenCalledWith('hi buddy')
        expect(screen.queryByPlaceholderText('Add New Reason')).toBeNull()
    })
})
