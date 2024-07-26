export interface filterdata {
    startDate: number
    endDate: number
    company: string
    pageNumber: number
    received: string | undefined
    GSTReceived: string | undefined
}
export interface billTypes {
    id: number
    submitDate: number
}
export interface invoice {
    shortageAmount: number
    billNo: string
    invoiceId: number
}
