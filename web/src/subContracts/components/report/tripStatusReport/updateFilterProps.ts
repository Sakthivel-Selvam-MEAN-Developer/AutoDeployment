import { TripFilters } from '../../../types/tripFilters'
import { initialFilterData } from './list'
type ActionType = {
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
export const divStyle = {
    display: 'flex',
    gap: '10px',
    rowGap: '10px',
    fontWeight: 'bold'
}
export const updateFilterProps = (currentFilterData: TripFilters, action: ActionType) => {
    const actions = {
        updateCementComapnyId: () => {
            return { ...currentFilterData, cementCompanyId: action.cementCompanyId }
        },
        updateTransporterId: () => {
            return { ...currentFilterData, transporterId: action.transporterId }
        },
        updateLoadinPointId: () => {
            return { ...currentFilterData, loadinPointId: action.loadinPointId }
        },
        updateVehicleNumber: () => {
            return { ...currentFilterData, vehicleNumber: action.vehicleNumber }
        },
        updateInvoiceNumber: () => {
            return { ...currentFilterData, invoiceNumber: action.invoiceNumber }
        },
        updateFromAndTo: () => {
            return { ...currentFilterData, from: action.from, to: action.to }
        },
        updatePageNumber: () => {
            return { ...currentFilterData, pageNumber: action.pageNumber }
        },
        UpdateToInitialValues: () => {
            return { ...initialFilterData }
        }
    }
    return actions[action.type as keyof typeof actions]()
}
