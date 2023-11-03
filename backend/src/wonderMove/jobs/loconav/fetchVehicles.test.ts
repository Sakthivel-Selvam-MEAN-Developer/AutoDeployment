import { describe, jest } from '@jest/globals'
import { Prisma } from '@prisma/client'
import { vehicleDetail } from '../../httpClient/loconav/sampleVehicleDetails.ts'
import { fetchDeviceDetails } from './fetchVehicles.ts'

const mockLoconavApi = jest.fn()
const mockLoconavModel = jest.fn()
const mockCreateVehicles = jest.fn()

const RawDetailsTestData = {
    loconavDeviceId: 123,
    loconavToken: 'asdfasdf',
    vehicleId: 10
}
const allVehicles = [
    { id: 10, number: 'TN93D5512' },
    { id: 20, number: 'TN52S3555' }
]

jest.mock(
    '../../httpClient/loconav/getAllVehicleDetails',
    () => (authToken: string) => mockLoconavApi(authToken)
)

jest.mock('../../models/loconavDevice', () => ({
    createManyIfNotExist: (inputs: Prisma.loconavDeviceCreateManyInput[]) =>
        mockLoconavModel(inputs)
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
        // @ts-ignore
        mockLoconavApi.mockResolvedValue([vehicleDetail])
        await fetchDeviceDetails(authToken)
        expect(mockLoconavModel).toBeCalledWith([{ ...RawDetailsTestData, vehicleId: 20 }])
    })
})
