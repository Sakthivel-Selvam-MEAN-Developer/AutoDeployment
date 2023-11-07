import { describe, jest } from '@jest/globals'
import { Prisma } from '@prisma/client'
import { vehicleDetail } from '../../httpClient/ktTelematics/sampleVehicleDetails.ts'
import { fetchDeviceDetails } from './fetchVehicles.ts'

const mockKtTelematicsApi = jest.fn()
const mockKtTelematicsModel = jest.fn()
const mockCreateVehicles = jest.fn()

const RawDetailsTestData = {
    ktTelematicsDeviceId: 123,
    ktTelematicsToken: 'asdfasdf',
    vehicleId: 10
}
const allVehicles = [
    { id: 10, number: 'TN93A7336' },
    { id: 20, number: 'TN52S3555' }
]

jest.mock(
    '../../httpClient/ktTelematics/getAllVehicleDetails',
    () => (authToken: string) => mockKtTelematicsApi(authToken)
)

jest.mock('../../models/ktTelematicsDevice', () => ({
    createManyIfNotExist: (inputs: Prisma.ktTelematicsDeviceCreateManyInput[]) =>
        mockKtTelematicsModel(inputs)
}))

jest.mock('../../models/vehicle', () => ({
    createManyIfNotExist: (inputs: Prisma.vehiclesCreateManyInput[]) => {
        mockCreateVehicles(inputs)
    },
    getAllVehicles: () => allVehicles
}))

describe('fetch device details', () => {
    it('should get device details from loconav', async () => {
        const authToken = 'asdfasdf'
        // eslint-disable-next-line
        // @ts-ignore
        mockKtTelematicsApi.mockResolvedValue([vehicleDetail])
        await fetchDeviceDetails(authToken)
        expect(mockKtTelematicsModel).toBeCalledWith([{ ...RawDetailsTestData, vehicleId: 10 }])
    })
})
