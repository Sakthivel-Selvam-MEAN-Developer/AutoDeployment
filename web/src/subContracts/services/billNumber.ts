import { axiosInstance, getData } from '../../apiCalls'

export const getLastBillNumber = () =>
    axiosInstance
        .get('/bill/')
        .then(getData)
        .catch(() => alert('Error Getting data'))
