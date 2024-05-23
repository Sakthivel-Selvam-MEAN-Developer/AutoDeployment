import { Nullable } from '../../types'

export interface TripFilters {
    cementCompanyId?: Nullable<number>
    loadinPointId?: Nullable<number>
    transporterId?: Nullable<number>
    vehicleNumber?: Nullable<string>
    invoiceNumber?: Nullable<string>
    from?: Nullable<number>
    to?: Nullable<number>
    pageNumber?: number
}
