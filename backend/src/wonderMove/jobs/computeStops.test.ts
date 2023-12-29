import computeStops from './computeStops.ts'

describe('computeStops', () => {
    it('should return an empty array if no stops are found', () => {
        const stops = computeStops([
            { eventTime: 11, speed: 10, latitude: 10, longitude: 10 },
            { eventTime: 11, speed: 10, latitude: 11, longitude: 10 }
        ])
        expect(stops).toEqual([])
    })

    it('should return an array of stops if stops are found', () => {
        const stops = computeStops([
            { eventTime: 11, speed: 10, latitude: 10, longitude: 10 },
            { eventTime: 13, speed: 10, latitude: 10, longitude: 10 },
            { eventTime: 14, speed: 10, latitude: 11, longitude: 10 },
            { eventTime: 15, speed: 10, latitude: 11, longitude: 11 },
            { eventTime: 16, speed: 10, latitude: 11, longitude: 11 },
            { eventTime: 17, speed: 10, latitude: 11, longitude: 11 }
        ])
        expect(stops).toEqual([
            { startTime: 11, endTime: 13, durationInMillis: 2, latitude: 10, longitude: 10 },
            { startTime: 15, endTime: 17, durationInMillis: 2, latitude: 11, longitude: 11 }
        ])
    })
})
