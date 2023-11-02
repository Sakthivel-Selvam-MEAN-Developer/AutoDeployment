export type DeviceDetail = {
    deviceId: number,
    vehicle: string,
    lat: number,
    lon: number,
    speed: number,
    ignition: number,
    address: string,
    time: string
}

export const vehicleDetail: DeviceDetail = {
    deviceId: 123,
    vehicle: "TN93A7336",
    lat: 16.359525,
    lon: 80.427933,
    speed: 12,
    ignition: 1,
    address: "salem",
    time: "2023-11-02 14:56:09"
}
