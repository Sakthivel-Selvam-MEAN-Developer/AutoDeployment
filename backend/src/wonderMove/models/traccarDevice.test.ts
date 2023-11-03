import traccarDevice from '../seed/traccarDevice.ts'
import { create, getTraccarByVehicleNumber } from './traccarDevice.ts'

describe('traccar device', () => {
    it('should get device id by vehicle number', async () => {
        await create(traccarDevice)
        const traccarByVehicleNumber = await getTraccarByVehicleNumber(
            traccarDevice.vehicle.create.number
        )
        expect(traccarByVehicleNumber!.traccarId).toBe(traccarDevice.traccarId)
    })
})
