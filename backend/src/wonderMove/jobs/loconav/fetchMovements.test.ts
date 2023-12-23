import { Prisma } from '@prisma/client'
import { fetchMovements } from './fetchMovements.ts'
import { movement } from '../../httpClient/loconav/loconavMovement.ts'

const mockComputeStops = vi.fn()
const mockLoconavVehicleMap = vi.fn()
const mockLoconavMomentApi = vi.fn()
const mockMovementModel = vi.fn()
const mockStopModel = vi.fn()

vi.mock('../computeStops', () => ({ default: () => mockComputeStops() }))
vi.mock('../../models/loconavDevice', () => ({
    getLoconavByVehicleNumber: (number: number) => mockLoconavVehicleMap(number)
}))
vi.mock('../../httpClient/loconav/getMovements', () => ({
    default: (deviceId: number, from: number, to: number, authToken: string) =>
        mockLoconavMomentApi(deviceId, from, to, authToken)
}))
vi.mock('../../models/movement', () => () => ({
    createMany: (inputs: Prisma.vehicleMovementsCreateManyInput[]) => mockMovementModel(inputs)
}))
vi.mock('../../models/gpsStop', () => ({
    createMany: (gpsStops: Prisma.gpsStopsCreateManyInput[]) => mockStopModel(gpsStops)
}))

describe('loconav movements', () => {
    it('should fetch loconav movements and persist in DB', async () => {
        const vehicleNumber = '10'
        const to = 123123123
        const from = 32412341234123
        const loconavDeviceId = 1324123
        const loconavToken = 'asdasdfasdf'
        // eslint-disable-next-line
        // @ts-ignore
        mockLoconavVehicleMap.mockResolvedValue({
            loconavDeviceId,
            loconavToken,
            vehicle: { id: 10 }
        })
        mockComputeStops.mockReturnValue([
            {
                startTime: 11,
                endTime: 12,
                durationInMillis: 13,
                latitude: 10,
                longitude: 10
            }
        ])
        // eslint-disable-next-line
        // @ts-ignore
        mockLoconavMomentApi.mockResolvedValue([movement])
        await fetchMovements(from, to, vehicleNumber)
        expect(mockStopModel).toBeCalledWith([
            {
                ...{
                    startTime: 11,
                    endTime: 12,
                    durationInMillis: 13,
                    latitude: 10,
                    longitude: 10
                },
                vehicleId: 10,
                source: 'loconav'
            }
        ])
        expect(mockLoconavVehicleMap).toBeCalledWith(vehicleNumber)
        expect(mockLoconavMomentApi).toBeCalledWith(loconavDeviceId, from, to, loconavToken)
        expect(mockComputeStops).toBeCalledWith()
        // expect(mockMovementModel).toBeCalledWith()
    })
    it('should on fetch should compute stops', () => {})
    it('should on fetch should persist stops', () => {})
    it('should abort when api call fails', () => {})
    it('should stop processing when  vehicle ID is not present for loconav', () => {})
})
