import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TransporterDues from './paymentDues'
import userEvent from '@testing-library/user-event'

const mockGroupedDuesByName = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getOnlyActiveDues: () => mockGroupedDuesByName()
}))
vi.mock('../../../auth/checkUser', () => ({
    CheckUser: () => () => {
        return true
    }
}))
const mockPaymentDuesData = [
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: {
            count: 1,
            totalPayableAmount: 138768
        },
        bankDetails: [
            {
                name: 'Barath Logistics Pvt Ltd',
                accountNumber: '43534523',
                ifsc: 'HDFC1234',
                address: 'Goa',
                accountTypeNumber: 10
            }
        ],
        tripDetails: [
            {
                id: 1,
                tripId: 3,
                payableAmount: 92400,
                type: 'initial pay',
                number: 'TN93D3445',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                invoiceNumber: 'abcdefg',
                date: 1706580172
            }
        ]
    }
]

describe('New trip test', () => {
    beforeEach(() => {
        mockGroupedDuesByName.mockResolvedValue(mockPaymentDuesData)
    })
    test('should fetch company data from Db', async () => {
        expect(mockGroupedDuesByName).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <TransporterDues type={'initial pay'} />
            </BrowserRouter>
        )
        expect(await screen.findByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
        await userEvent.type(screen.getByLabelText('Payment Date'), '30012024')
        expect(await screen.findByText('138768.00')).toBeInTheDocument()
        expect(await screen.findByText('abcdefg')).toBeInTheDocument()
        const transporter = screen.getByText('Barath Logistics Pvt Ltd')
        await userEvent.click(transporter)

        expect(await screen.findByText('TN93D3445')).toBeInTheDocument()
        expect(await screen.findByText('92400')).toBeInTheDocument()

        await userEvent.type(screen.getByLabelText('Transaction Id'), '12345abc')
        expect(await screen.findByDisplayValue('12345abc')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Pay' }))
        expect(mockGroupedDuesByName).toHaveBeenCalledTimes(1)
    })
})
