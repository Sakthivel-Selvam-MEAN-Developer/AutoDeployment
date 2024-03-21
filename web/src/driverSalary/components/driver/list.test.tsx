import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import CreateDriver from './list'

const mockCreateDriver = vi.fn()

vi.mock('../../services/driver', () => ({
    createDriver: (inputs: any) => mockCreateDriver(inputs)
}))

describe('Create driver', () => {
    test('should create driver details', async () => {
        expect(mockCreateDriver).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <CreateDriver />
            </BrowserRouter>
        )
        await userEvent.type(screen.getByLabelText('Name'), 'User')
        await userEvent.type(screen.getByLabelText('Father Name'), 'userFather')
        await userEvent.type(screen.getByLabelText('Aadhar Number'), '34567890')
        await userEvent.type(screen.getByLabelText('PAN Number'), 'abdyyy222')
        await userEvent.type(screen.getByLabelText('Address'), 'new street')
        await userEvent.type(screen.getByLabelText('Mobile Number'), '0987645678')
        await userEvent.type(screen.getByLabelText('Driver License'), '34567cvb')
        await userEvent.type(screen.getByLabelText('Bank Name'), 'newBank')
        await userEvent.type(screen.getByLabelText('Account Number'), '23456789876')
        await userEvent.type(screen.getByLabelText('Account Branch'), 'newBrach')
        await userEvent.type(screen.getByLabelText('IFCS Code'), 'ifcs45678')
        await userEvent.type(screen.getByLabelText('License Expriry Date'), '07032024')
        await userEvent.type(screen.getByLabelText('Date of Birth'), '07032024')

        expect(await screen.findByDisplayValue('userFather')).toBeInTheDocument()
        const option = screen.getByRole('button', { name: 'Submit' })
        await userEvent.click(option)

        expect(mockCreateDriver).toHaveBeenCalledTimes(1)
    })
})
