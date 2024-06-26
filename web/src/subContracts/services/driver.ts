import { axiosInstance, getData } from '../../apiCalls'

export const getDriver = (id: number | undefined) =>
    axiosInstance
        .get(`/driverDetails`, { params: { id } })
        .then(getData)
        .catch(() => alert('Error Getting data'))
