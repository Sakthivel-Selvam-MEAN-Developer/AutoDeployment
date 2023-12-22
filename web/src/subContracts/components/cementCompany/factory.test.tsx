import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CreateFactory from './factory'

const mockGetLoadingPoint = vi.fn()
const mockCreateLoadingPoint = vi.fn()
const mockCreateUnloadingPoint = vi.fn()

vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockGetLoadingPoint()
}))
vi.mock('../../services/loadingPoint', () => ({
    createLoadingPoint: (inputs: any) => mockCreateLoadingPoint(inputs)
}))
vi.mock('../../services/unloadingPoint', () => ({
    createUnloadingPoint: (inputs: any) => mockCreateUnloadingPoint(inputs)
}))
const mockPaymentDuesData = [
    {
        id: 1,
        name: 'UltraTech Cements'
    }
]
const mockLoadingPointData = { name: 'goa', cementCompanyId: 1 }
const mockUnloadingPointData = { name: 'Salem', cementCompanyId: 1 }

describe('New trip test', () => {
    beforeEach(() => {
        mockGetLoadingPoint.mockResolvedValue(mockPaymentDuesData)
        mockCreateLoadingPoint.mockResolvedValue(mockLoadingPointData)
        mockCreateUnloadingPoint.mockResolvedValue(mockUnloadingPointData)
    })
    test('should fetch company data from Db', async () => {
        expect(mockGetLoadingPoint).toHaveBeenCalledTimes(0)
        expect(mockCreateLoadingPoint).toHaveBeenCalledTimes(0)
        expect(mockCreateUnloadingPoint).toHaveBeenCalledTimes(0)
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

        await userEvent.type(screen.getByLabelText('Loading Point'), 'goa')
        expect(await screen.findByDisplayValue('goa')).toBeInTheDocument()

        await fireEvent.click(checkbox[1])
        expect(checkbox[1]).toBeChecked()
        expect(screen.getByRole('textbox', { name: 'Unloading Point' })).toBeEnabled()

        await userEvent.type(screen.getByLabelText('Unloading Point'), 'Salem')
        expect(await screen.findByDisplayValue('Salem')).toBeInTheDocument()
        const save = screen.getByRole('button', { name: 'Save' })
        expect(save).toBeInTheDocument()
        await userEvent.click(save)

        expect(mockCreateLoadingPoint).toBeCalledWith(mockLoadingPointData)
        expect(mockCreateUnloadingPoint).toBeCalledWith(mockUnloadingPointData)
        expect(mockCreateUnloadingPoint).toHaveBeenCalledTimes(1)
        expect(mockCreateLoadingPoint).toHaveBeenCalledTimes(1)
    })
})
