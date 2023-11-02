import getAllVehicleDetails from '../../httpClient/loconav/getAllVehicleDetails'
import { DeviceDetail } from '../../httpClient/loconav/sampleVehicleDetails'
import { createManyIfNotExist as createLoconav } from '../../models/loconavDevice'
import { getAllVehicles, createManyIfNotExist as createVehicles } from '../../models/vehicle'

interface RawDetails {
    loconavDeviceId: number
    vehicleId: number
}
const formatVehicleDetails = (deviceDetails: DeviceDetail[]) => {
    return deviceDetails.map((vehicleDetail) => {
        const { number } = vehicleDetail
        return { number: number }
    })
}

const formatDeviceDetails = (deviceDetails: DeviceDetail[], allVehicle: any[]) => {
    return deviceDetails.map((device) => {
        const { id, number } = device
        const vehicleId = allVehicle.find((vehicle) => vehicle.number === number).id
        return {
            loconavDeviceId: id,
            vehicleId: vehicleId
        }
    })
}
const enrichDetails = (rawDetails: RawDetails[], authToken: string) => {
    return rawDetails.map((details) => ({ ...details, loconavToken: authToken }))
}

export const fetchDeviceDetails = async (authToken: string) => {
    const deviceDetails = await getAllVehicleDetails(authToken)
    const getOnlyVehicleDetails = formatVehicleDetails(deviceDetails)
    await createVehicles(getOnlyVehicleDetails)
    const allVehicles = await getAllVehicles()
    const formatDetails = formatDeviceDetails(deviceDetails, allVehicles)    
    const details = enrichDetails(formatDetails, authToken)
    await createLoconav(details)    
}
