import reason from './reason.ts'
import gpsStops from './gpsStops.ts'

export default {
    startTime: new Date(2023, 9, 2).getTime() / 1000,
    endTime: new Date(2023, 9, 3).getTime() / 1000,
    durationInMillis: 451201,
    reason: {
        create: reason
    },
    gpsStop: {
        create: gpsStops
    }
}
