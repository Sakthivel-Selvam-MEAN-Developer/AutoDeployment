import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BunkDues from './bunkDues'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

const mockGroupedDuesByName = vi.fn()

vi.mock('../../services/paymentDues', () => ({
    getOnlyActiveDues: () => mockGroupedDuesByName()
}))

const mockPaymentDuesData = [
    {
        name: 'Barath Petroleum',
        dueDetails: {
            count: 1,
            totalPayableAmount: 11200
        },
        tripDetails: [
            {
                id: 5,
                tripId: 4,
                payableAmount: 1200,
                type: 'fuel pay',
                number: 'TN29B3246',
                vehicleNumber: 'TN29B3246',
                loadingPoint: 'Chennai',
                unloadingPoint: 'Salem',
                stationLocation: {
                    fuelStation: {
                        location: 'Chennai'
                    }
                }
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
                <BunkDues />
            </BrowserRouter>
        )
        expect(await screen.findByText('Barath Petroleum')).toBeInTheDocument()
        expect(await screen.findByText('11200')).toBeInTheDocument()
        const transporter = screen.getByText('Barath Petroleum')
        await userEvent.click(transporter)
        expect(await screen.findByText('TN29B3246')).toBeInTheDocument()
        expect(await screen.findByText('1200')).toBeInTheDocument()

        await userEvent.type(screen.getByLabelText('Transaction Id'), '12345abc')
        expect(await screen.findByDisplayValue('12345abc')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Pay' }))
        expect(mockGroupedDuesByName).toHaveBeenCalledTimes(1)
    })
})
