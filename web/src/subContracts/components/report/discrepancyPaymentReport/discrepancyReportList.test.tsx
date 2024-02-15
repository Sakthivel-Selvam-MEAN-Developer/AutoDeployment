import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ListAllDiscrepancyReport from './discrepancyReportList'

const mockGetAllDiscrepancyReport = vi.fn()

vi.mock('../../../services/overallTrips', () => ({
    getAllDiscrepancyReport: (from: any, to: any) => mockGetAllDiscrepancyReport(from, to)
}))

const mockdiscrepancyData = [
    {
        vehicleNumber: 'TN93D5512',
        invoiceNumber: 'BB123423',
        transporterName: 'Barath Logistics Pvt Ltd',
        csmName: 'Sakthivel',
        transporterAmount: 51480,
        totalPaidAmount: 51480,
        differenceAmount: 0
    }
]
describe('Report Test', () => {
    beforeEach(() => {
        mockGetAllDiscrepancyReport.mockResolvedValue(mockdiscrepancyData)
    })
    test('should be able to view discrepancy data after clicking submit', async () => {
        render(
            <BrowserRouter>
                <ListAllDiscrepancyReport />
            </BrowserRouter>
        )
        await userEvent.type(screen.getByLabelText('Due Start Date'), '08022024')
        await userEvent.type(screen.getByLabelText('Due End Date'), '23022024')
        const start = screen.getByRole('button', { name: 'Filter' })
        await userEvent.click(start)
        expect(screen.getByText('Vehicle Number')).toBeInTheDocument()
        expect(screen.getByText('CSM Name')).toBeInTheDocument()
        expect(screen.getByText('Invoice Number')).toBeInTheDocument()
        expect(screen.getByText('Difference Amount')).toBeInTheDocument()
        expect(mockGetAllDiscrepancyReport).toHaveBeenCalledTimes(2)
    })
})
test('should to able to filter overalltrip with user input', async () => {
    render(
        <BrowserRouter>
            <ListAllDiscrepancyReport />
        </BrowserRouter>
    )
    await userEvent.type(screen.getByLabelText('Due Start Date'), '08022024')
    await userEvent.type(screen.getByLabelText('Due End Date'), '23022024')
    const start = screen.getByRole('button', { name: 'Filter' })
    await userEvent.click(start)

    expect(screen.getByText('Vehicle Number')).toBeInTheDocument()
    expect(screen.getByText('CSM Name')).toBeInTheDocument()
    expect(screen.getByText('Difference Amount')).toBeInTheDocument()
    expect(screen.getByText('Invoice Number')).toBeInTheDocument()
    expect(screen.getByText('Barath Logistics Pvt Ltd')).toBeInTheDocument()
    expect(screen.getByText('Sakthivel')).toBeInTheDocument()
    expect(mockGetAllDiscrepancyReport).toHaveBeenCalledTimes(4)
})
