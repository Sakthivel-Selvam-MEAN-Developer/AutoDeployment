// import { epochToDate, formatDuration } from "../epochToTime"

// export const deleteStop = (row: any, index: number, selectedRow: any) => {
//     const rowsWithSameGpsStopId = selectedRow.filter(
//         (item: any) => item.gpsStopId === row.gpsStopId
//     )
//     const remainingStops = rowsWithSameGpsStopId
//         .filter((deleteRow: { id: any }) => deleteRow.id !== row.id)
//         .map(({ startTime, endTime, durationInMillis, gpsStopId, stopReasonId }: any, idx: string | number) => {
//             console.log('idx = '+ idx,'index = '+ index)

//             if (idx === 0 && index === 0) {
//                 return {
//                     startTime: epochToDate(row.startTime),
//                     endTime: epochToDate(endTime),
//                     durationInMillis: formatDuration(durationInMillis + row.durationInMillis),
//                     gpsStopId,
//                     stopReasonId,
//                 }
//             } else if (idx === 0 && index === 1) {
//                 return {
//                     startTime: epochToDate(startTime),
//                     endTime: epochToDate(row.endTime),
//                     durationInMillis: formatDuration(durationInMillis + row.durationInMillis),
//                     gpsStopId,
//                     stopReasonId,
//                 }
//             } else if (idx === index - 1 ) {
//                 return {
//                     startTime: epochToDate(startTime),
//                     endTime: epochToDate(row.endTime),
//                     durationInMillis: formatDuration(durationInMillis + row.durationInMillis),
//                     gpsStopId,
//                     stopReasonId,
//                 }
//             }
//             return {
//                 startTime: epochToDate(startTime),
//                 endTime: epochToDate(endTime),
//                 durationInMillis: formatDuration(durationInMillis),
//                 gpsStopId,
//                 stopReasonId,
//             }
//         })
//     console.log(remainingStops)
// }