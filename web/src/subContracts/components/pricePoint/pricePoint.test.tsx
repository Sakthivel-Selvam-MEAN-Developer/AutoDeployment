import { render, screen, waitFor } from '@testing-library/react'
import CreatePricepoint from './list'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const mockAllCementCompany = vi.fn()
const mockAllLoadingPoint = vi.fn()
const mockAllUnloadingPoint = vi.fn()

vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockAllCementCompany()
}))
vi.mock('../../services/loadingPoint', () => ({
    getLoadingPointByCompanyName: () => mockAllLoadingPoint()
}))
vi.mock('../../services/unloadingPoint', () => ({
    getUnloadingPointByCompanyName: () => mockAllUnloadingPoint()
}))
const mockCementData = [
    {
        name: 'UltraTech Cements'
    }
]
const mockLoadingPointData = [
    {
        name: 'Chennai'
    }
]
const mockUnloadingPointData = [
    {
        name: 'Salem'
    }
]

describe('Trip Test', () => {
    test('checking the component called NewTrip', async () => {
        mockAllCementCompany.mockResolvedValue(mockCementData)
        mockAllLoadingPoint.mockResolvedValue(mockLoadingPointData)
        mockAllUnloadingPoint.mockResolvedValue(mockUnloadingPointData)
        render(
            <BrowserRouter>
                <CreatePricepoint />
            </BrowserRouter>
        )
        expect(screen.getByText('Submit')).toBeInTheDocument()

        expect(screen.getByRole('spinbutton', { name: 'Freight Amount' }))
        await userEvent.type(screen.getByLabelText('Freight Amount'), '5000')
        expect(screen.getByDisplayValue('5000')).toBeVisible()

        expect(screen.getByRole('spinbutton', { name: 'Transporter Percentage' }))
        await userEvent.type(screen.getByLabelText('Transporter Percentage'), '10')
        expect(screen.getByDisplayValue('10')).toBeVisible()

        expect(screen.getByRole('spinbutton', { name: 'Transporter Amount' }))
        expect(screen.getByDisplayValue('4500.00')).toBeVisible()

        const options = screen.getByRole('combobox', { name: 'Select Company' })
        userEvent.click(options)
        await waitFor(() => screen.getByRole('listbox'))
        const opt = screen.getByRole('option', { name: 'UltraTech Cements' })
        userEvent.click(opt)
        expect(await screen.findByDisplayValue('UltraTech Cements')).toBeInTheDocument()
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)

        const loadingPoint = screen.getByRole('combobox', { name: 'Loading Point' })
        userEvent.click(loadingPoint)
        await waitFor(() => screen.getByRole('listbox'))
        const opt2 = screen.getByRole('option', { name: 'Chennai' })
        userEvent.click(opt2)
        expect(await screen.findByDisplayValue('Chennai')).toBeInTheDocument()
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)

        const unloadingPoint = screen.getByRole('combobox', { name: 'Unloading Point' })
        userEvent.click(unloadingPoint)
        await waitFor(() => screen.getByRole('listbox'))
        const opt3 = screen.getByRole('option', { name: 'Salem' })
        userEvent.click(opt3)
        expect(await screen.findByDisplayValue('Salem')).toBeInTheDocument()
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)
    })
})
