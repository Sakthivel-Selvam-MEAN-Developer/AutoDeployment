import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const createUnloadingPoint = (data: any) =>
    axiosInstance.post('/unloading-point', data).then(getData)

export const getUnloadingPointByCompanyName = (companyName: string) =>
    axiosInstance.get(`/unloading-point/${companyName}`).then(getData)
