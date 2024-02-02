import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllAccountTypes = () =>
    axiosInstance
        .get(`/accountType`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
