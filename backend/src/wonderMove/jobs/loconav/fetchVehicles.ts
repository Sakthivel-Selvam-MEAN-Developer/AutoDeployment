import getAllVehicleDetails from "../../httpClient/loconav/getAllVehicleDetails"
import { DeviceDetail } from "../../httpClient/loconav/sampleVehicleDetails"
import { createMany } from "../../models/loconavDevice"
import computeDetails, { RawDetails } from "./computeDevice"

const formatDeviceDetails = (deviceDetails: DeviceDetail[]) => {
    return deviceDetails.map((device) => {
        const { id, number } = device
        return { loconavDeviceId: id, vehicle: {create:  {number: number} }}
    })
}
const enrichDetails = (rawDetails: RawDetails[], authToken: string) => {
    return rawDetails.map((details) => ({...details, loconavToken: authToken}))
}

export const fetchDeviceDetails = async (authToken: string) => {
    const deviceDetails = await getAllVehicleDetails(authToken)
    const formatDetails = formatDeviceDetails(deviceDetails)
    const rawDetails = computeDetails(formatDetails)
    const details = enrichDetails(rawDetails, authToken)
    await createMany(details)
}
