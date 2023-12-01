import { axiosInstance, getData } from '../../wonderMove/services'

export const getFactoryByCementCompanyName = (companyName: any) =>
    axiosInstance.get(`/factoryLocation/${companyName}`).then(getData)
