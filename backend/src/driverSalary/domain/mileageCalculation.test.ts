import { mileageCalculation } from './mileageCalculation.ts'

const fullTankFuels = [
    {
        fuelType: 'Full tank',
        dieselkilometer: 5100,
        vehicleNumber: 'TN12G9456',
        quantity: 12,
        totalprice: 1200,
        fueledDate: 1719400371,
        invoiceNumber: 'asdfghjkl',
        bunk: { bunkName: 'SRK Barath Petroleum' }
    }
]
const partialFuels = [
    {
        fuelType: 'Partial fill',
        dieselkilometer: 5000,
        vehicleNumber: 'TN12G9456',
        quantity: 5,
        totalprice: 400,
        fueledDate: 1719400371,
        invoiceNumber: 'asdfghjkl',
        bunk: { bunkName: 'SRK Barath Petroleum' }
    }
]
const previousFuels = {
    fuelType: 'Full tank',
    dieselkilometer: 5000,
    vehicleNumber: 'TN12G9456',
    quantity: 13,
    totalprice: 1200,
    fueledDate: 1719400371,
    invoiceNumber: 'asdfghjkl',
    bunk: { bunkName: 'SRK Barath Petroleum' }
}
const mileage = 14.29
describe('mileage calcultion', () => {
    test('should able to calculate mileage with previous fulltank available', async () => {
        const actual = mileageCalculation(fullTankFuels, partialFuels, previousFuels)
        expect(actual).toBe(mileage)
    })
    test('should able to calculate mileage with partialQuantity is not available', async () => {
        const actual = mileageCalculation(fullTankFuels, [], previousFuels)
        expect(actual).toBe(8.33)
    })
    test('should able to calculate mileage with previous fulltank fuel not available', async () => {
        const actual = mileageCalculation(fullTankFuels, partialFuels, null)
        expect(actual).toBe(0)
    })
    test('should not able to calculate mileage with current fulltank fuel not available', async () => {
        const actual = mileageCalculation([], partialFuels, previousFuels)
        expect(actual).toBe(0)
    })
})
