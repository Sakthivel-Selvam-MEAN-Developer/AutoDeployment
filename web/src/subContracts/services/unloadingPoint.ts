import { axiosInstance, getData } from '../../apiCalls'

interface dataProps {
    name: string
    location: string
    cementCompanyId: number
}

export const createUnloadingPoint = (data: dataProps) =>
    axiosInstance.post('/unloading-point', data).then(getData)

export const getUnloadingPointByCompanyName = (companyName: string) =>
    axiosInstance
        .get(`/unloading-point/${companyName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllUnloadingPoint = (cementCompanyId: number) =>
    axiosInstance
        .get(`/unloading/${cementCompanyId}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
