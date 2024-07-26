import { fuelFilters } from '../../../../types/fuelFilters'
import { initialFuelFilterData } from './fuelAction'
type ActionType = {
    type: string
    bunkId?: number
    vehicleNumber?: string
    paymentStatus?: boolean
    from?: number
    to?: number
    pageNumber?: number
    transporterType: string
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
        updatevehicleNumber: () => {
            return { ...currentFilterData, vehicleNumber: action.vehicleNumber }
        },
        updatepaymentStatus: () => {
            return { ...currentFilterData, paymentStatus: action.paymentStatus }
        },

        updateFromAndTo: () => {
            return { ...currentFilterData, from: action.from, to: action.to }
        },
        updatePageNumber: () => {
            return { ...currentFilterData, pageNumber: action.pageNumber }
        },
        updateTransporterType: () => {
            return { ...currentFilterData, transporterType: action.transporterType }
        },
        UpdateToInitialValues: () => {
            return { ...initialFuelFilterData }
        }
    }
    return actions[action.type as keyof typeof actions]()
}
