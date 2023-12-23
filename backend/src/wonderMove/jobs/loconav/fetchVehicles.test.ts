import { Prisma } from '@prisma/client'
import { vehicleDetail } from '../../httpClient/loconav/sampleVehicleDetails.ts'
import { fetchDeviceDetails } from './fetchVehicles.ts'

const mockLoconavApi = vi.fn()
const mockLoconavModel = vi.fn()
const mockCreateVehicles = vi.fn()

const RawDetailsTestData = {
    loconavDeviceId: 123,
    loconavToken: 'asdfasdf',
    vehicleId: 10
}
const allVehicles = [
    { id: 10, number: 'TN93D5512' },
    { id: 20, number: 'TN52S3555' }
]

vi.mock('../../httpClient/loconav/getAllVehicleDetails', () => ({
    default: (authToken: string) => mockLoconavApi(authToken)
}))

vi.mock('../../models/loconavDevice', () => ({
    createManyIfNotExist: (inputs: Prisma.loconavDeviceCreateManyInput[]) =>
        mockLoconavModel(inputs)
}))

vi.mock('../../models/vehicle', () => ({
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
        mockLoconavApi.mockResolvedValue([vehicleDetail])
        await fetchDeviceDetails(authToken)
        expect(mockLoconavModel).toBeCalledWith([{ ...RawDetailsTestData, vehicleId: 20 }])
    })
})
