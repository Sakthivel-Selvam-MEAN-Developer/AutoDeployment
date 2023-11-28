import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllTruck = () => axiosInstance.get('/truck').then(getData)
