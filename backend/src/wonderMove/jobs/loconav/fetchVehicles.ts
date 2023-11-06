import getAllVehicleDetails from '../../httpClient/loconav/getAllVehicleDetails.ts'
import { DeviceDetail } from '../../httpClient/loconav/sampleVehicleDetails.ts'
import { createManyIfNotExist as createLoconav } from '../../models/loconavDevice.ts'
import { getAllVehicles, createManyIfNotExist as createVehicles } from '../../models/vehicle.ts'

interface RawDetails {
    loconavDeviceId: number
    vehicleId: number
}

const formatVehicleDetails = (deviceDetails: DeviceDetail[]) =>
    deviceDetails.map((vehicleDetail) => {
        const { number } = vehicleDetail
        return { number }
    })

const formatDeviceDetails = (deviceDetails: DeviceDetail[], allVehicle: any[]) =>
    deviceDetails.map((device) => {
        const { id, number } = device
        const vehicleId = allVehicle.find((vehicle) => vehicle.number === number).id
        return {
            loconavDeviceId: id,
            vehicleId
        }
    })
const enrichDetails = (rawDetails: RawDetails[], authToken: string) =>
    rawDetails.map((details) => ({ ...details, loconavToken: authToken }))

export const fetchDeviceDetails = async (authToken: string) => {
    const deviceDetails = await getAllVehicleDetails(authToken)
    const getOnlyVehicleDetails = formatVehicleDetails(deviceDetails)
    await createVehicles(getOnlyVehicleDetails)
    const allVehicles = await getAllVehicles()
    const formatDetails = formatDeviceDetails(deviceDetails, allVehicles)
    const details = enrichDetails(formatDetails, authToken)
    await createLoconav(details)
}
