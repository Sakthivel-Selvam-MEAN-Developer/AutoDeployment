import prisma from './index'

export const create = (data: any) => prisma.gpsStops.create({ data })

export const getGpsStops = () => prisma.gpsStops.findMany()

function getGpsStopInPersistableFormat(gpsStop: any) {
    const {
        startTime,
        endTime,
        durationInMillis,
        stopReasonId,
        vehicleId,
        latitude,
        longitude,
        source
    } = gpsStop
    return {
        startTime,
        endTime,
        durationInMillis,
        vehicleId,
        latitude,
        longitude,
        source,
        stops: {
            create: [{ startTime, endTime, durationInMillis, stopReasonId }]
        }
    }
}

const createIfNotExist = (gpsStop: any) => {
    const gpsStopWithStop = getGpsStopInPersistableFormat(gpsStop)
    return prisma.gpsStops.upsert({
        where: {
            vehicleStop: {
                vehicleId: gpsStopWithStop.vehicleId,
                startTime: gpsStopWithStop.startTime
            }
        },
        create: {
            ...gpsStopWithStop
        },
        update: {}
    })
}
export const createManyIfNotExist = (gpsStops: any) =>
    Promise.all(gpsStops.map(createIfNotExist))
