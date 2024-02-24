import { stopsProps } from './modalUpdateReason'
interface stopProps {
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
export const deleteStop = (
    stopToDelete: stopProps,
    deleteRowIndex: number,
    allStops: stopProps[]
) => {
    const remainingStops = allStops
        .filter((deleteRow) => deleteRow.id !== stopToDelete.id)
        .map((stop, index) => calculateUpdatedStops(stop, index, deleteRowIndex, stopToDelete))
    return remainingStops
}
