import { describe, expect, jest } from '@jest/globals'

const mockComputeStops = jest.fn()
const mockLoconavMomentApi = jest.fn()
const mockMovementModel = jest.fn()
const mockStopModel = jest.fn()

jest.mock('../computeStops', () => () => mockComputeStops())
jest.mock(
    '../../httpClient/loconav/getMovements',
    () => () => mockLoconavMomentApi()
)
jest.mock('../../models/movements', () => () => mockMovementModel())
jest.mock('../../models/gpsStops', () => () => mockStopModel())

describe('loconav movements', () => {
    it('should fetch loconav movements and persist in DB', () => {
        expect(mockLoconavMomentApi).toBeCalled()
    })
    it('should on fetch should compute stops', () => {})
    it('should on fetch should persist stops', () => {})
    it('should abort when api call fails', () => {})
})
