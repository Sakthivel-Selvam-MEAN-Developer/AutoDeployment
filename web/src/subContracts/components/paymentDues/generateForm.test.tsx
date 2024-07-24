import { vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import PaymentDuesList from './list'

const mockGroupedDues = vi.fn()
const mockExportFile = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getOnlyActiveDues: (date: number, status: boolean) => mockGroupedDues(date, status)
}))

vi.mock('./NEFTForm/exportFile', () => ({
    exportFile: () => mockExportFile()
}))

const mockPaymentDuesData = [
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: {
            count: 1,
            totalPayableAmount: 20000
        },
        bankDetails: [
            {
                name: 'Barath Logistics Pvt Ltd',
                accountNumber: 43534523,
                ifsc: 'zxy1234',
                address: 'Goa',
                accountTypeNumber: 10
            }
        ],
        tripDetails: [
            {
                id: 1,
                overallTripId: 1,
                payableAmount: 20000,
                type: 'initial pay',
                number: 'TN93D5512',
                invoiceNumber: 'ABC123',
                date: 1700764200,
                loadingPoint: 'Chennai-south',
                unloadingPoint: 'Salem'
            }
        ]
    }
]

describe('Generate NEFT Form', () => {
    test.skip('should generate NEFT form', async () => {
        mockGroupedDues.mockResolvedValue(mockPaymentDuesData)
        render(
            <BrowserRouter>
                <PaymentDuesList />
            </BrowserRouter>
        )
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()
        expect(screen.getByRole('textbox', { name: 'Gst Number' })).toBeDisabled()
        fireEvent.click(checkbox)
        expect(await screen.findByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
        expect(await screen.findByText('138768')).toBeInTheDocument()
        expect(await screen.findByText('abcdefg')).toBeInTheDocument()
        const transporter = screen.getByText('Barath Logistics Pvt Ltd')
        await userEvent.click(transporter)

        expect(await screen.findByText('TN93D3445')).toBeInTheDocument()
        expect(await screen.findByText('92400')).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Generate Form' }))
        expect(mockGroupedDues).toHaveBeenCalledTimes(1)
        expect(mockExportFile).toHaveBeenCalledTimes(1)
    })
})
