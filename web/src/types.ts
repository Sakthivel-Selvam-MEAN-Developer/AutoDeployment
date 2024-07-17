export type Nullable<T> = T | null | undefined

export type updateProps = {
    billingRate: number | undefined
    pageName: string
    id: number
}
export interface tripDetailsProps {
    tripId: number[]
    tripName: string
}
export type tripTypeProps = {
    cementCompany: { name: string | undefined; id: number | undefined }
    startDate: number
    endDate: number
    pageName: string
}

export interface updateInvoiceProps {
    trip: tripDetailsProps
    bill: { billNo: string; date: number }
    cementCompany: { name: string | undefined; id: number | undefined }
    totalAmount?: number
}
export interface dataProps {
    loadingPointId: number | null
    unloadingPointId: number | null
    stockPointId: number | null
    freightAmount: number
    transporterPercentage: number
    transporterAmount: number
}
