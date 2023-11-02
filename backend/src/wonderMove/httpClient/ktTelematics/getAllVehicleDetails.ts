import axios from "axios";
import configs from "../../../config";

const { ktTelematicsUrl } = configs
const getAllVehicleDetails = async (authToken: string) =>
    axios({
        url: '/pandc/list',
        baseURL: ktTelematicsUrl,
        method: 'get',
        headers: {
            'X-AT-AccessToken': authToken
        }
    }).then((response) => response.data.results)

export default getAllVehicleDetails