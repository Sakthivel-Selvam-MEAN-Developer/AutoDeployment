import deleteStop from './deleteStop'

describe('Detete Stops in Stops Page', () => {
    test('delete 1st stop that updates start time and duration for 2nd stop', () => {
        const row = {
            id: 1,
            gpsStopId: 1,
            stopReasonId: 1,
            startTime: 10,
            endTime: 20,
            durationInMillis: 10
        }
        const index = 0
        const selectedRow = [
            {
                id: 1,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 10,
                endTime: 20,
                durationInMillis: 10
            },
            {
                id: 2,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 20,
                endTime: 50,
                durationInMillis: 30
            },
            {
                id: 3,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 50,
                endTime: 70,
                durationInMillis: 20
            }
        ]
        const remainingStops = deleteStop(row, index, selectedRow)

        expect(remainingStops).toEqual([
            { gpsStopId: 1, stopReasonId: 1, startTime: 10, endTime: 50, durationInMillis: 40 },
            { gpsStopId: 1, stopReasonId: 1, startTime: 50, endTime: 70, durationInMillis: 20 }
        ])
    })
    test('delete 2nd stop that updates end time and duration for 1st stop', () => {
        const row = {
            id: 2,
            gpsStopId: 1,
            stopReasonId: 1,
            startTime: 20,
            endTime: 50,
            durationInMillis: 30
        }
        const index = 1
        const selectedRow = [
            {
                id: 1,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 10,
                endTime: 20,
                durationInMillis: 10
            },
            {
                id: 2,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 20,
                endTime: 50,
                durationInMillis: 30
            },
            {
                id: 3,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 50,
                endTime: 70,
                durationInMillis: 20
            }
        ]
        const remainingStops = deleteStop(row, index, selectedRow)

        expect(remainingStops).toEqual([
            { gpsStopId: 1, stopReasonId: 1, startTime: 10, endTime: 50, durationInMillis: 40 },
            { gpsStopId: 1, stopReasonId: 1, startTime: 50, endTime: 70, durationInMillis: 20 }
        ])
    })
    test('delete 5th stop that updates end time and duration for 4th stop', () => {
        const row = {
            id: 5,
            gpsStopId: 1,
            stopReasonId: 1,
            startTime: 80,
            endTime: 90,
            durationInMillis: 10
        }
        const index = 4
        const selectedRow = [
            {
                id: 1,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 10,
                endTime: 20,
                durationInMillis: 10
            },
            {
                id: 2,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 20,
                endTime: 50,
                durationInMillis: 30
            },
            {
                id: 3,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 50,
                endTime: 70,
                durationInMillis: 20
            },
            {
                id: 4,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 70,
                endTime: 80,
                durationInMillis: 10
            },
            {
                id: 5,
                gpsStopId: 1,
                stopReasonId: 1,
                startTime: 80,
                endTime: 90,
                durationInMillis: 10
            }
        ]
        const remainingStops = deleteStop(row, index, selectedRow)

        expect(remainingStops).toEqual([
            { gpsStopId: 1, stopReasonId: 1, startTime: 10, endTime: 20, durationInMillis: 10 },
            { gpsStopId: 1, stopReasonId: 1, startTime: 20, endTime: 50, durationInMillis: 30 },
            { gpsStopId: 1, stopReasonId: 1, startTime: 50, endTime: 70, durationInMillis: 20 },
            { gpsStopId: 1, stopReasonId: 1, startTime: 70, endTime: 90, durationInMillis: 20 }
        ])
    })
})
