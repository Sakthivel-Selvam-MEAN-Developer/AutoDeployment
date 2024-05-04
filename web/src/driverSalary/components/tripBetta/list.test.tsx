import { vi } from 'vitest'
import AddTripBetta from './list'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockGetAllCementCompany = vi.fn()
const mockAllLoadingPoint = vi.fn()
const mockAllUnloadingPoint = vi.fn()
const mockGetTripSalaryDetailsById = vi.fn()

vi.mock('../../services/tripBetta', () => ({
    getAllCementCompany: () => mockGetAllCementCompany(),
    getTripSalaryDetailsById: (inputs: any) => mockGetTripSalaryDetailsById(inputs)
}))
vi.mock('../../../subContracts/services/loadingPoint', () => ({
    getLoadingPointByCompanyName: () => mockAllLoadingPoint()
}))
vi.mock('../../../subContracts/services/unloadingPoint', () => ({
    getUnloadingPointByCompanyName: () => mockAllUnloadingPoint()
}))

const mockCementCompanyData = [
    {
        id: 1,
        name: 'UltraTech Cements'
    }
]
const mockLoadingPointData = [
    {
        id: 1,
        name: 'Chennai'
    }
]
const mockUnloadingPointData = [
    {
        id: 1,
        name: 'Salem'
    }
]

describe('Trip Details Test', () => {
    test('should display trip salary form fields', async () => {
        mockGetAllCementCompany.mockResolvedValue(mockCementCompanyData)
        mockAllLoadingPoint.mockResolvedValue(mockLoadingPointData)
        mockAllUnloadingPoint.mockResolvedValue(mockUnloadingPointData)
        mockGetTripSalaryDetailsById.mockResolvedValue({
            dailyBetta: 250,
            driverAdvance: 2000,
            tripBetta: 9000
        })
        render(
            <BrowserRouter>
                <AddTripBetta />
            </BrowserRouter>
        )

        //  Select Company Name
        const cementCompany = screen.getByRole('combobox', { name: 'Select Company' })
        userEvent.click(cementCompany)
        await waitFor(() => screen.getByRole('listbox'))
        const cementCompanyOption = screen.getByRole('option', { name: 'UltraTech Cements' })
        userEvent.click(cementCompanyOption)
        expect(await screen.findByDisplayValue('UltraTech Cements')).toBeInTheDocument()
        expect(mockGetAllCementCompany).toHaveBeenCalledTimes(1)

        //  Select Category Name
        const category = screen.getByRole('combobox', { name: 'Select Category' })
        userEvent.click(category)
        await waitFor(() => screen.getByRole('listbox'))
        const catagoryOption = screen.getByRole('option', { name: 'Loading - Unloading' })
        userEvent.click(catagoryOption)
        expect(await screen.findByDisplayValue('Loading - Unloading')).toBeInTheDocument()

        // Select Loading Point
        const loadingPoint = screen.getByRole('combobox', { name: 'Loading Point' })
        userEvent.click(loadingPoint)
        await waitFor(() => screen.getByRole('listbox'))
        const loadingPointOption = screen.getByRole('option', { name: 'Chennai' })
        userEvent.click(loadingPointOption)
        expect(await screen.findByDisplayValue('Chennai')).toBeInTheDocument()

        // Select Unloading Point
        const unloadingPoint = screen.getByRole('combobox', { name: 'Unloading Point' })
        userEvent.click(unloadingPoint)
        await waitFor(() => screen.getByRole('listbox'))
        const unloadingPointOption = screen.getByRole('option', { name: 'Salem' })
        userEvent.click(unloadingPointOption)
        expect(await screen.findByDisplayValue('Salem')).toBeInTheDocument()

        // Write on Input Fields
        expect(screen.getByRole('spinbutton', { name: 'Trip Salary' }))
        expect(screen.getByDisplayValue('9000')).toBeVisible()

        expect(screen.getByRole('spinbutton', { name: 'Driver Daily Salary' }))
        expect(screen.getByDisplayValue('250')).toBeVisible()

        expect(screen.getByRole('spinbutton', { name: 'Driver Advance' }))
        expect(screen.getByDisplayValue('2000')).toBeVisible()

        // Click Button
        expect(screen.getByText('Create / Update')).toBeInTheDocument()
    })
})
