import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import CompanyReport from './listCompany'

const mockGetAllCementCompany = vi.fn()

vi.mock('../../../services/cementCompany', () => ({
    getAllCementCompany: () => mockGetAllCementCompany()
}))

const mockCompanyData = [
    {
        id: 1,
        name: 'sathki',
        gstNo: 'bcd123',
        address: 'new street',
        emailId: 'newEmail@gmail.com',
        contactPersonName: 'sakthi',
        contactPersonNumber: '555555'
    }
]
describe('Report Test', () => {
    beforeEach(() => {
        mockGetAllCementCompany.mockResolvedValue(mockCompanyData)
    })
    test('should be able to view Company Report', async () => {
        const handleEdit = vi.fn()
        render(
            <BrowserRouter>
                <CompanyReport handleEdit={handleEdit} />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('sathki')).toBeInTheDocument()
            expect(screen.getByText('bcd123')).toBeInTheDocument()
            expect(screen.getByText('new street')).toBeInTheDocument()
            expect(screen.getByText('newEmail@gmail.com')).toBeInTheDocument()
            expect(screen.getByText('555555')).toBeInTheDocument()
        })
        expect(mockGetAllCementCompany).toHaveBeenCalledTimes(1)
    })
})
