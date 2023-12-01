import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllCementCompany = () => axiosInstance.get('/cementCompany').then(getData)
