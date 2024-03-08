import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
import { tokenProps } from './acknowledgement.tsx'

interface dataProps {
    name: string
    location: string
    cementCompanyId: number
}

export const createUnloadingPoint = (data: dataProps, token: tokenProps | undefined) =>
    axiosInstance.post('/unloading-point', data, token).then(getData)

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
