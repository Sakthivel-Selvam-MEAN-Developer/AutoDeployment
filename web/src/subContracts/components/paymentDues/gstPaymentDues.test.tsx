import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import GSTPaymentDues from './gstPaymentDues'

const mockGroupedGSTDuesByName = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getGstDues: () => mockGroupedGSTDuesByName()
}))

const mockPaymentDuesData = [
    {
        name: 'Dalmia Cements',
        dueDetails: {
            count: 1,
            payableAmount: 1296
        },
        bankDetails: [
            {
                name: 'Dalmia Cements',
                accountNumber: '3242343',
                ifsc: '234',
                address: '34234',
                accountTypeNumber: 12
            }
        ],
        tripDetails: [
            {
                id: 3,
                vehicleNumber: 'KR10S1290',
                type: 'gst pay',
                amount: 1296
            }
        ]
    }
]

describe('New trip test', () => {
    beforeEach(() => {
        mockGroupedGSTDuesByName.mockResolvedValue(mockPaymentDuesData)
    })
    test('should fetch GST data from Db', async () => {
        expect(mockGroupedGSTDuesByName).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <GSTPaymentDues />
            </BrowserRouter>
        )
        expect(await screen.findByText('Dalmia Cements')).toBeInTheDocument()
        const transporter = screen.getByText('Dalmia Cements')
        await userEvent.click(transporter)
        expect(await screen.findByText('KR10S1290')).toBeInTheDocument()
        expect(await screen.findByText('gst pay')).toBeInTheDocument()

        await userEvent.type(screen.getByLabelText('Transaction Id'), '12345abc')
        expect(await screen.findByDisplayValue('12345abc')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Pay' }))
        expect(mockGroupedGSTDuesByName).toHaveBeenCalledTimes(1)
    })
})
