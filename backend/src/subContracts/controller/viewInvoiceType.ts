export interface RequestQuery {
    startDate: string
    endDate: string
    cementCompany: { id: string }
    pageNumber: string
    received: string | undefined
    GSTReceived: string | undefined
}
