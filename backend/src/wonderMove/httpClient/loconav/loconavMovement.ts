export type LoconavMovement = {
    orientation: number
    latitude: number
    time: number
    speed_with_unit: { unit: string; value: number }
    speed: number
    longitude: number
}
export const movement: LoconavMovement = {
    latitude: 15.012927,
    longitude: 78.014107,
    orientation: 318.0,
    speed: 0.0,
    time: 1698315362,
    speed_with_unit: {
        value: 0.0,
        unit: 'km/h'
    }
}
