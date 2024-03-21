import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import AddVehicle from './addVehicle'

const mockCreateTruck = vi.fn()
const mockAllTransporter = vi.fn()

vi.mock('../../services/truck', () => ({
    createTruck: (inputs: any) => mockCreateTruck(inputs)
}))
vi.mock('../../services/transporter', () => ({
    getAllTransporter: () => mockAllTransporter()
}))

const mockTruckData = {
    vehicleNumber: 'Tn39cc5647',
    capacity: 45,
    transporterId: 1
}
const mockTransporterData = [
    {
        name: 'Barath Logistics',
        trucks: mockTruckData
    }
]
describe('Trip Test', () => {
    test('checking the component called NewTrip', async () => {
        mockAllTransporter.mockResolvedValue(mockTransporterData)
        mockCreateTruck.mockResolvedValue(mockTruckData)
        render(
            <BrowserRouter>
                <AddVehicle />
            </BrowserRouter>
        )
        const transporter = screen.getByRole('combobox', {
            name: 'Transporter'
        })
        await userEvent.click(transporter)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const options = screen.getByRole('option', {
            name: 'Barath Logistics'
        })
        await userEvent.click(options)

        await userEvent.type(screen.getByLabelText('Vehicle Number'), 'TN33GG1234')
        expect(screen.getByDisplayValue('TN33GG1234')).toBeVisible()

        expect(screen.getByRole('spinbutton', { name: 'Capacity' }))
        await userEvent.type(screen.getByLabelText('Capacity'), '11')
        expect(screen.getByDisplayValue('11')).toBeVisible()

        expect(screen.getByText('Create')).toBeInTheDocument()
        const option = screen.getByText('Create')
        await userEvent.click(option)

        expect(mockCreateTruck).toHaveBeenCalledTimes(1)
    })
})
