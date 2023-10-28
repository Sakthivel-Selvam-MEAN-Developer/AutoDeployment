import { describe, expect, jest } from '@jest/globals'
import { fetchMovements } from './fetchMovements.ts'

const mockComputeStops = jest.fn()
const mockLoconavVehicleMap = jest.fn()
const mockLoconavMomentApi = jest.fn()
const mockMovementModel = jest.fn()
const mockStopModel = jest.fn()

jest.mock('../computeStops', () => () => mockComputeStops())
jest.mock('../models/loconavDevice', () => {
    return { getLoconavByVehicleNumber: () => mockLoconavVehicleMap() }
})
jest.mock(
    '../../httpClient/loconav/getMovements',
    () => () => mockLoconavMomentApi()
)
jest.mock('../../models/movement', () => () => mockMovementModel())
jest.mock('../../models/gpsStop', () => () => mockStopModel())

describe('loconav movements', () => {
    it('should fetch loconav movements and persist in DB', async () => {
        const vehicleNumber = ''
        const to = 123123123
        const from = 32412341234123
        await fetchMovements(from, to, vehicleNumber)
        expect(mockLoconavMomentApi).toBeCalled()
    })
    it('should on fetch should compute stops', () => {})
    it('should on fetch should persist stops', () => {})
    it('should abort when api call fails', () => {})
    it('should stop processing when  vehicle ID is not present for loconav', () => {})
})
