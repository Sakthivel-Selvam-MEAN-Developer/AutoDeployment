import { axiosInstance, getData } from '../../apiCalls'

export const getTripForAcknowlegementApproval = () =>
    axiosInstance
        .get(`/acknowlegementapproval`)
        .then(getData)
        .catch(() => alert('Error Getting data'))

export const approveAcknowledgement = (id: number, unloadedQuantity: number) =>
    axiosInstance
        .put(`/acknowlegementapproval`, { id, unloadedQuantity })
        .then(getData)
        .catch(() => alert('Error Getting data'))
