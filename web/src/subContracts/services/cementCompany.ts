import { axiosInstance, getData } from '../../wonderMove/services'
interface dataProps {
    name: string
    gstNo: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    address: string
}
export const createCompany = (data: dataProps) =>
    axiosInstance
        .post('/cementCompany', data)
        .then(getData)
        .catch(() => alert('Please provide valid details'))

export const getAllCementCompany = () => axiosInstance.get('/cementCompany').then(getData)
