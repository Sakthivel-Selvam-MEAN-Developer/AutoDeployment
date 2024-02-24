import { axiosInstance, getData } from '../../wonderMove/services'

export const getLastBillNumber = () =>
    axiosInstance
        .get('/bill/')
        .then(getData)
        .catch(() => alert('Error Getting data'))
