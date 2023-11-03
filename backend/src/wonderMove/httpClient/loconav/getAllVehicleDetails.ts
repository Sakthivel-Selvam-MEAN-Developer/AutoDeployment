import axios from 'axios'
import configs from '../../../config.ts'

const { loconavUrl } = configs
const getAllVehicleDetails = async (authToken: string) =>
    axios({
        url: '/v1/vehicles',
        baseURL: loconavUrl,
        method: 'get',
        headers: {
            'User-Authentication': authToken
        }
    }).then((response) => response.data.data)

export default getAllVehicleDetails
