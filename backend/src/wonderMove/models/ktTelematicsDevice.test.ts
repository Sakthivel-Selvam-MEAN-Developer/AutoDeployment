import ktTelematicsDevice from '../seed/ktTelematicsDevice.ts'
import vehicleDeviceWithoutDep from '../seed/vehiclesWithoutDependency.ts'
import ktTelematicsDeviceWithoutDep from '../seed/ktTelematicsDeviceWithoutDep.ts'
import { create as createVehicle } from './vehicle.ts'
import { create, createManyIfNotExist, getKtTelematicsByVehicleNumber } from './ktTelematicsDevice.ts'

describe('ktTelematics device', () => {
    it('should get device id by vehicle number', async () => {
        await create(ktTelematicsDevice)
        const ktTelematicsByVehicleNumber = await getKtTelematicsByVehicleNumber(
            ktTelematicsDevice.vehicle.create.number
        )
        expect(ktTelematicsByVehicleNumber!.ktTelematicsDeviceId).toBe(
            ktTelematicsDevice.ktTelematicsDeviceId
        )
    })
    test('should create many if not existing', async () => {
        const number = 'TN93D5512'
        const vehicle = await createVehicle({ ...vehicleDeviceWithoutDep, number })
        await createManyIfNotExist([{ ...ktTelematicsDeviceWithoutDep, vehicleId: vehicle.id }])
        const actual = await getKtTelematicsByVehicleNumber(number)
        expect(actual.vehicleId).toBe(vehicle.id)
    })
})
