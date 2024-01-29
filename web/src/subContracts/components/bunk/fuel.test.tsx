import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Fuel from './fuel'

const mockCreateFuel = vi.fn()
const mockAllBunk = vi.fn()
const mockAllStationByBunk = vi.fn()
const mockAllTruck = vi.fn()

vi.mock('../../services/fuel', () => ({
    createFuel: (inputs: any) => mockCreateFuel(inputs)
}))
vi.mock('../../services/bunk', () => ({
    getAllBunk: () => mockAllBunk()
}))
vi.mock('../../services/fuelStation', () => ({
    getAllFuelStationByBunk: (bunkId: number) => mockAllStationByBunk(bunkId)
}))
vi.mock('../../services/truck', () => ({
    getAllTruck: () => mockAllTruck()
}))

const mockFuelData = {
    vehicleNumber: 'TN56CC5678',
    pricePerliter: 103,
    quantity: 10,
    totalprice: 1030,
    fuelStationId: 1,
    invoiceNumber: 'RTD43D',
    fueledDate: 1706553000
}
const mockAllBunkData = [
    {
        bunkName: 'Barath Petroleum'
    }
]
const mockStationByBunkData = [
    {
        id: 1,
        location: 'goa',
        bunkId: 1
    },
    {
        id: 2,
        location: 'salem',
        bunkId: 1
    }
]
const mockTruck = [
    {
        vehicleNumber: 'TN56CC5678'
    }
]

describe('Add Fuel Details', () => {
    beforeEach(() => {
        mockCreateFuel.mockResolvedValue(mockFuelData)
        mockAllBunk.mockResolvedValue(mockAllBunkData)
        mockAllStationByBunk.mockResolvedValue(mockStationByBunkData)
        mockAllTruck.mockResolvedValue(mockTruck)
    })
    test('should fetch bunk & station data from Db', async () => {
        expect(mockAllBunk).toHaveBeenCalledTimes(0)
        expect(mockAllStationByBunk).toHaveBeenCalledTimes(0)
        expect(mockAllTruck).toHaveBeenCalledTimes(0)
        render(
            <BrowserRouter>
                <Fuel />
            </BrowserRouter>
        )
        const bunkName = screen.getByRole('combobox', {
            name: 'Select Bunk'
        })
        await userEvent.click(bunkName)
        await waitFor(() => screen.getByRole('listbox'))
        const opt = screen.getByRole('option', {
            name: 'Barath Petroleum'
        })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('Barath Petroleum')).toBeInTheDocument()

        // Select Fuel Station
        const fuelStation = screen.getByRole('combobox', {
            name: 'Fuel Station'
        })
        await userEvent.click(fuelStation)
        await waitFor(() => screen.getByRole('listbox'))
        const opt2 = screen.getByRole('option', {
            name: 'goa'
        })
        await userEvent.click(opt2)
        expect(await screen.findByDisplayValue('goa')).toBeInTheDocument()

        // Select Vehicle in trip
        const vehicle = screen.getByRole('combobox', {
            name: 'Vehicle Number'
        })
        await userEvent.click(vehicle)
        await waitFor(() => screen.getByRole('listbox'))
        const opt3 = screen.getByRole('option', {
            name: 'TN56CC5678'
        })
        await userEvent.click(opt3)
        expect(await screen.findByDisplayValue('TN56CC5678')).toBeInTheDocument()

        // Input the Fuel price
        await userEvent.type(screen.getByLabelText('Fuel per Liter'), '103')
        expect(screen.getByDisplayValue('103')).toBeVisible()

        // Input the Fuel quantity
        await userEvent.type(screen.getByLabelText('Fuel Quantity'), '10')
        expect(screen.getByDisplayValue('10')).toBeVisible()

        // Calculate Total Price
        const fuelPerLiter = screen.getByRole('spinbutton', {
            name: 'Fuel per Liter'
        }) as HTMLInputElement
        const totalQuantity = screen.getByRole('spinbutton', {
            name: 'Fuel Quantity'
        }) as HTMLInputElement
        const totalPrice = screen.getByRole('spinbutton', {
            name: 'Total Price'
        }) as HTMLInputElement
        expect(parseInt(totalPrice.value)).toBe(
            parseInt(fuelPerLiter.value) * parseInt(totalQuantity.value)
        )
        await userEvent.type(screen.getByLabelText('Fueled Date'), '30012024')
        await userEvent.type(screen.getByLabelText('Invoice Number'), 'RTD43D')
        const save = screen.getByRole('button', { name: 'Add Fuel' })
        expect(save).toBeInTheDocument()
        await userEvent.click(save)
        expect(mockAllBunk).toHaveBeenCalledTimes(1)
        expect(mockAllStationByBunk).toHaveBeenCalledTimes(1)
        expect(mockAllTruck).toHaveBeenCalledTimes(1)
    })
})
