import axios from 'axios'
import { getPreviousFuel } from './getPreviousFuel.ts'

vi.mock('axios', () => ({
    default: {
        get: vi.fn()
    }
}))
const mockFuel = [
    {
        fuelType: 'Full tank',
        dieselkilometer: 5000,
        vehicleNumber: 'TN12G9456',
        quantity: 13,
        totalprice: 1200,
        fueledDate: 1719400371,
        invoiceNumber: 'asdfghjkl',
        bunk: { bunkName: 'SRK Barath Petroleum' }
    }
]
const mockPreviousFuel = {
    fuelType: 'Full tank',
    dieselkilometer: 3500,
    vehicleNumber: 'TN12A9456',
    quantity: 45,
    totalprice: 1200,
    fueledDate: 1719400071,
    invoiceNumber: 'ASWS',
    bunk: { bunkName: 'SRK Barath Petroleum' }
}
describe('getPreviousFuel', () => {
    test('should make a GET request to the correct URL', async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({ data: mockPreviousFuel })
        const headers = { hostname: 'http://localhost' }
        const maxDate = 1643723400

        await getPreviousFuel(headers, maxDate, mockFuel)

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith('http://localhost/api/previousfuel', {
            params: {
                date: maxDate,
                vehicleNumber: mockFuel[0].vehicleNumber
            }
        })
    })
})
