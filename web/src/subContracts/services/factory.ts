import { axiosInstance, getData } from '../../wonderMove/services'

export const createFactoryPoint = (data: any) => axiosInstance.post('/factory', data).then(getData)

export const getFactoryByCementCompanyName = (companyName: string) =>
    axiosInstance.get(`/factoryLocation/${companyName}`).then(getData)
