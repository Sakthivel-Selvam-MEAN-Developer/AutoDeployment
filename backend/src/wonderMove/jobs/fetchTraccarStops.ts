import { getTraccarByVehicleNumber } from '../models/traccarDevice.ts'
import { getDefaultReason } from '../models/stopReason.ts'
import getStops from '../httpClient/traccar/getStops'
import { createManyIfNotExist } from '../models/gpsStop.ts'
import { dateFromTraccar } from '../httpClient/traccar/dateFormater.ts'

interface RawGpsData {
    startTime: string
    endTime: string
    duration: number
    latitude: number
    longitude: number
}
interface TraccarData {
    traccarId: number
    vehicleId: number
}
interface GpsData {
    startTime: number
    endTime: number
    durationInMillis: number
    latitude: number
    longitude: number
    vehicleId: number
    source: string
    stopReasonId: number
}
const convertToGPsData =
    (traccar: TraccarData, reasonId: number) =>
        (rawGps: RawGpsData): GpsData => {
            const { startTime, endTime, duration, latitude, longitude } = rawGps
            return {
                startTime: dateFromTraccar(startTime),
                endTime: dateFromTraccar(endTime),
                durationInMillis: duration,
                latitude,
                longitude,
                vehicleId: traccar.vehicleId,
                source: 'traccar',
                stopReasonId: reasonId
            }
        }
const enrichWithVehicleDetails = (traccar: TraccarData) => (rawGpsData: RawGpsData[]) =>
    getDefaultReason().then(({ id }: any) => rawGpsData.map(convertToGPsData(traccar, id)))

const fetchStopsFromTraccar = (from: number, to: number) => (traccar: any) =>
    getStops(traccar.traccarId, from, to).then(enrichWithVehicleDetails(traccar))

export default (vehicleNumber: string, from: number, to: number) =>
    getTraccarByVehicleNumber(vehicleNumber)
        .then(fetchStopsFromTraccar(from, to))
        .then(createManyIfNotExist)
