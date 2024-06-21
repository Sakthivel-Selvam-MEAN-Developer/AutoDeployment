import { axiosInstance, getData } from '../../apiCalls'

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

export const getAllFuelReport = () =>
    axiosInstance
        .get(`/getAllFuelReport`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
