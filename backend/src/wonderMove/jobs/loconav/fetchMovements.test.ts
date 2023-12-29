import { Prisma } from '@prisma/client'
import { fetchMovements } from './fetchMovements.ts'
import { movement } from '../../httpClient/loconav/loconavMovement.ts'
import { Movement } from '../computeStops.ts'

const mockLoconavVehicleMap = vi.fn()
const mockLoconavMomentApi = vi.fn()
const mockMovementModel = vi.fn()
const mockStopModel = vi.fn()
const mockSaveStop = vi.fn()

vi.mock('../saveStops', () => ({
    saveStops: (movementsInGenericFormat: Movement[], vehicleId: number, source: string) =>
        mockSaveStop(movementsInGenericFormat, vehicleId, source)
}))
vi.mock('../../models/loconavDevice', () => ({
    getLoconavByVehicleNumber: (number: number) => mockLoconavVehicleMap(number)
}))
vi.mock('../../httpClient/loconav/getMovements', () => ({
    default: (deviceId: number, from: number, to: number, authToken: string) =>
        mockLoconavMomentApi(deviceId, from, to, authToken)
}))
vi.mock('../../models/movement', () => ({
    createMany: (inputs: Prisma.vehicleMovementsCreateManyInput[]) => mockMovementModel(inputs)
}))
vi.mock('../../models/gpsStop', () => ({
    createMany: (gpsStops: Prisma.gpsStopsCreateManyInput[]) => mockStopModel(gpsStops)
}))

describe('loconav movements', () => {
    it('should fetch loconav movements and persist in DB', async () => {
        const vehicleNumber = 'TN10AB1234'
        const to = 123123123
        const from = 32412341234123
        const loconavDeviceId = 1324123
        const loconavToken = 'asdasdfasdf'
        mockLoconavVehicleMap.mockResolvedValue({
            loconavDeviceId,
            loconavToken,
            vehicle: { id: 10 }
        })
        mockLoconavMomentApi.mockResolvedValue([movement])
        await fetchMovements(from, to, vehicleNumber)
        expect(mockSaveStop).toBeCalledWith(
            [
                {
                    eventTime: 1698315362,
                    latitude: 15.012927,
                    longitude: 78.014107,
                    source: 'loconav',
                    speed: 0,
                    vehicleId: 10
                }
            ],
            10,
            'loconav'
        )
        expect(mockLoconavVehicleMap).toBeCalledWith(vehicleNumber)
        expect(mockLoconavMomentApi).toBeCalledWith(loconavDeviceId, from, to, loconavToken)
    })
    it('should abort when api call fails', () => {})
    it('should stop processing when  vehicle ID is not present for loconav', () => {})
})
