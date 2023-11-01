import { describe, jest } from '@jest/globals'
import { vehicleDetail } from '../../httpClient/loconav/sampleVehicleDetails'
import { fetchDeviceDetails } from './fetchVehicles'
import { Prisma } from '@prisma/client'

const mockLoconavApi = jest.fn()
const mockLoconavModel = jest.fn()
const mockGetAllVehicles = jest.fn()

const RawDetailsTestData = {
    loconavDeviceId: 123,
    loconavToken: 'asdfasdf',
    vehicleId: 10
}

jest.mock(
    '../../httpClient/loconav/getAllVehicleDetails',
    () => (authToken: string) => mockLoconavApi(authToken)
)

jest.mock('../../models/loconavDevice', () => {
    return {
        createMany: (inputs: Prisma.loconavDeviceCreateManyInput[]) =>
            mockLoconavModel(inputs),
    }
})

jest.mock('../../models/vehicle', () =>
    () => mockGetAllVehicles()
)

describe('fetch device details', () => {
    it('should get device details from loconav', async () => {
        const authToken = 'asdfasdf'
        const number = 'TN93D5512'
        const id = 10
        // @ts-ignore
        mockLoconavApi.mockResolvedValue([vehicleDetail])
        await fetchDeviceDetails(authToken)
        mockGetAllVehicles.mockReturnValue({number, id})
        expect(mockLoconavModel).toBeCalledWith([
            { ...RawDetailsTestData, vehicleId: 10 }
        ])
    })
})
