import { describe, jest } from '@jest/globals'
import { RawDetailsTestData } from './computeDevice.test'
import { vehicleDetail } from '../../httpClient/loconav/sampleVehicleDetails'
import { fetchDeviceDetails } from './fetchVehicles'
// import { Prisma } from '@prisma/client'

const mockComputeDevice = jest.fn()
const mockFormatDetails = jest.fn()
// const mockLoconavModel = jest.fn()

jest.mock('./computeDevice', () => () => mockComputeDevice())
jest.mock('../../httpClient/loconav/getAllVehicleDetails',() =>
    () => mockFormatDetails()
)
// jest.mock('../../models/loconavDevice', () => {
//     return { createMany: (data: Prisma.gpsStopsCreateManyInput[]) => mockLoconavModel(data) }
// })

describe('fetch device details', () => {
    it('should get device details from loconav', async () => {
        const authToken = 'asdfasdf'
        mockComputeDevice.mockReturnValue([RawDetailsTestData])
        // @ts-ignore
        mockFormatDetails.mockResolvedValue([vehicleDetail])
        const actual = await fetchDeviceDetails(authToken)
        expect(mockComputeDevice).toBeCalledWith()
        expect(mockFormatDetails).toBeCalledWith()
        console.log(actual);
    })
})
