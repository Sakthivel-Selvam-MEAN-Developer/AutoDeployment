import { Nullable } from '../../types'

export interface TripFilters {
    cementCompanyId?: Nullable<number>
    loadinPointId?: Nullable<number>
    transporterId?: Nullable<number>
    from?: Nullable<number>
    to?: Nullable<number>
    pageNumber?: number
}
