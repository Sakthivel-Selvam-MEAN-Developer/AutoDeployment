export type Movement = {
    time: number
    speed: number
    latitude: number
    longitude: number
}

export interface RawStop {
    startTime: number
    endTime: number
    durationInMillis: number
    latitude: number
    longitude: number
}

const computeStops = (movements: Movement[]): RawStop[] => {
    console.log(movements)
    return []
}

export default computeStops
