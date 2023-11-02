import getAllVehicleDetails from "../../httpClient/ktTelematics/getAllVehicleDetails"
import { DeviceDetail } from "../../httpClient/ktTelematics/sampleVehicleDetails"
import { createManyIfNotExist as createKtTelematics} from '../../models/ktTelematicsDevice'
import { getAllVehicles, createManyIfNotExist as createVehicles} from '../../models/vehicle'

interface RawDetails {
    ktTelematicsDeviceId: number
    vehicleId: number
}

const formatVehicleDetails = (deviceDetails: DeviceDetail[]) => {
    return deviceDetails.map((vehicleDetail) => {
        const { vehicle } = vehicleDetail
        return { number: vehicle }
    })
}

const formatDeviceDetails = (deviceDetails: DeviceDetail[], allVehicle: any[]) => {
    return deviceDetails.map((device) => {
        const { deviceId, vehicle } = device
        const vehicleId = allVehicle.find((vehicles) => vehicles.number === vehicle).id
        return {
            ktTelematicsDeviceId: deviceId,
            vehicleId: vehicleId
        }
    })
}

const enrichDetails = (rawDetails: RawDetails[], authToken: string) => {
    return rawDetails.map((details) => ({ ...details, ktTelematicsToken: authToken }))
}

export const fetchDeviceDetails = async (authToken: string) => {
    const deviceDetails = await getAllVehicleDetails(authToken)
    const getOnlyVehicleDetails = formatVehicleDetails(deviceDetails)
    await createVehicles(getOnlyVehicleDetails)
    const allVehicles = await getAllVehicles()
    const formatDetails = formatDeviceDetails(deviceDetails, allVehicles)
    const details = enrichDetails(formatDetails, authToken)
    await createKtTelematics(details)
}