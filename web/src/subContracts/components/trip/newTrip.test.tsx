import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import NewTrip from './newTrip'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'

const mockPricePoint = vi.fn()
const mockAllTransporter = vi.fn()
const mockAllCementCompany = vi.fn()
const mockTruckByTransporter = vi.fn()
const mockLoadingPointByCompanyName = vi.fn()
const mockUnloadingPointByCompanyName = vi.fn()
const mockFuelWithoutTripId = vi.fn()
const mockCreateTrip = vi.fn()
const mockcreateStockPointTrip = vi.fn()

vi.mock('../../services/transporter', () => ({
    getAllTransporter: () => mockAllTransporter()
}))
vi.mock('../../services/cementCompany', () => ({
    getAllCementCompany: () => mockAllCementCompany()
}))
vi.mock('../../services/trip', () => ({
    createTrip: (inputs: any) => mockCreateTrip(inputs)
}))
vi.mock('../../services/truck', () => ({
    getTruckByTransporter: () => mockTruckByTransporter()
}))
vi.mock('../../services/loadingPoint', () => ({
    getLoadingPointByCompanyName: () => mockLoadingPointByCompanyName()
}))
vi.mock('../../services/unloadingPoint', () => ({
    getUnloadingPointByCompanyName: () => mockUnloadingPointByCompanyName()
}))
vi.mock('../../services/pricePoint', () => ({
    getPricePoint: () => mockPricePoint()
}))
vi.mock('../../services/stockPointTrip', () => ({
    createStockPointTrip: (inputs: any) => mockcreateStockPointTrip(inputs)
}))

const mockCompanyData = [
    {
        name: 'UltraTech Cements',
        emailId: 'sample@gmail.com',
        contactPersonNumber: 9856453123
    }
]
const mockFactory = [
    {
        name: 'Chennai',
        cementCompany: mockCompanyData
    }
]
const mockDeliveryPoint = [
    {
        name: 'Salem',
        cementCompany: mockCompanyData
    }
]
const mockTruck = [
    {
        vehicleNumber: 'TN93D5512',
        capacity: 50
    },
    {
        vehicleNumber: 'TN52S3335',
        capacity: 48
    }
]
const mockTransporterData = [
    {
        name: 'Barath Logistics',
        bankDetails: {
            accountHolder: 'Barath',
            accountNumber: 15602
        },
        trucks: mockTruck
    }
]
const mockPricePointData = {
    freightAmount: 1000,
    transporterAmount: 900
}
const mockFuelData = {
    vehicleNumber: 'TN93D5512',
    pricePerliter: 103,
    quantity: 10,
    totalprice: 1030,
    fuelStationId: 1,
    loadingPointToUnloadingPointTripId: null,
    fuelStation: {
        bunk: {
            bunkName: 'Barath Petroleum'
        }
    }
}
const tripData = {
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
    wantFuel: true
}
async function newFunction() {
    render(
        <BrowserRouter>
            <NewTrip />
        </BrowserRouter>
    )
    //  Select Company Name
    const companyName = screen.getByRole('combobox', {
        name: 'Company Name'
    })
    await userEvent.click(companyName)
    await waitFor(() => {
        screen.getByRole('listbox')
    })
    const choice = screen.getByRole('option', {
        name: 'UltraTech Cements'
    })
    await userEvent.click(choice)

    //  Select Transporter
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

    //  Select Truck Number
    const truck = screen.getByRole('combobox', {
        name: 'Truck Number'
    })
    await userEvent.click(truck)
    await waitFor(() => {
        screen.getByRole('listbox')
    })
    const optin = screen.getByRole('option', {
        name: 'TN93D5512'
    })
    await userEvent.click(optin)

    //  Select Loading Point
    const loading = screen.getByRole('combobox', {
        name: 'Loading Point'
    })
    await userEvent.click(loading)
    await waitFor(() => {
        screen.getByRole('listbox')
    })
    const opt = screen.getByRole('option', {
        name: 'Chennai'
    })
    await userEvent.click(opt)

    //  Select Unloading
    const unLoading = screen.getByRole('combobox', {
        name: 'Unloading Point'
    })
    await userEvent.click(unLoading)
    await waitFor(() => {
        screen.getByRole('listbox')
    })
    const option = screen.getByRole('option', {
        name: 'Salem'
    })
    await userEvent.click(option)

    await userEvent.type(screen.getByLabelText('Invoice Number'), 'RTD43D')
    await userEvent.type(screen.getByLabelText('Quantity Loaded'), '40')
}
describe('New trip test', () => {
    beforeEach(() => {
        mockAllTransporter.mockResolvedValue(mockTransporterData)
        mockAllCementCompany.mockResolvedValue(mockCompanyData)
        mockTruckByTransporter.mockResolvedValue(mockTruck)
        mockLoadingPointByCompanyName.mockResolvedValue(mockFactory)
        mockUnloadingPointByCompanyName.mockResolvedValue(mockDeliveryPoint)
        mockPricePoint.mockResolvedValue(mockPricePointData)
        mockCreateTrip.mockResolvedValue(tripData)
    })
    test('should fetch company data from Db', async () => {
        expect(mockLoadingPointByCompanyName).toHaveBeenCalledTimes(0)
        expect(mockUnloadingPointByCompanyName).toHaveBeenCalledTimes(0)
        mockFuelWithoutTripId.mockResolvedValue(mockFuelData)
        render(
            <BrowserRouter>
                <NewTrip />
            </BrowserRouter>
        )
        const companyName = screen.getByRole('combobox', {
            name: 'Company Name'
        })
        await userEvent.click(companyName)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'UltraTech Cements'
        })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('UltraTech Cements')).toBeInTheDocument()
        expect(mockAllTransporter).toHaveBeenCalledTimes(1)
        expect(mockAllCementCompany).toHaveBeenCalledTimes(1)
        expect(mockTruckByTransporter).toHaveBeenCalledTimes(0)
        expect(mockLoadingPointByCompanyName).toHaveBeenCalledTimes(1)
        expect(mockUnloadingPointByCompanyName).toHaveBeenCalledTimes(1)
    })
    test('should fetch transporter data from Db', async () => {
        mockFuelWithoutTripId.mockResolvedValue(mockFuelData)
        render(
            <BrowserRouter>
                <NewTrip />
            </BrowserRouter>
        )
        const transporter = screen.getByRole('combobox', {
            name: 'Transporter'
        })
        await userEvent.click(transporter)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const option = screen.getByRole('option', {
            name: 'Barath Logistics'
        })
        await userEvent.click(option)
        expect(mockTruckByTransporter).toHaveBeenCalledTimes(1)
        expect(await screen.findByDisplayValue('Barath Logistics')).toBeInTheDocument()
    })
    test('should fetch truck data by their transporter', async () => {
        mockFuelWithoutTripId.mockResolvedValue(mockFuelData)
        render(
            <BrowserRouter>
                <NewTrip />
            </BrowserRouter>
        )
        //  Select Transporter
        const transporter = screen.getByRole('combobox', {
            name: 'Transporter'
        })
        await userEvent.click(transporter)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const option = screen.getByRole('option', {
            name: 'Barath Logistics'
        })
        await userEvent.click(option)
        //  Select Truck Number
        const truck = screen.getByRole('combobox', {
            name: 'Truck Number'
        })
        await userEvent.click(truck)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'TN93D5512'
        })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('TN93D5512')).toBeInTheDocument()
    })
    test('should get price point of loading and unloading point', async () => {
        mockFuelWithoutTripId.mockResolvedValue(mockFuelData)
        render(
            <BrowserRouter>
                <NewTrip />
            </BrowserRouter>
        )
        //  Select Company Name
        const companyName = screen.getByRole('combobox', {
            name: 'Company Name'
        })
        await userEvent.click(companyName)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const choice = screen.getByRole('option', {
            name: 'UltraTech Cements'
        })
        await userEvent.click(choice)

        //  Select Loading Point
        const loading = screen.getByRole('combobox', { name: 'Loading Point' })
        await userEvent.click(loading)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const opt = screen.getByRole('option', {
            name: 'Chennai'
        })
        await userEvent.click(opt)
        expect(await screen.findByDisplayValue('Chennai')).toBeInTheDocument()

        //  Select Unloading
        const unLoading = screen.getByRole('combobox', {
            name: 'Unloading Point'
        })
        await userEvent.click(unLoading)
        await waitFor(() => {
            screen.getByRole('listbox')
        })
        const option = screen.getByRole('option', {
            name: 'Salem'
        })
        await userEvent.click(option)
        expect(await screen.findByDisplayValue('Salem')).toBeInTheDocument()
        expect(screen.getByDisplayValue('1000')).toBeVisible()
        expect(screen.getByDisplayValue('900')).toBeVisible()

        await userEvent.type(screen.getByLabelText('Quantity Loaded'), '40')
        expect(screen.getByDisplayValue('40')).toBeVisible()
        const quantity = screen.getByRole('spinbutton', {
            name: 'Quantity Loaded'
        }) as HTMLInputElement
        const freight = screen.getByRole('spinbutton', {
            name: 'Freight Amount'
        }) as HTMLInputElement
        const transporter = screen.getByRole('spinbutton', {
            name: 'Transporter Amount'
        }) as HTMLInputElement
        const totalFreight = parseInt(quantity.value) * parseInt(freight.value)
        const totalTransporter = parseInt(quantity.value) * parseInt(transporter.value)
        const totalFreightValue = screen.getByRole('spinbutton', {
            name: 'Total Freight Amount'
        }) as HTMLInputElement
        const totalTransporterValue = screen.getByRole('spinbutton', {
            name: 'Total Transporter Amount'
        }) as HTMLInputElement
        const totalMargin = screen.getByRole('spinbutton', {
            name: 'Total Margin'
        }) as HTMLInputElement
        expect(parseInt(totalFreightValue.value)).toBe(totalFreight)
        expect(parseInt(totalTransporterValue.value)).toBe(totalTransporter)
        expect(parseInt(totalMargin.value)).toBe(totalFreight - totalTransporter)
    })
    test('should not create dues untill fuel created, if they need fuel', async () => {
        mockFuelWithoutTripId.mockResolvedValue(null)
        await newFunction()
        const checkbox = screen.getByTestId('want-fuel')
        fireEvent.click(checkbox)

        const start = screen.getByRole('button', { name: 'Start' })
        await userEvent.click(start)

        expect(mockCreateTrip).toHaveBeenCalledTimes(1)
    })
    test.skip('should create dues, if they already fueled before trip', async () => {
        mockFuelWithoutTripId.mockResolvedValue(mockFuelData)
        await newFunction()
        const checkbox = screen.getByTestId('want-fuel')
        fireEvent.click(checkbox)

        const start = screen.getByRole('button', { name: 'Start' })
        await userEvent.click(start)

        expect(mockCreateTrip).toHaveBeenCalledTimes(2)
    })
    test('should create dues, if they already fueled before trip', async () => {
        await newFunction()

        const checkbox = screen.getByTestId('stock-point')
        fireEvent.click(checkbox)

        const start = screen.getByRole('button', { name: 'Start' })
        await userEvent.click(start)

        expect(mockCreateTrip).toHaveBeenCalledTimes(2)
    })
})
