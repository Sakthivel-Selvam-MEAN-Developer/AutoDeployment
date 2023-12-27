import { axiosInstance, getData } from '../../wonderMove/services'

interface dataProps {
    name: string
    cementCompanyId: number
}
export const createLoadingPoint = (data: dataProps) =>
    axiosInstance.post('/loading-point', data).then(getData)

export const getLoadingPointByCompanyName = (companyName: string) =>
    axiosInstance.get(`/loading-point/${companyName}`).then(getData)
