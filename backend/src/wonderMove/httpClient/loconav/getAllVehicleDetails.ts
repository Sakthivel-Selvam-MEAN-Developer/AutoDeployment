import axios from 'axios'
import configs from '../../../config'

const { loconavUrl, loconavUsername, loconavPassword } = configs
const getAllVehicleDetails = async () =>
    axios({
        url: '/v1/vehicles',
        baseURL: loconavUrl,
        method: 'get',
        auth: {
            username: loconavUsername,
            password: loconavPassword
        }
    }).then((response) => response.data.data)
export default getAllVehicleDetails
