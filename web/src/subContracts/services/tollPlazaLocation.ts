import { axiosInstance, getData } from '../../apiCalls'
export const getTollLocation = () =>
    axiosInstance
        .get(`/toll/locations/state`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
