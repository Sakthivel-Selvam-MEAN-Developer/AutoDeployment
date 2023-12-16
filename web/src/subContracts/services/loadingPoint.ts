import { axiosInstance, getData } from '../../wonderMove/services'

export const createLoadingPoint = (data: any) =>
    axiosInstance.post('/loading-point', data).then(getData)

export const getLoadingPointByCompanyName = (companyName: string) =>
    axiosInstance.get(`/loading-point/${companyName}`).then(getData)
