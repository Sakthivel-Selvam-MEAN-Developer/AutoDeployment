import { axiosInstance, getData } from '../../wonderMove/services'
import { tokenProps } from './acknowledgement.tsx'

interface dataProps {
    name: string
    cementCompanyId: number
    location: string
}
export const createLoadingPoint = (data: dataProps, token: tokenProps | undefined) =>
    axiosInstance.post('/loading-point', data, token).then(getData)

export const getLoadingPointByCompanyName = (companyName: string) =>
    axiosInstance
        .get(`/loading-point/${companyName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
