import { Prisma } from '@prisma/client'
import { saveStops } from './saveStops.ts'

const mockComputeStops = vi.fn()
const mockMovementModel = vi.fn()
const mockStopModel = vi.fn()

vi.mock('./computeStops', () => ({ default: () => mockComputeStops() }))

vi.mock('../models/movement', () => ({
    createMany: (inputs: Prisma.vehicleMovementsCreateManyInput[]) => mockMovementModel(inputs)
}))
vi.mock('../models/gpsStop', () => ({
    createMany: (gpsStops: Prisma.gpsStopsCreateManyInput[]) => mockStopModel(gpsStops)
}))

describe('save stops', () => {
    it('should compute and persist stops', async () => {
        mockComputeStops.mockReturnValue([
            {
                startTime: 11,
                endTime: 12,
                durationInMillis: 13,
                latitude: 10,
                longitude: 10
            }
        ])
        await saveStops(
            [
                {
                    eventTime: 1698315362,
                    speed: 10,
                    latitude: 12,
                    longitude: 13,
                    vehicleId: 10,
                    source: 'loconav'
                }
            ],
            10,
            'loconav'
        )

        expect(mockStopModel).toBeCalledWith([
            {
                startTime: 11,
                endTime: 12,
                durationInMillis: 13,
                latitude: 10,
                longitude: 10,
                vehicleId: 10,
                source: 'loconav'
            }
        ])
        expect(mockComputeStops).toBeCalledWith()
        expect(mockMovementModel).toBeCalledWith([
            {
                eventTime: 1698315362,
                latitude: 12,
                longitude: 13,
                source: 'loconav',
                vehicleId: 10,
                speed: 10
            }
        ])
    })
    it('should abort saving stops if movements fails', () => {})
})
