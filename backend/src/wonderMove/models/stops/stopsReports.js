import prisma from '../index'

export const getDurationWithInRange = async (from, to) => {
    const duration = await prisma.stops.groupBy({
        by: ['stopReasonId'],
        where: {
            startTime: {
                gte: from
            },
            endTime: {
                lte: to
            }
        },
        _sum: {
            durationInMillis: true
        }
    })
    return duration.map((stop) => ({
        stopReasonId: stop.stopReasonId,
        // This is a prisma issue
        // eslint-disable-next-line no-underscore-dangle
        durationInMillis: stop._sum.durationInMillis
    }))
}

export const getDurationStopBeforeFrom = async (from, to) => {
    const modifiedAggDuration = {}
    const stopsBeforeFrom = await prisma.stops.findMany({
        where: {
            startTime: {
                lt: from
            },
            endTime: {
                lte: to,
                gt: from
            }
        },
        select: {
            stopReasonId: true,
            startTime: true,
            endTime: true,
            durationInMillis: true
        }
    })
    stopsBeforeFrom.forEach((stop) => {
        const durationInMillis =
            Math.min(to, stop.endTime) - Math.max(from, stop.startTime)
        if (modifiedAggDuration[stop.stopReasonId]) {
            modifiedAggDuration[stop.stopReasonId].durationInMillis +=
                durationInMillis
        } else {
            modifiedAggDuration[stop.stopReasonId] = {
                stopReasonId: stop.stopReasonId,
                durationInMillis
            }
        }
    })
    const aggDurationWithInRange = Object.values(modifiedAggDuration)
    return aggDurationWithInRange
}

export const getDurationStopAfterTo = async (from, to) => {
    const modifiedAggDuration = {}
    const stopsAfterTo = await prisma.stops.findMany({
        where: {
            startTime: {
                gte: from,
                lt: to
            },
            endTime: {
                gt: to
            }
        },
        select: {
            stopReasonId: true,
            startTime: true,
            endTime: true,
            durationInMillis: true
        }
    })
    stopsAfterTo.forEach((stop) => {
        const durationInMillis =
            Math.min(to, stop.endTime) - Math.max(from, stop.startTime)
        if (modifiedAggDuration[stop.stopReasonId]) {
            modifiedAggDuration[stop.stopReasonId].durationInMillis +=
                durationInMillis
        } else {
            modifiedAggDuration[stop.stopReasonId] = {
                stopReasonId: stop.stopReasonId,
                durationInMillis
            }
        }
    })
    const aggDurationWithInRange = Object.values(modifiedAggDuration)
    return aggDurationWithInRange
}

export const getDurationGreaterThanFromTo = async (from, to) => {
    const modifiedAggDuration = {}
    const stopsBeyondRange = await prisma.stops.findMany({
        where: {
            startTime: {
                lt: from
            },
            endTime: {
                gt: to
            }
        },
        select: {
            stopReasonId: true,
            startTime: true,
            endTime: true,
            durationInMillis: true
        }
    })
    stopsBeyondRange.forEach((stop) => {
        const durationInMillis =
            Math.min(to, stop.endTime) - Math.max(from, stop.startTime)
        if (modifiedAggDuration[stop.stopReasonId]) {
            modifiedAggDuration[stop.stopReasonId].durationInMillis +=
                durationInMillis
        } else {
            modifiedAggDuration[stop.stopReasonId] = {
                stopReasonId: stop.stopReasonId,
                durationInMillis
            }
        }
    })
    return Object.values(modifiedAggDuration)
}

async function fetchRelevantStops(from, to) {
    const withInRange = await getDurationWithInRange(from, to)
    const beforeFromAndTo = await getDurationStopBeforeFrom(from, to)
    const afterFromAndTo = await getDurationStopAfterTo(from, to)
    const greaterThanFromTo = await getDurationGreaterThanFromTo(from, to)

    const duration = [
        ...withInRange,
        ...beforeFromAndTo,
        ...afterFromAndTo,
        ...greaterThanFromTo
    ]
    return duration
}

function aggregateByReasonId(duration) {
    const groupedDurations = new Map()
    duration.forEach(({ stopReasonId, durationInMillis }) => {
        groupedDurations.set(
            stopReasonId,
            (groupedDurations.get(stopReasonId) || 0) + durationInMillis
        )
    })
    const mappedDuration = Array.from(
        groupedDurations,
        ([stopReasonId, durationInMillis]) => ({
            stopReasonId: Number(stopReasonId),
            durationInMillis
        })
    )
    return mappedDuration
}

export const getCombinedDuration = async (from, to) => {
    const duration = await fetchRelevantStops(from, to)
    return aggregateByReasonId(duration)
}
