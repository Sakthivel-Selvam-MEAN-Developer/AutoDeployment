import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllBunk = () => axiosInstance.get(`/bunk`).then(getData)
