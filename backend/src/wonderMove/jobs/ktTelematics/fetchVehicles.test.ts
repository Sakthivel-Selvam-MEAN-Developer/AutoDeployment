import { describe, jest } from '@jest/globals'
import { vehicleDetail } from "../../httpClient/ktTelematics/sampleVehicleDetails"
import { Prisma } from '@prisma/client'
import { fetchDeviceDetails } from './fetchVehicles'


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

jest.mock('../../models/ktTelematicsDevice', () => {
    return {
        createManyIfNotExist: (inputs: Prisma.ktTelematicsDeviceCreateManyInput[]) => mockKtTelematicsModel(inputs)
    }
})

jest.mock('../../models/vehicle', () => {
    return {
        createManyIfNotExist: (inputs: Prisma.vehiclesCreateManyInput[]) => {
            mockCreateVehicles(inputs)
        },
        getAllVehicles: () => (allVehicles)
    }
})

describe('fetch device details', () => {
    it('should get device details from loconav', async () => {
        const authToken = 'asdfasdf'
        // @ts-ignore
        mockKtTelematicsApi.mockResolvedValue([vehicleDetail])
        await fetchDeviceDetails(authToken)
        expect(mockKtTelematicsModel).toBeCalledWith([{ ...RawDetailsTestData, vehicleId: 10 }])
    })
})