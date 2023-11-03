import getAllVehicleDetails from '../../httpClient/ktTelematics/getAllVehicleDetails.ts'
import { DeviceDetail } from '../../httpClient/ktTelematics/sampleVehicleDetails.ts'
import { createManyIfNotExist as createKtTelematics } from '../../models/ktTelematicsDevice.ts'
import { getAllVehicles, createManyIfNotExist as createVehicles } from '../../models/vehicle.ts'

interface RawDetails {
    ktTelematicsDeviceId: number
    vehicleId: number
}

const formatVehicleDetails = (deviceDetails: DeviceDetail[]) =>
    deviceDetails.map((vehicleDetail) => {
        const { vehicle } = vehicleDetail
        return { number: vehicle }
    })

const formatDeviceDetails = (deviceDetails: DeviceDetail[], allVehicle: any[]) =>
    deviceDetails.map((device) => {
        const { deviceId, vehicle } = device
        const vehicleId = allVehicle.find((vehicles) => vehicles.number === vehicle).id
        return {
            ktTelematicsDeviceId: deviceId,
            vehicleId
        }
    })

const enrichDetails = (rawDetails: RawDetails[], authToken: string) =>
    rawDetails.map((details) => ({ ...details, ktTelematicsToken: authToken }))

export const fetchDeviceDetails = async (authToken: string) => {
    const deviceDetails = await getAllVehicleDetails(authToken)
    const getOnlyVehicleDetails = formatVehicleDetails(deviceDetails)
    await createVehicles(getOnlyVehicleDetails)
    const allVehicles = await getAllVehicles()
    const formatDetails = formatDeviceDetails(deviceDetails, allVehicles)
    const details = enrichDetails(formatDetails, authToken)
    await createKtTelematics(details)
}
