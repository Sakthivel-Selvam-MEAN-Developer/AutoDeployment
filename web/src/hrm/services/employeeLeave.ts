import { axiosInstance, getData } from "../../wonderMove/services/index.ts";

export const create = (data: any) =>
    axiosInstance.post('/employee', data).then(getData)

export const getAllLeaveForms = (data: any) =>
    axiosInstance.get('/employee', data).then(getData)

export const rejectLeaves = (id: any, data: any) => {
    return axiosInstance.post(`/reject/${id}`, data)
}

export const getRejectLeaves = (data: any) => {
    return axiosInstance.post(`/reject`, data)
}