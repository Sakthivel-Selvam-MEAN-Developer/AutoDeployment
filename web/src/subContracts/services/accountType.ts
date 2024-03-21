import { axiosInstance, getData } from '../../apiCalls'

export const getAllAccountTypes = () =>
    axiosInstance
        .get(`/accountType`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
