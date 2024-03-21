import { axiosInstance, getData } from '../../apiCalls'

export const getAllLeaveReasons = () => axiosInstance.get('/leaveReason').then(getData)
