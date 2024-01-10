import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
interface dataProps {
    name: string
    cementCompanyId: number
}

export const createUnloadingPoint = (data: dataProps) =>
    axiosInstance
        .post('/unloading-point', data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

export const getUnloadingPointByCompanyName = (companyName: string) =>
    axiosInstance
        .get(`/unloading-point/${companyName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const getAllUnloadingPoint = () =>
    axiosInstance
        .get(`/unloading-point`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
