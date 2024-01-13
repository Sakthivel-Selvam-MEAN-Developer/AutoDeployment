import { axiosInstance, getData } from '../../wonderMove/services/index.ts'
interface dataProps {
    name: string
    location: string
    cementCompanyId: number
}

export const createStockPoint = (data: dataProps) =>
    axiosInstance
        .post('/stock-point', data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

export const getStockPointByCompanyName = (companyName: string) =>
    axiosInstance
        .get(`/stock-point/${companyName}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
