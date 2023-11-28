import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllTransporter = () => axiosInstance.get('/transporter').then(getData)
