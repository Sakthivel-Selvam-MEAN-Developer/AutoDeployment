import { Prisma } from '@prisma/client'
import { saveStops } from './saveStops.ts'
import { Movement } from './computeStops.ts'

const mockComputeStops = vi.fn()
const mockMovementModel = vi.fn()
const mockStopModel = vi.fn()
const mockPrismaTransaction = vi.fn()

vi.mock('./computeStops', () => ({
    default: (movements: Movement[]) => mockComputeStops(movements)
}))
vi.mock('../../../prisma/index.ts', () => ({
    default: { $transaction: (args: any) => mockPrismaTransaction(args) }
}))

vi.mock('../models/movement', () => ({
    createMany: (inputs: Prisma.vehicleMovementsCreateManyInput[]) => mockMovementModel(inputs)
}))
vi.mock('../models/gpsStop', () => ({
    createMany: (gpsStops: Prisma.gpsStopsCreateManyInput[]) => mockStopModel(gpsStops)
}))

const computeReturn = [
    {
        startTime: 11,
        endTime: 12,
        durationInMillis: 13,
        latitude: 10,
        longitude: 10
    }
]
const movementsInGenericFormat = [
    {
        eventTime: 1698315362,
        speed: 10,
        latitude: 12,
        longitude: 13,
        vehicleId: 10,
        source: 'loconav'
    }
]
const stopsToPersist = [
    {
        startTime: 11,
        endTime: 12,
        durationInMillis: 13,
        latitude: 10,
        longitude: 10,
        vehicleId: 10,
        source: 'loconav'
    }
]
const movementsToPersist = [
    {
        eventTime: 1698315362,
        latitude: 12,
        longitude: 13,
        source: 'loconav',
        vehicleId: 10,
        speed: 10
    }
]
describe('save stops', () => {
    it.skip('should compute and persist stops', async () => {
        mockComputeStops.mockReturnValue(computeReturn)
        mockStopModel.mockReturnValue('stopReturn')
        mockMovementModel.mockReturnValue('movementReturn')
        await saveStops(movementsInGenericFormat, 10, 'loconav')
        expect(mockStopModel).toBeCalledWith(stopsToPersist)
        expect(mockComputeStops).toBeCalledWith(movementsInGenericFormat)
        expect(mockMovementModel).toBeCalledWith(movementsToPersist)
        expect(mockPrismaTransaction).toBeCalledWith(['stopReturn', 'movementReturn'])
    })
})
