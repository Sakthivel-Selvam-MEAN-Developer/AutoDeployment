import computeStops from './computeStops.ts'

describe('computeStops', () => {
    it('should return an empty array if no stops are found', () => {
        const stops = computeStops([
            { time: 11, speed: 10, latitude: 10, longitude: 10 },
            { time: 11, speed: 10, latitude: 11, longitude: 10 }
        ])
        expect(stops).toEqual([])
    })

    it('should return an array of stops if stops are found', () => {
        const stops = computeStops([
            { time: 11, speed: 10, latitude: 10, longitude: 10 },
            { time: 13, speed: 10, latitude: 10, longitude: 10 },
            { time: 14, speed: 10, latitude: 11, longitude: 10 },
            { time: 15, speed: 10, latitude: 11, longitude: 11 },
            { time: 16, speed: 10, latitude: 11, longitude: 11 },
            { time: 17, speed: 10, latitude: 11, longitude: 11 }
        ])
        expect(stops).toEqual([
            { startTime: 11, endTime: 13, durationInMillis: 2, latitude: 10, longitude: 10 },
            { startTime: 15, endTime: 17, durationInMillis: 2, latitude: 11, longitude: 11 }
        ])
    })
})
