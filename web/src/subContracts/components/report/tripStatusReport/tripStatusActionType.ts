export type ActionType = {
    type: string
    cementCompanyId: number
    transporterId: number
    loadinPointId: number
    vehicleNumber: string
    invoiceNumber: string
    from: number
    to: number
    pageNumber: number
}

export const initialFilterData = {
    pageNumber: 1,
    cementCompanyId: undefined,
    loadinPointId: undefined,
    transporterId: undefined,
    vehicleNumber: undefined,
    invoiceNumber: undefined,
    from: undefined,
    to: undefined
}
