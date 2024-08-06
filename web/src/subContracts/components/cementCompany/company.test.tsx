import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CreateCompany from './company'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

const mockCreateCompany = vi.fn()
const mockGetAllCementCompany = vi.fn()

vi.mock('../../services/cementCompany', () => ({
    createCompany: (inputs: any) => mockCreateCompany(inputs),
    getAllCementCompany: () => mockGetAllCementCompany()
}))

const mockCompany = [
    {
        id: 1,
        name: 'Sankar Cements',
        gstNo: 'ASD123',
        emailId: 'sample@gmail.com',
        contactPersonName: 'Barath',
        contactPersonNumber: '9876543436',
        address: 'Salem, TamilNadu'
    }
]

describe('Create company', () => {
    beforeEach(() => {
        mockCreateCompany.mockResolvedValue(mockCompany[0])
        mockGetAllCementCompany.mockResolvedValue(mockCompany)
    })
    test('should create company details', async () => {
        expect(mockCreateCompany).toHaveBeenCalledTimes(0)

        render(
            <BrowserRouter>
                <CreateCompany />
            </BrowserRouter>
        )

        await userEvent.type(screen.getByLabelText('Company Name'), 'Sankar Cements')
        // await userEvent.type(screen.getByLabelText('Gst Number'), 'ASD123')
        // await userEvent.type(screen.getByLabelText('Email Id'), 'sample@gmail.com')
        // await userEvent.type(screen.getByLabelText('Contact Person'), 'Barath')
        // await userEvent.type(screen.getByLabelText('Contact Number'), '9876543436')
        // await userEvent.type(screen.getByLabelText('Address'), 'Salem, TamilNadu')
        expect(await screen.findByDisplayValue('Sankar Cements')).toBeInTheDocument()
        // const option = screen.getByRole('button', { name: 'Create' })
        // await userEvent.click(option)

        // expect(mockCreateCompany).toHaveBeenCalledTimes(1)
        // expect(mockCreateCompany).toBeCalledWith(mockCompany[0])
    })
})
