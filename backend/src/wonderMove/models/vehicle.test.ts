import seedVehicle from '../seed/vehicle'
import seedVehicleWithoutDep from '../seed/vehiclesWithoutDependency.ts'
import {
    create,
    getAllVehicles,
    fetchVehicleByNumber,
    updateVehicleByNumber
} from './vehicle'

function validateDates(actual: any) {
    expect(actual.fcDate.getUTCMilliseconds()).toBe(
        seedVehicle.fcDate.getUTCMilliseconds()
    )
    expect(actual.insuranceExpiryDate.getUTCMilliseconds()).toBe(
        seedVehicle.insuranceExpiryDate.getUTCMilliseconds()
    )
    expect(actual.fiveYearPermitDate.getUTCMilliseconds()).toBe(
        seedVehicle.fiveYearPermitDate.getUTCMilliseconds()
    )
    expect(actual.npPermitDate.getUTCMilliseconds()).toBe(
        seedVehicle.npPermitDate.getUTCMilliseconds()
    )
    expect(actual.taxExpiryDate.getUTCMilliseconds()).toBe(
        seedVehicle.taxExpiryDate.getUTCMilliseconds()
    )
}

describe('Vehicle model', () => {
    test('should be able to access', async () => {
        await create(seedVehicle)
        const actual = await fetchVehicleByNumber(seedVehicle.number)
        expect(actual!.number).toBe(seedVehicle.number)
        expect(actual!.make).toBe(seedVehicle.make)
        expect(actual!.type).toBe(seedVehicle.type)
        expect(actual!.ownerName).toBe(seedVehicle.ownerName)
        expect(actual!.ownershipType).toBe(seedVehicle.ownershipType)
        validateDates(actual)
    })
    test('should get all vehicle numbers', async () => {
        await create(seedVehicle)
        const actual = await getAllVehicles()
        expect(actual.length).toBe(1)
        expect(actual[0].number).toBe(seedVehicle.number)
    })
    test('should get vehicle details by number', async () => {
        await create(seedVehicle)
        const number: string = 'TN88K0272'
        const actual = await fetchVehicleByNumber(seedVehicle.number)
        expect(actual!.number).toBe(number)
    })
    test('should update vehicle by number', async () => {
        await create(seedVehicle)
        await updateVehicleByNumber(seedVehicle.number, {
            ...seedVehicleWithoutDep,
            ownerName: 'linga'
        })
        const actual = await fetchVehicleByNumber(seedVehicle.number)
        expect(actual!.ownerName).toBe('linga')
    })
})
