import { axiosInstance, getData } from '../../apiCalls'
import { bunDetailsProps } from '../components/bunk/addBunk/types'

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

export const createBunk = (bunkDetails: bunDetailsProps) =>
    axiosInstance.post('/bunk', bunkDetails).then(getData)
