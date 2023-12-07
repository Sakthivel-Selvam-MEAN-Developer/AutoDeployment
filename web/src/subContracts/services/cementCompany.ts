import { axiosInstance, getData } from '../../wonderMove/services'

export const createCompany = (data: any) => axiosInstance.post('/cementCompany', data).then(getData)

export const getAllCementCompany = () => axiosInstance.get('/cementCompany').then(getData)
