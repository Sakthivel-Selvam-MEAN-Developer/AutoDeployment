import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CreateFactory from './factory'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { client, client1 } from '../../../keycloakTest'

const mockGetAllCementCompany = vi.fn()
const mockCreateLoadingPoint = vi.fn()
const mockCreateUnloadingPoint = vi.fn()
const mockCreateStockPoint = vi.fn()

vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockGetAllCementCompany()
}))
vi.mock('../../services/loadingPoint', () => ({
    createLoadingPoint: (inputs: any) => mockCreateLoadingPoint(inputs)
}))
vi.mock('../../services/stockPoint', () => ({
    createStockPoint: (inputs: any) => mockCreateStockPoint(inputs)
}))
vi.mock('../../services/unloadingPoint', () => ({
    createUnloadingPoint: (inputs: any) => mockCreateUnloadingPoint(inputs)
}))
const mockCementCompanyData = [
    {
        id: 1,
        name: 'UltraTech Cements'
    }
]
const mockLoadingPointData = { name: 'goa west', cementCompanyId: 1, location: 'goa' }
const mockStockPointData = { name: 'delhi central', cementCompanyId: 1, location: 'delhi' }
const mockUnloadingPointData = { name: 'salem attur', cementCompanyId: 1, location: 'salem' }

describe('New trip test', () => {
    beforeEach(() => {
        mockGetAllCementCompany.mockResolvedValue(mockCementCompanyData)
        mockCreateLoadingPoint.mockResolvedValue(mockLoadingPointData)
        mockCreateStockPoint.mockResolvedValue(mockStockPointData)
        mockCreateUnloadingPoint.mockResolvedValue(mockUnloadingPointData)
    })
    test('should create loading point for a company', async () => {
        expect(mockGetAllCementCompany).toHaveBeenCalledTimes(0)
        expect(mockCreateLoadingPoint).toHaveBeenCalledTimes(0)
        expect(mockCreateStockPoint).toHaveBeenCalledTimes(0)
        expect(mockCreateUnloadingPoint).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <ReactKeycloakProvider authClient={client}>
                    <CreateFactory />
                </ReactKeycloakProvider>
            </BrowserRouter>
        )

        // Select Cement Company
        const options = screen.getByRole('combobox', { name: 'Select Company' })
        userEvent.click(options)
        await waitFor(() => screen.getByRole('listbox'))
        const opt = screen.getByRole('option', { name: 'UltraTech Cements' })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('UltraTech Cements')).toBeInTheDocument()
        expect(mockGetAllCementCompany).toHaveBeenCalledTimes(1)

        // Select Category
        const category = screen.getByRole('combobox', { name: 'Select Category' })
        userEvent.click(category)
        await waitFor(() => screen.getByRole('listbox'))
        const option = screen.getByRole('option', { name: 'Loading Point' })
        await userEvent.click(option)

        // Input the values
        await userEvent.type(screen.getByLabelText('Enter Loading Point'), 'goa west')
        await userEvent.type(screen.getByLabelText('Enter Location'), 'goa')

        const save = screen.getByRole('button', { name: 'Save' })
        await userEvent.click(save)

        expect(mockCreateLoadingPoint).toHaveBeenCalledWith(mockLoadingPointData)
        expect(mockCreateLoadingPoint).toHaveBeenCalledTimes(1)
    })
    test('should create stock point for a company', async () => {
        render(
            <BrowserRouter>
                <ReactKeycloakProvider authClient={client1}>
                    <CreateFactory />
                </ReactKeycloakProvider>
            </BrowserRouter>
        )

        // Select Cement Company
        const options = screen.getByRole('combobox', { name: 'Select Company' })
        userEvent.click(options)
        await waitFor(() => screen.getByRole('listbox'))
        const opt = screen.getByRole('option', { name: 'UltraTech Cements' })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('UltraTech Cements')).toBeInTheDocument()

        // Select Category
        const category = screen.getByRole('combobox', { name: 'Select Category' })
        userEvent.click(category)
        await waitFor(() => screen.getByRole('listbox'))
        const option = screen.getByRole('option', { name: 'Stock Point' })
        await userEvent.click(option)

        // Input the values
        await userEvent.type(screen.getByLabelText('Enter Stock Point'), 'delhi central')
        await userEvent.type(screen.getByLabelText('Enter Location'), 'delhi')

        const save = screen.getByRole('button', { name: 'Save' })
        await userEvent.click(save)

        expect(mockCreateStockPoint).toHaveBeenCalledWith(mockStockPointData)
        expect(mockCreateStockPoint).toHaveBeenCalledTimes(1)
    })
})
