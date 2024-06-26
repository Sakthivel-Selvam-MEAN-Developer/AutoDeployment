export type ActionType = {
    type: string
    bunkId: number
    vehicleNumberId: number
    transactionId: number
    from: number
    to: number
    pageNumber: number
}

export const initialFuelFilterData = {
    pageNumber: 1,
    bunkId: undefined,
    vehicleNumberId: undefined,
    transactionId: undefined,
    from: undefined,
    to: undefined
}
