import { axiosInstance, getData } from '../../wonderMove/services'

// export const createFuelStation = (data: any) => axiosInstance.post('/station', data).then(getData)

export const getAllFuelStationByBunk = (bunkId: number) =>
    axiosInstance
        .get(`/station/${bunkId}`)
        .then(getData)
        .catch(() => alert('Error Getting data'))
