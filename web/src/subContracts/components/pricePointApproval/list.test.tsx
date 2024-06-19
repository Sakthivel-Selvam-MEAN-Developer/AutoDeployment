import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import PricePointApprovalList from './list'
import userEvent from '@testing-library/user-event'

const mockGetTripsForPricePointApproval = vi.fn()
const mockGetPricePoint = vi.fn()

vi.mock('../../services/pricePointApproval', () => ({
    getTripsForPricePointApproval: () => mockGetTripsForPricePointApproval()
}))
vi.mock('../../services/pricePoint', () => ({
    getPricePoint: () => mockGetPricePoint()
}))
const mockData = [
    {
        id: 7,
        fuel: [],
        paymentDues: [],
        loadingPointToStockPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 8,
            startDate: 1718389800,
            invoiceNumber: 'retgh',
            filledLoad: 66,
            freightAmount: 1000,
            transporterAmount: 900,
            wantFuel: false,
            acknowledgeDueTime: null,
            totalTransporterAmount: 59400,
            tripStatus: false,
            loadingPointId: 1,
            unloadingPointId: 1,
            loadingPoint: {
                name: 'Chennai-south',
                cementCompany: {
                    advanceType: 100
                }
            },
            unloadingPoint: {
                name: 'Salem'
            },
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    csmName: 'Sakthivel',
                    transporterType: 'Market Transporter',
                    gstPercentage: null
                }
            }
        }
    }
]
const mockTransporterPercentage = { transporterPercentage: 10 }

describe('PricePoint Approval Test', () => {
    beforeEach(() => {
        mockGetTripsForPricePointApproval.mockResolvedValue(mockData)
        mockGetPricePoint.mockResolvedValue(mockTransporterPercentage)
    })
    test('checking the component called list', async () => {
        render(
            <BrowserRouter>
                <PricePointApprovalList />
            </BrowserRouter>
        )
        await expect(screen.getByText('Actions')).toBeInTheDocument()
        expect(screen.getByText('Transporter')).toBeVisible()
        expect(screen.getByText('Freight Amount')).toBeVisible()
        await waitFor(() => {
            expect(screen.getByText('retgh')).toBeInTheDocument()
            expect(screen.getAllByText('1000'))
            expect(screen.getByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Edit' }))
            expect(screen.getByRole('button', { name: 'Approved' }))
        })
        const option = screen.getByRole('button', { name: 'Edit' })
        await userEvent.click(option)
        expect(screen.getByRole('button', { name: 'Cancel' }))
        await userEvent.type(screen.getByLabelText('Edit FreightAmount'), '1')
        await expect(screen.getByDisplayValue('10001')).toBeInTheDocument()
        await expect(screen.getByDisplayValue('10')).toBeInTheDocument()
        expect(mockGetTripsForPricePointApproval).toHaveBeenCalledTimes(1)
        expect(mockGetPricePoint).toHaveBeenCalledTimes(1)
    })
})
