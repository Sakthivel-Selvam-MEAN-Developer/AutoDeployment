import { describe, expect, jest } from '@jest/globals'
import fetchTraccarStops from './fetchTraccarStops.ts'

const mockGetStops = jest.fn()
const mockCreateGpsStops = jest.fn()
const mockTraccarDevice = jest.fn()
const mockGetDefaultReasonId = jest.fn()

jest.mock('../models/stopReason', () => ({
    getDefaultReason: (a: any) => mockGetDefaultReasonId(a)
}))
jest.mock(
    '../httpClient/traccar/getStops',
    () => (id: any, from: number, to: number) => mockGetStops(id, from, to)
)

jest.mock('../models/gpsStop', () => ({
    createManyIfNotExist: (a: any) => mockCreateGpsStops(a)
}))
jest.mock('../models/traccarDevice', () => ({
    getTraccarByVehicleNumber: (a: any) => mockTraccarDevice(a)
}))
const responseFromApi: any[] = [
    {
        deviceId: 3,
        deviceName: 'TN88K0272',
        distance: 0.0,
        averageSpeed: 0.0,
        maxSpeed: 0.0,
        spentFuel: 0.0,
        startOdometer: 2716.97,
        endOdometer: 2717.23,
        startTime: '2023-09-15T00:14:48.000+00:00',
        endTime: '2023-09-15T00:18:16.000+00:00',
        positionId: 19575,
        latitude: 11.571956666666667,
        longitude: 77.72411333333334,
        address: 'NH544H, Tamil Nadu, IN',
        duration: 208000,
        engineHours: 0
    }
]

const mockTraceCarCall = (traccarId: number, vehicleId: number) => {
    mockTraccarDevice.mockReturnValue(
        new Promise((res) => {
            res({ traccarId, vehicleId })
        })
    )
}

const mockGetStopsCall = () => {
    mockGetStops.mockReturnValue(
        new Promise((res) => {
            res(responseFromApi)
        })
    )
}

const mockDefaultStops = () => {
    mockGetDefaultReasonId.mockReturnValue(
        new Promise((resolve) => {
            resolve({ id: 1 })
        })
    )
}

const baseTestSetup = async () => {
    const vehicleNumber: string = 'TN22BQ0535'
    const from: number = 1695915000
    const to: number = 1696001400
    const traccarId: number = 10
    const vehicleId: number = 20
    mockTraceCarCall(traccarId, vehicleId)
    mockGetStopsCall()
    mockDefaultStops()
    const actual = await fetchTraccarStops(vehicleNumber, from, to)
    return { vehicleNumber, from, to, responseFromApi, traccarId, actual }
}
describe('fetch traccar data', () => {
    it('should get data for given range', async () => {
        const { vehicleNumber, from, to, traccarId } = await baseTestSetup()
        // expect(actual).toBe(responseFromApi)
        expect(mockTraccarDevice).toBeCalledWith(vehicleNumber)
        expect(mockGetStops).toBeCalledWith(traccarId, from, to)
    })
    it('should persist data fetched from the traccar', async () => {
        await baseTestSetup()
        expect(mockCreateGpsStops).toBeCalledWith([
            {
                startTime: 1694736888,
                endTime: 1694737096,
                durationInMillis: 208000,
                latitude: 11.571956666666667,
                longitude: 77.72411333333334,
                source: 'traccar',
                vehicleId: 20,
                stopReasonId: 1
            }
        ])
    })
    it.skip('should return error on traccar api failure', () => {})
})
