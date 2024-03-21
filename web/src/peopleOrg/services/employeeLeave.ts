import { axiosInstance, getData } from '../../apiCalls'
interface dataProps {
    isFromHalfDay: boolean
    isToHalfDay: boolean
    leaveReasonId: string
    from: number | undefined
    to: number | undefined
    appliedOn: number
    comments: string
    employeeId: string
}
export const create = (data: dataProps) => axiosInstance.post('/leaves', data).then(getData)

export const getAllLeaveWithStatus = (employeeId: string) =>
    axiosInstance.get(`/all-leaves/${employeeId}`).then(getData)
interface rejectLeavesProps {
    employeeId: string
    deniedComment: string
}
export const rejectLeaves = (id: number, data: rejectLeavesProps) => {
    return axiosInstance.post(`/reject/${id}`, data)
}
interface employeeProps {
    employeeId: string
}
export const approveLeaves = (id: number, data: employeeProps) => {
    return axiosInstance.post(`/approve/${id}`, data)
}
