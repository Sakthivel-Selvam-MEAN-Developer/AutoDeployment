import prisma from '../index'

export const create = (data) => prisma.stops.create({ data })
export const fetchStopsByVehicle = (number) =>
    prisma.stops.findMany({
        where: {
            active: true,
            gpsStop: {
                vehicle: {
                    number
                }
            }
        },
        include: {
            reason: true,
            gpsStop: true
        }
    })
export const updateStopReason = (id, stopReasonId) =>
    prisma.stops.update({
        where: {
            id
        },
        data: { stopReasonId }
    })

export const allPendingStopsForSingleVehicle = async (number) => {
    const vehicle = await prisma.stops.findMany({
        where: {
            gpsStop: {
                vehicle: {
                    number
                }
            },
            reason: {
                name: 'Reason Not Updated'
            }
        },
        include: {
            gpsStop: true,
            reason: true
        }
    })
    return vehicle
}

export const getVehicleDetailByReason = async (id) => {
    const vehicle = await prisma.stops.findMany({
        where: {
            active: true,
            reason: {
                id
            }
        },
        include: {
            gpsStop: true
        }
    })
    return vehicle
}

export const overrideStops = async (gpsStopId, data) => {
    await prisma.stops.updateMany({
        where: {
            gpsStopId
        },
        data: {
            active: false
        }
    })
    const newStops = await prisma.stops.createMany({ data })
    return newStops
}
