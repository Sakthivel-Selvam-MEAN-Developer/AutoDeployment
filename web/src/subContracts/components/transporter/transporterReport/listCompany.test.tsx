import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import TransporterReport from './listTransporter'

const mockGetAllTransporter = vi.fn()

vi.mock('../../../services/transporter', () => ({
    getAllTransporter: () => mockGetAllTransporter()
}))

const mockTransporterData = [
    {
        id: 1,
        name: 'sakthi',
        csmName: 'sakthi',
        emailId: 'sakthi@gmail.com',
        contactPersonName: 'sakthi',
        contactPersonNumber: '54656',
        address: 'new address',
        hasGst: null,
        gstNumber: null,
        gstPercentage: null,
        hasTds: null,
        transporterType: 'Own',
        tdsPercentage: null,
        accountHolder: 'sakthi',
        accountNumber: '123456789',
        ifsc: 'ifsc1234',
        accountTypeNumber: 3456789
    }
]
describe('Report Test', () => {
    beforeEach(() => {
        mockGetAllTransporter.mockResolvedValue(mockTransporterData)
    })
    test('should be able to view Company Report', async () => {
        const handleEdit = vi.fn()
        render(
            <BrowserRouter>
                <TransporterReport handleEdit={handleEdit} />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('Email Id')).toBeInTheDocument()
            expect(screen.getByText('Own')).toBeInTheDocument()
            expect(screen.getByText('new address')).toBeInTheDocument()
            expect(screen.getByText('sakthi@gmail.com')).toBeInTheDocument()
        })
        expect(mockGetAllTransporter).toHaveBeenCalledTimes(1)
    })
})
