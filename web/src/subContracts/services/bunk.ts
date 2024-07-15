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

export const createBunk = (bunkDetails: bunkDetailsProps) =>
    axiosInstance.post('/bunk', bunkDetails).then(getData)
