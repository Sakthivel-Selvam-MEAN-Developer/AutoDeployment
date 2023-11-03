import axios from 'axios'
import configs from '../../../config.ts'

const { loconavUrl } = configs
const getMovements = async (deviceId: number, from: number, to: number, authToken: string) =>
    axios({
        url: '/v1/vehicles/polyline',
        baseURL: loconavUrl,
        method: 'get',
        params: {
            device_id: deviceId,
            start_time: from,
            end_time: to
        },
        headers: {
            'User-Authentication': authToken
        }
    }).then((response) => response.data.data.movements)

export default getMovements
