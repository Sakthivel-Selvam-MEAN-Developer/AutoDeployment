import { IncomingHttpHeaders } from 'http'
import axios from 'axios'
import { fuelTypes } from './driverTrip.ts'

export const getPreviousFuel = async (
    headers: IncomingHttpHeaders,
    maxDate: number,
    fuel: fuelTypes[]
) => {
    const data = await axios.get(`${headers.hostname}/api/previousfuel`, {
        params: { date: maxDate, vehicleNumber: fuel[0].vehicleNumber, id: fuel[0].id }
    })
    return data.data
}
