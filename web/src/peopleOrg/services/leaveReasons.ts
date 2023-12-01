import { axiosInstance, getData } from '../../wonderMove/services/index.ts'

export const getAllLeaveReasons = () => axiosInstance.get('/leaveReason').then(getData)
