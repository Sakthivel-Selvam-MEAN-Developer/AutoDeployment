import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import AcknowledgementApprovalList from './list'

const mockGetTripForAcknowlegementApproval = vi.fn()
const mockApproveAcknowledgement = vi.fn()

vi.mock('../../services/acknowlegementApproval', () => ({
    getTripForAcknowlegementApproval: () => mockGetTripForAcknowlegementApproval(),
    approveAcknowledgement: () => mockApproveAcknowledgement()
}))

const mockData = [
    {
        id: 11,
        loadingPointToStockPointTripId: null,
        stockPointToUnloadingPointTripId: null,
        loadingPointToUnloadingPointTripId: 11,
        shortageQuantity: [
            {
                id: 11,
                overallTripId: 11,
                filledLoad: 34000,
                unloadedQuantity: 34000
            }
        ],
        truck: {
            id: 1,
            vehicleNumber: 'TN93D5512',
            transporter: {
                id: 1,
                name: 'Barath Logistics Pvt Ltd'
            }
        },
        stockPointToUnloadingPointTrip: null,
        loadingPointToUnloadingPointTrip: {
            id: 11,
            startDate: 1716316200,
            invoiceNumber: 'wefr',
            truck: {
                id: 1,
                vehicleNumber: 'TN93D5512',
                transporter: {
                    id: 1,
                    name: 'Barath Logistics Pvt Ltd'
                }
            },
            loadingPoint: {
                cementCompanyId: 1
            },
            unloadingPoint: {
                name: 'Salem'
            }
        },
        loadingPointToStockPointTrip: null
    }
]

describe('acknowledgement Approval Test', () => {
    beforeEach(() => {
        mockGetTripForAcknowlegementApproval.mockResolvedValue(mockData)
    })
    test('checking the component called list', async () => {
        render(
            <BrowserRouter>
                <AcknowledgementApprovalList />
            </BrowserRouter>
        )
        await expect(screen.getByText('Actions')).toBeInTheDocument()
        expect(screen.getByText('Transporter')).toBeVisible()
        expect(screen.getByText('Transporter')).toBeVisible()
        await waitFor(() => {
            expect(screen.getByText('wefr')).toBeInTheDocument()
            expect(screen.getAllByText('34000'))
            expect(screen.getByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
        })
        expect(screen.getByRole('button', { name: 'Edit' }))
        expect(screen.getByRole('button', { name: 'Approved' }))
        expect(mockGetTripForAcknowlegementApproval).toHaveBeenCalledTimes(1)
    })
})
