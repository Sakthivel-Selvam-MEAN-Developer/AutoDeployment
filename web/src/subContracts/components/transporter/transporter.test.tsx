import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateTransporter from './list'

const mockCreateTransporter = vi.fn()
const mockGetAllAccountTypes = vi.fn()
const mockGetAllTransporter = vi.fn()

vi.mock('../../services/transporter', () => ({
    createTransporter: (inputs: any) => mockCreateTransporter(inputs),
    getAllTransporter: () => mockGetAllTransporter()
}))
vi.mock('../../services/accountType', () => ({
    getAllAccountTypes: () => mockGetAllAccountTypes()
}))

const mockTransporterData = [
    {
        name: 'Muthu Transporters',
        emailId: 'sample@gmail.com',
        contactPersonName: 'Muthu',
        contactPersonNumber: '1234',
        address: 'Muthu Street',
        gstNo: 'abcd123',
        tdsPercentage: 11,
        hasGst: true,
        hasTds: true,
        accountHolder: 'muthu',
        accountNumber: '43534523',
        ifsc: 'zxy1234',
        accountTypeNumber: 10
    }
]
const mockAccounttype = [
    {
        accountTypeName: 'Savings Account',
        accountTypeNumber: 10
    }
]
describe('Trip Test', () => {
    test('checking the component called NewTrip', async () => {
        mockGetAllAccountTypes.mockResolvedValue(mockAccounttype)
        mockGetAllTransporter.mockResolvedValue(mockTransporterData)
        mockCreateTransporter.mockResolvedValue(mockTransporterData[0])
        render(
            <BrowserRouter>
                <CreateTransporter />
            </BrowserRouter>
        )
        expect(screen.getByText('Create')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Transporter Name'), 'Muthu Transporters')
        await userEvent.type(screen.getByLabelText('Email Id'), 'sample@gmail.com')
        await userEvent.type(screen.getByLabelText('Contact Person'), 'Muthu')
        await userEvent.type(screen.getByLabelText('Transporter Address'), 'Muthu Street')
        await userEvent.type(screen.getByLabelText('Contact Number'), '1234')
        await userEvent.type(screen.getByLabelText('Account Holder Name'), 'muthu')
        await userEvent.type(screen.getByLabelText('Account Number'), '43534523')
        await userEvent.type(screen.getByLabelText('IFSC code'), 'zxy1234')
        const accountType = screen.getByRole('combobox', { name: 'Account Type' })
        await userEvent.click(accountType)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'Savings Account'
        })
        await userEvent.click(opt)
        const checkbox = screen.getAllByRole('checkbox')
        expect(checkbox[0]).not.toBeChecked()
        expect(screen.getByRole('textbox', { name: 'GST Number' })).toBeDisabled()
        expect(screen.getByRole('spinbutton', { name: 'GST Percentage' })).toBeDisabled()
        await fireEvent.click(checkbox[0])
        await userEvent.type(screen.getByLabelText('GST Number'), 'abcd123')
        await userEvent.type(screen.getByLabelText('GST Percentage'), '10')

        expect(screen.getByDisplayValue('abcd123')).toBeVisible()

        expect(checkbox[1]).not.toBeChecked()
        expect(screen.getByRole('spinbutton', { name: 'TDS Percentage' }))
        await fireEvent.click(checkbox[1])
        await userEvent.type(screen.getByLabelText('TDS Percentage'), '11')
        expect(screen.getByDisplayValue('11')).toBeVisible()

        const option = screen.getByText('Create')
        await userEvent.click(option)

        expect(mockCreateTransporter).toHaveBeenCalledTimes(1)
    })
})
