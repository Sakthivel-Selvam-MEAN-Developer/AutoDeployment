import { dateFromTraccar } from '../dateFormater'

interface TraccarResponse {
    startTime: string;
    endTime: string;
    latitude: number;
    longitude: number;
    duration: number;
}
const fromTraccar = (traccarResponse: TraccarResponse) => {
    const { startTime, endTime, latitude, longitude, duration } =
        traccarResponse
    return {
        from: dateFromTraccar(startTime),
        to: dateFromTraccar(endTime),
        latitude,
        longitude,
        duration
    }
}

export default fromTraccar
