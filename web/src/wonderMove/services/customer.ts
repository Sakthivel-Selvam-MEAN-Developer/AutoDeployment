import { axiosInstance, getData } from './index.js'
interface customerProps {
    id: number
    name: string
    email: string
    mobile: number
}
export const createCustomer = (customer: customerProps | string) =>
    axiosInstance.post('/customers', customer)
export const getCustomers = () => axiosInstance.get('/customers').then(getData)
export const getCustomerDetails = (name: string) =>
    axiosInstance.get(`/customers/${name}`).then(getData)
export const updateCustomer = (name: string, customer: customerProps | string) => {
    return axiosInstance.post(`/customers/${name}`, customer)
}
