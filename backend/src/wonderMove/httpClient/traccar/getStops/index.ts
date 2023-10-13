import axios from 'axios'
import configs from '../../../../config'
import { toTraccarFormat } from "../dateFormater.ts";

interface Configs {
    traccarUrl: string;
    traccarPassword: string;
    traccarUsername: string;
}
// @ts-ignore
const { traccarUrl, traccarPassword, traccarUsername }: Configs = configs
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
        auth: {
            username: traccarUsername,
            password: traccarPassword
        }
    }).then((response) => response.data)

export default getStops
