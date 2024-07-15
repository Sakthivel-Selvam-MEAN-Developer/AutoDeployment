import { axiosInstance, getData } from '../../apiCalls'
import { bunkDetailsProps } from '../components/bunk/addBunk/types'

export const getAllBunk = () =>
    axiosInstance
        .get(`/bunk`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllBunkName = () =>
    axiosInstance
        .get(`/bunk_name`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
interface bunk {
    details: bunkDetailsProps
    id: number
}
export const createBunk = (bunkDetails: bunk) =>
    axiosInstance.post('/bunk', bunkDetails).then(getData)
