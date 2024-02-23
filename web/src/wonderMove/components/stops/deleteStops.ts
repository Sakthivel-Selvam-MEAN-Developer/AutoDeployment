import { stopsProps } from './modalUpdateReason'
export interface stopProps {
    id: number
    startTime: number
    durationInMillis: number
    endTime: number
    gpsStopId: number
    stopReasonId: number
}

const calculateUpdatedStops = (
    stop: stopsProps,
    index: number,
    deleteRowIndex: number,
    stopToDelete: stopProps
) => {
    const { startTime, endTime, durationInMillis, gpsStopId, stopReasonId } = stop
    if (index === 0 && deleteRowIndex === 0) {
        return {
            startTime: stopToDelete.startTime,
            endTime: endTime,
            durationInMillis: durationInMillis + stopToDelete.durationInMillis,
            gpsStopId,
            stopReasonId
        }
    } else if (index === deleteRowIndex - 1) {
        return {
            startTime: startTime,
            endTime: stopToDelete.endTime,
            durationInMillis: durationInMillis + stopToDelete.durationInMillis,
            gpsStopId,
            stopReasonId
        }
    }
    return {
        startTime: startTime,
        endTime: endTime,
        durationInMillis: durationInMillis,
        gpsStopId,
        stopReasonId
    }
}

export default calculateUpdatedStops
