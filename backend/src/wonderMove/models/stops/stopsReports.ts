import prisma from '../../../../prisma/index.ts'

interface Stop {
    stopReasonId: number
    startTime: number
    endTime: number
    durationInMillis: number
}
export const getDurationWithInRange = async (from: number, to: number): Promise<Stop[]> => {
    const duration = await prisma().stops.groupBy({
        by: ['stopReasonId'],
        where: {
            startTime: {
                gte: from
            },
            endTime: {
                lte: to
            },
            active: true
        },
        _sum: {
            durationInMillis: true
        }
    })
    // @ts-expect-error This is a prisma issue
    return duration.map((stop) => ({
        stopReasonId: stop.stopReasonId,
        durationInMillis: stop._sum.durationInMillis
    }))
}

export const getDurationStopBeforeFrom = async (from: number, to: number): Promise<Stop[]> => {
    const modifiedAggDuration: Record<number, Stop> = {}
    const stopsBeforeFrom = await prisma().stops.findMany({
        where: {
            startTime: {
                lt: from
            },
            endTime: {
                lte: to,
                gt: from
            },
            active: true
        },
        select: {
            stopReasonId: true,
            startTime: true,
            endTime: true,
            durationInMillis: true
        }
    })
    stopsBeforeFrom.forEach((stop: Stop) => {
        const durationInMillis = Math.min(to, stop.endTime) - Math.max(from, stop.startTime)
        if (modifiedAggDuration[stop.stopReasonId]) {
            modifiedAggDuration[stop.stopReasonId].durationInMillis += durationInMillis
        } else {
            modifiedAggDuration[stop.stopReasonId] = <Stop>{
                stopReasonId: stop.stopReasonId,
                durationInMillis
            }
        }
    })
    const aggDurationWithInRange = Object.values(modifiedAggDuration)
    return aggDurationWithInRange
}

export const getDurationStopAfterTo = async (from: number, to: number): Promise<Stop[]> => {
    const modifiedAggDuration: Record<number, Stop> = {}
    const stopsAfterTo = await prisma().stops.findMany({
        where: {
            startTime: {
                gte: from,
                lt: to
            },
            endTime: {
                gt: to
            },
            active: true
        },
        select: {
            stopReasonId: true,
            startTime: true,
            endTime: true,
            durationInMillis: true
        }
    })
    stopsAfterTo.forEach((stop: Stop) => {
        const durationInMillis = Math.min(to, stop.endTime) - Math.max(from, stop.startTime)
        if (modifiedAggDuration[stop.stopReasonId]) {
            modifiedAggDuration[stop.stopReasonId].durationInMillis += durationInMillis
        } else {
            modifiedAggDuration[stop.stopReasonId] = <Stop>{
                stopReasonId: stop.stopReasonId,
                durationInMillis
            }
        }
    })
    const aggDurationWithInRange = Object.values(modifiedAggDuration)
    return aggDurationWithInRange
}

export const getDurationGreaterThanFromTo = async (from: number, to: number): Promise<Stop[]> => {
    const modifiedAggDuration: Record<number, Stop> = {}
    const stopsBeyondRange = await prisma().stops.findMany({
        where: {
            startTime: {
                lt: from
            },
            endTime: {
                gt: to
            },
            active: true
        },
        select: {
            stopReasonId: true,
            startTime: true,
            endTime: true,
            durationInMillis: true
        }
    })
    stopsBeyondRange.forEach((stop: Stop) => {
        const durationInMillis = Math.min(to, stop.endTime) - Math.max(from, stop.startTime)
        if (modifiedAggDuration[stop.stopReasonId]) {
            modifiedAggDuration[stop.stopReasonId].durationInMillis += durationInMillis
        } else {
            modifiedAggDuration[stop.stopReasonId] = <Stop>{
                stopReasonId: stop.stopReasonId,
                durationInMillis
            }
        }
    })
    return Object.values(modifiedAggDuration)
}

async function fetchRelevantStops(from: number, to: number): Promise<Stop[]> {
    const withInRange = await getDurationWithInRange(from, to)
    const beforeFromAndTo = await getDurationStopBeforeFrom(from, to)
    const afterFromAndTo = await getDurationStopAfterTo(from, to)
    const greaterThanFromTo = await getDurationGreaterThanFromTo(from, to)

    const duration = [...withInRange, ...beforeFromAndTo, ...afterFromAndTo, ...greaterThanFromTo]
    return duration
}

function aggregateByReasonId(duration: any) {
    const groupedDurations = new Map()
    duration.forEach(({ stopReasonId, durationInMillis }: any) => {
        groupedDurations.set(
            stopReasonId,
            (groupedDurations.get(stopReasonId) || 0) + durationInMillis
        )
    })
    return Array.from(groupedDurations, ([stopReasonId, durationInMillis]) => ({
        stopReasonId: Number(stopReasonId),
        durationInMillis
    }))
}

export const getCombinedDuration = async (from: number, to: number) => {
    const duration = await fetchRelevantStops(from, to)
    return aggregateByReasonId(duration)
}
