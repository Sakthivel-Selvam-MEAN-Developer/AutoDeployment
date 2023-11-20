import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const create = (data: any) => axiosInstance.post('/leaves', data).then(getData)

export const getAllLeaveWithStatus = (employeeId: string) =>
    axiosInstance.get(`/all-leaves/${employeeId}`).then(getData)

export const rejectLeaves = (id: any, data: any) => {
    return axiosInstance.post(`/reject/${id}`, data)
}

export const approveLeaves = (id: any, data: any) => {
    return axiosInstance.post(`/approve/${id}`, data)
}
