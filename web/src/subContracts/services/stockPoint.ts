import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
import { tokenProps } from './acknowledgement.tsx'

interface dataProps {
    name: string
    location: string
    cementCompanyId: number
}

export const createStockPoint = (data: dataProps, token: tokenProps | undefined) =>
    axiosInstance.post('/stock-point', data, token).then(getData)

export const getStockPointByCompanyName = (companyName: string) =>
    axiosInstance
        .get(`/stock-point/${companyName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
