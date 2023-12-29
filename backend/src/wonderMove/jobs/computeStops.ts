export interface Movement {
    eventTime: number
    speed: number
    latitude: number
    longitude: number
    vehicleId: number
    source: string
}

export interface RawStop {
    startTime: number
    endTime: number
    durationInMillis: number
    latitude: number
    longitude: number
}

function addExistingOngoingStopToStops(ongoingStop: RawStop, stops: RawStop[]) {
    if (ongoingStop.endTime === 0) {
        return
    }
    const durationInMillis = ongoingStop.endTime - ongoingStop.startTime
    stops.push({ ...ongoingStop, durationInMillis })
}

const emptyStop = () => ({
    startTime: 0,
    endTime: 0,
    durationInMillis: 0,
    latitude: 0,
    longitude: 0
})

const initMoment: Movement = {
    eventTime: 0,
    speed: 0,
    latitude: 0,
    longitude: 0,
    vehicleId: 0,
    source: ''
}

const isSamePlace = (movement1: Movement, movement2: Movement) =>
    movement1.latitude === movement2.latitude && movement1.longitude === movement2.longitude

const initNewStop = (movement: Movement, previousMovement: Movement) => ({
    durationInMillis: movement.eventTime - previousMovement.eventTime,
    startTime: previousMovement.eventTime,
    endTime: movement.eventTime,
    latitude: movement.latitude,
    longitude: movement.longitude
})

const updateOngoingStop = (
    movement: Movement,
    previousMovement: Movement,
    ongoingStop: RawStop
): RawStop => {
    if (ongoingStop.startTime === 0) {
        return initNewStop(movement, previousMovement)
    }
    return {
        ...ongoingStop,
        endTime: movement.eventTime,
        durationInMillis: movement.eventTime - ongoingStop.startTime
    }
}
const addValidOngoingStopToStops = (ongoingStop: RawStop, stops: RawStop[]) => {
    if (ongoingStop.startTime === 0) {
        return
    }
    stops.push(ongoingStop)
}
const computeStops = (movements: Movement[]): RawStop[] => {
    const stops: RawStop[] = []
    let ongoingStop: RawStop = emptyStop()
    let previousMovement: Movement = initMoment
    movements.forEach((movement) => {
        if (isSamePlace(previousMovement, movement)) {
            ongoingStop = updateOngoingStop(movement, previousMovement, ongoingStop)
        } else {
            addExistingOngoingStopToStops(ongoingStop, stops)
            ongoingStop = emptyStop()
        }
        previousMovement = movement
    })
    addValidOngoingStopToStops(ongoingStop, stops)
    return stops
}

export default computeStops
