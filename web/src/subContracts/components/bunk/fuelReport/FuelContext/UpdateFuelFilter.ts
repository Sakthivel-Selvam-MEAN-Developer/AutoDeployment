import { fuelFilters } from '../../../../types/fuelFilters'
import { initialFuelFilterData } from './fuelAction'
type ActionType = {
    type: string
    bunkId?: number
    vehicleNumberId?: number
    transactionId?: number
    from?: number
    to?: number
    pageNumber?: number
}
export const divStyle = {
    display: 'flex',
    gap: '10px',
    rowGap: '10px',
    fontWeight: 'bold'
}
export const updateFilterProps = (
    currentFilterData: fuelFilters,
    action: ActionType
): fuelFilters => {
    const actions = {
        updateBunkId: () => {
            return { ...currentFilterData, bunkId: action.bunkId }
        },
        updatevehicleNumberId: () => {
            return { ...currentFilterData, vehicleNumberId: action.vehicleNumberId }
        },
        updatetransactionId: () => {
            return { ...currentFilterData, transactionId: action.transactionId }
        },

        updateFromAndTo: () => {
            return { ...currentFilterData, from: action.from, to: action.to }
        },
        updatePageNumber: () => {
            return { ...currentFilterData, pageNumber: action.pageNumber }
        },
        UpdateToInitialValues: () => {
            return { ...initialFuelFilterData }
        }
    }
    return actions[action.type as keyof typeof actions]()
}
