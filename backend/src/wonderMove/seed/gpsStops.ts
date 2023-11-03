import vehicle from './vehicle.ts'

export default {
    startTime: new Date(2023, 9, 2).getTime() / 1000,
    endTime: new Date(2023, 9, 3).getTime() / 1000,
    durationInMillis: 451200,
    latitude: 11.341,
    longitude: 77.7172,
    source: 'traccar',
    vehicle: {
        create: vehicle
    }
}
