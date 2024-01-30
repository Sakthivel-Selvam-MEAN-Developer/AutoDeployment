import { axiosInstance, getData } from '../../wonderMove/services'

export const getAllTransporter = () =>
    axiosInstance
        .get('/transporter')
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const createTransporter = (data: any) =>
    axiosInstance
        .post('/transporter', data)
        .then(getData)
        .catch(() => alert('Error Getting data'))
