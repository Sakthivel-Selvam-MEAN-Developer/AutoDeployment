import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CreateFactory from './factory'

const mockGetLoadingPoint = vi.fn()
const mockCreateFactory = vi.fn()

vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockGetLoadingPoint()
}))
vi.mock('../../services/loadingPoint', () => ({
    createLoadingPoint: () => mockCreateFactory()
}))
const mockPaymentDuesData = [
    {
        name: 'UltraTech Cements'
    }
]
const mockFacotryData = { name: 'goa', cementCompanyId: 1 }

describe('New trip test', () => {
    beforeEach(() => {
        mockGetLoadingPoint.mockResolvedValue(mockPaymentDuesData)
        mockCreateFactory.mockResolvedValue(mockFacotryData)
    })
    test('should fetch company data from Db', async () => {
        expect(mockGetLoadingPoint).toHaveBeenCalledTimes(0)
        expect(mockCreateFactory).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <CreateFactory />
            </BrowserRouter>
        )

        const options = screen.getByRole('combobox', { name: 'Select Company' })
        userEvent.click(options)
        await waitFor(() => screen.getByRole('listbox'))
        const opt = screen.getByRole('option', { name: 'UltraTech Cements' })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('UltraTech Cements')).toBeInTheDocument()
        expect(mockGetLoadingPoint).toHaveBeenCalledTimes(1)

        const checkbox = screen.getAllByRole('checkbox')
        expect(checkbox[0]).not.toBeChecked()
        expect(screen.getByRole('textbox', { name: 'Loading Point' })).toBeDisabled()
        await fireEvent.click(checkbox[0])
        expect(checkbox[0]).toBeChecked()
        expect(screen.getByRole('textbox', { name: 'Loading Point' })).toBeEnabled()

        await userEvent.type(screen.getByLabelText('Loading Point'), '12345abc')
        expect(await screen.findByDisplayValue('12345abc')).toBeInTheDocument()

        const save = screen.getByRole('button', { name: 'Save' })
        expect(save).toBeInTheDocument()
        await userEvent.click(save)
        expect(mockCreateFactory).toHaveBeenCalledTimes(1)
    })
})
