import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TransporterDues from './transporterDues'
import userEvent from '@testing-library/user-event'

const mockGroupedDuesByName = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getOnlyActiveDues: () => mockGroupedDuesByName()
}))

const mockPaymentDuesData = [
    {
        name: 'Barath Logistics Pvt Ltd',
        dueDetails: {
            count: 2,
            totalPayableAmount: 138768
        },
        tripDetails: [
            {
                tripId: 1,
                payableAmount: 46368,
                type: 'initial pay'
            },
            {
                tripId: 3,
                payableAmount: 92400,
                type: 'initial pay'
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
                <TransporterDues />
            </BrowserRouter>
        )
        expect(await screen.findByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
        const transporter = screen.getByText('Barath Logistics Pvt Ltd')
        await userEvent.click(transporter)
        expect(await screen.findByText('46368')).toBeInTheDocument()
        expect(mockGroupedDuesByName).toHaveBeenCalledTimes(1)
    })
})
