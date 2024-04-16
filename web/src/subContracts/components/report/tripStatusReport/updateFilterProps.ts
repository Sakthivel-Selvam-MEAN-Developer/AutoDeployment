import { TripFilters } from '../../../types/tripFilters'
import { initialFilterData } from './list'
import { ActionType } from './tripStatusReportTypes'

export function updateFilterProps(currentFilterData: TripFilters, action: ActionType) {
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
