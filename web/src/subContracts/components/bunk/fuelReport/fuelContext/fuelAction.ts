export type ActionType = {
    type: string
    bunkId: number
    vehicleNumber: string
    paymentStatus: boolean
    from: number
    to: number
    pageNumber: number
    transporterType: string
}

export const initialFuelFilterData = {
    pageNumber: 1,
    bunkId: undefined,
    vehicleNumber: undefined,
    paymentStatus: undefined,
    from: undefined,
    to: undefined,
    transporterType: undefined
}
