import { axiosInstance, getData } from '../../wonderMove/services'

interface dataProps {
    name: string
    cementCompanyId: number
    location: string
}
export const createLoadingPoint = (data: dataProps) =>
    axiosInstance.post('/loading-point', data).then(getData)

export const getLoadingPointByCompanyName = (companyName: string) =>
    axiosInstance
        .get(`/loading-point/${companyName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
