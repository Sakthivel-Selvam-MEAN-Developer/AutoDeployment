import { describe, expect, jest } from '@jest/globals'
import { Prisma } from '@prisma/client'
import { fetchMovements } from './fetchMovements.ts'
import { movement } from '../../httpClient/loconav/loconavMovement.ts'
import { rawStopTestData } from '../computeStops.test.ts'

const mockComputeStops = jest.fn()
const mockLoconavVehicleMap = jest.fn()
const mockLoconavMomentApi = jest.fn()
const mockMovementModel = jest.fn()
const mockStopModel = jest.fn()

jest.mock('../computeStops', () => () => mockComputeStops())
jest.mock('../../models/loconavDevice', () => ({
    getLoconavByVehicleNumber: (number: number) => mockLoconavVehicleMap(number)
}))
jest.mock(
    '../../httpClient/loconav/getMovements',
    () => (deviceId: number, from: number, to: number, authToken: string) =>
        mockLoconavMomentApi(deviceId, from, to, authToken)
)
jest.mock('../../models/movement', () => () => ({
    createMany: (inputs: Prisma.vehicleMovementsCreateManyInput[]) => mockMovementModel(inputs)
}))
jest.mock('../../models/gpsStop', () => ({
    createMany: (gpsStops: Prisma.gpsStopsCreateManyInput[]) => mockStopModel(gpsStops)
}))

describe('loconav movements', () => {
    it('should fetch loconav movements and persist in DB', async () => {
        const vehicleNumber = '10'
        const to = 123123123
        const from = 32412341234123
        const loconavDeviceId = 1324123
        const loconavToken = 'asdasdfasdf'
        // @ts-ignore
        mockLoconavVehicleMap.mockResolvedValue({
            loconavDeviceId,
            loconavToken,
            vehicle: { id: 10 }
        })
        mockComputeStops.mockReturnValue([rawStopTestData])
        // @ts-ignore
        mockLoconavMomentApi.mockResolvedValue([movement])
        await fetchMovements(from, to, vehicleNumber)
        expect(mockStopModel).toBeCalledWith([
            { ...rawStopTestData, vehicleId: 10, source: 'loconav' }
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
