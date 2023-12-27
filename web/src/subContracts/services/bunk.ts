import { axiosInstance, getData } from '../../wonderMove/services'

// export const createBunk = (data: any) => axiosInstance.post('/bunk', data).then(getData)

export const getAllBunk = () => axiosInstance.get(`/bunk`).then(getData)
