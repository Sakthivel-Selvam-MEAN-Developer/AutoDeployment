import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import InvoiceList from './list'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'

const mockAllCementCompany = vi.fn()
const mockGetTripDetailsByFilterData = vi.fn()
const mockGetLastBillNumber = vi.fn()

vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockAllCementCompany()
}))
vi.mock('../../services/invoice', () => ({
    getTripDetailsByFilterData: (inputs: any) => mockGetTripDetailsByFilterData(inputs)
}))
vi.mock('../../services/billNumber', () => ({
    getLastBillNumber: () => mockGetLastBillNumber()
}))

const mockCementData = [
    {
        name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
    }
]
const mockDirectTripData = [
    {
        truckId: 1,
        loadingPointId: 1,
        unloadingPointId: 1,
        startDate: dayjs().unix(),
        filledLoad: 40,
        invoiceNumber: 'RTD43D',
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 40000,
        totalTransporterAmount: 36000,
        margin: 4000,
        wantFuel: true,
        truck: { vehicleNumber: 'TN34U666' },
        loadingPoint: { name: 'Erode' },
        unloadingPoint: { name: 'Delhi' }
    }
]
const mockBillNo = { lastBillNo: 'MGL23A-0' }
describe('Trip Test', () => {
    test('checking the component called NewTrip', async () => {
        mockAllCementCompany.mockResolvedValue(mockCementData)
        mockGetTripDetailsByFilterData.mockResolvedValue(mockDirectTripData)
        mockGetLastBillNumber.mockResolvedValue(mockBillNo)
        render(
            <BrowserRouter>
                <InvoiceList />
            </BrowserRouter>
        )
        await userEvent.type(screen.getByLabelText('From Date'), '24012023')
        await userEvent.type(screen.getByLabelText('To Date'), '24012023')
        const loading = screen.getByRole('combobox', {
            name: 'Select Company'
        })
        await userEvent.click(loading)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'ULTRATECH CEMENT LIMITED,TADIPATRI'
        })
        await userEvent.click(opt)
        expect(screen.getByText('Filter Details')).toBeInTheDocument()
        const start = screen.getByRole('button', { name: 'Filter Details' })
        await userEvent.click(start)
        expect(screen.getByText('RTD43D')).toBeInTheDocument()
        expect(screen.getByText('Erode')).toBeInTheDocument()
        expect(screen.getByText('Total Freight Amount')).toBeInTheDocument()
        expect(screen.getByText('40000')).toBeInTheDocument()
        expect(screen.getByText('Direct Trip')).toBeInTheDocument()
        expect(screen.getByText('LoadingToStock Trip')).toBeInTheDocument()
        expect(mockGetTripDetailsByFilterData).toHaveBeenCalledTimes(1)
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)
    })
})
