import { axiosInstance, getData } from './index.js'

export const createCustomer = (customer: any) => axiosInstance.post('/customers', customer)
export const getCustomers = () => axiosInstance.get('/customers').then(getData)
export const getCustomerDetails = (name: string) =>
    axiosInstance.get(`/customers/${name}`).then(getData)
export const updateCustomer = (name: string, customer: any) => {
    return axiosInstance.post(`/customers/${name}`, customer)
}
