import loconavDevice from '../seed/loconavDevice.ts'
import loconavDeviceWithoutDep from '../seed/loconavDeviceWithoutDep.ts'
import vehicleDeviceWithoutDep from '../seed/vehiclesWithoutDependency.ts'
import { create as createVehicle } from './vehicle.ts'
import { create, createManyIfNotExist, getLoconavByVehicleNumber } from './loconavDevice.ts'

describe('loconav device', () => {
    it('should get device id by vehicle number', async () => {
        await create(loconavDevice)
        const loconavByVehicleNumber = await getLoconavByVehicleNumber(
            loconavDevice.vehicle.create.number
        )
        expect(loconavByVehicleNumber!.loconavDeviceId).toBe(loconavDevice.loconavDeviceId)
    })
    test('should create many if not existing', async () => {
        const number = 'TN93D5512'
        const vehicle = await createVehicle({ ...vehicleDeviceWithoutDep, number })
        await createManyIfNotExist([{ ...loconavDeviceWithoutDep, vehicleId: vehicle.id }])
        const actual = await getLoconavByVehicleNumber(number)
        expect(actual.vehicleId).toBe(vehicle.id)
    })
})
