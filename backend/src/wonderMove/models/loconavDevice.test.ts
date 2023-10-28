import loconavDevice from '../seed/loconavDevice'
import { create, getLoconavByVehicleNumber } from './loconavDevice'

describe('loconav device', () => {
    it('should get device id by vehicle number', async () => {
        await create(loconavDevice)
        const loconavByVehicleNumber = await getLoconavByVehicleNumber(
            loconavDevice.vehicle.create.number
        )
        expect(loconavByVehicleNumber!.loconavDeviceId).toBe(
            loconavDevice.loconavDeviceId
        )
    })
})
