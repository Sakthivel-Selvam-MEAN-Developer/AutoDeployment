import prisma from '../index'

export const create = (data: any) => prisma.stops.create({ data })
export const fetchStopsByVehicle = (number: string) =>
    prisma.stops.findMany({
        where: {
            active: true,
            gpsStop: {
                vehicles: {
                    number
                }
            }
        },
        include: {
            reason: true,
            gpsStop: true
        }
    })
export const updateStopReason = (id: number, stopReasonId: number) =>
    prisma.stops.update({
        where: {
            id
        },
        data: { stopReasonId }
    })

export const allPendingStopsForSingleVehicle = async (number: string) => {
    const vehicle = await prisma.stops.findMany({
        where: {
            gpsStop: {
                vehicles: {
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

export const getVehicleDetailByReason = async (id: number) => {
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

export const overrideStops = async (gpsStopId: number, data: any) => {
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
