export const deleteStop = (stopToDelete: any, deleteRowIndex: number, allStops: any[]) => {
    const remainingStops = allStops
        .filter((deleteRow) => deleteRow.id !== stopToDelete.id)
        .map(({ startTime, endTime, durationInMillis, gpsStopId, stopReasonId }, index) => {
            if (index === 0 && deleteRowIndex === 0) {
                return {
                    startTime: (stopToDelete.startTime),
                    endTime: (endTime),
                    durationInMillis: (durationInMillis + stopToDelete.durationInMillis),
                    gpsStopId,
                    stopReasonId,
                }
            } else if (index === deleteRowIndex - 1) {
                return {
                    startTime: (startTime),
                    endTime: (stopToDelete.endTime),
                    durationInMillis: (durationInMillis + stopToDelete.durationInMillis),
                    gpsStopId,
                    stopReasonId,
                }
            }
            return {
                startTime: (startTime),
                endTime: (endTime),
                durationInMillis: (durationInMillis),
                gpsStopId,
                stopReasonId,
            }
        })
    return remainingStops
}