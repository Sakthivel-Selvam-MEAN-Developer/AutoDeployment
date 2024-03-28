import { Prisma } from '@prisma/client'
import prisma from '../../../../prisma/index.ts'
import { YetToBeIdentifiedReason } from '../stopReason.ts'

export const create = (data: Prisma.stopsCreateInput | Prisma.stopsUncheckedCreateInput) =>
    prisma.stops.create({ data })
export const fetchStopsByVehicle = (number: string) =>
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
            active: true,
            gpsStop: {
                vehicle: {
                    number
                }
            },
            reason: {
                name: YetToBeIdentifiedReason
            }
        },
        include: {
            gpsStop: true,
            reason: true
        }
    })
    return vehicle
}

export const getVehicleDetailByReason = async (id: number) =>
    prisma.stops.findMany({
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

export const overrideStops = async (gpsStopId: number, data: any) => {
    await prisma.stops.updateMany({
        where: { gpsStopId },
        data: { active: false }
    })
    const newStops = await prisma.stops.createMany({ data })
    return newStops
}

export const groupByStopReason = async (id: number) =>
    prisma.stops.groupBy({
        by: ['gpsStopId'],
        where: {
            stopReasonId: id,
            active: true
        },
        _count: true
    })
