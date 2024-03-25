import { render, screen } from '@testing-library/react'
import Driver_Details from './driverDetails'

describe('Driver_Details component', () => {
    test('should display welcome message', () => {
        render(<Driver_Details />)
        expect(screen.getByText(/Welcome Sakthivel Selvam/i)).toBeInTheDocument()
    })

    test('should display date picker', () => {
        render(<Driver_Details />)
        expect(screen.getByLabelText('Select Month & Year')).toBeInTheDocument()
    })

    test('renders driver cards', () => {
        render(<Driver_Details />)
        expect(screen.getByText('Number of Trips Taken')).toBeInTheDocument()
        expect(screen.getByText('Number of Expenses Submitted')).toBeInTheDocument()
        expect(screen.getByText('Number of Days Present')).toBeInTheDocument()
        expect(screen.getByText('Daily Betta')).toBeInTheDocument()
        expect(screen.getByText('Total Salary')).toBeInTheDocument()
    })
})
