import axios from 'axios'
import configs from '../../../../config.ts'
import { toTraccarFormat } from '../dateFormater.ts'

const { traccarUrl, traccarPassword, traccarUsername } = configs
const getStops = (deviceId: number, from: number, to: number) =>
    axios({
        url: '/reports/stops',
        baseURL: traccarUrl,
        method: 'get',
        params: {
            deviceId,
            from: toTraccarFormat(from),
            to: toTraccarFormat(to)
        },
        auth: { username: traccarUsername, password: traccarPassword }
    }).then((response) => response.data)

export default getStops
