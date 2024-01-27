export interface FormFieldProps {
    tripDetails: {
        id: number
        stockPointToUnloadingPointTrip: {
            startDate: number
            unloadingPoint: {
                name: string
            }
            tripStatus: boolean
            acknowledgeDueTime: number
            loadingPointToStockPointTrip: {
                startDate: number
                truck: {
                    vehicleNumber: string
                }
                loadingPoint: {
                    name: string
                }
            }
        }
        loadingPointToUnloadingPointTrip: {
            startDate: number
            acknowledgeDueTime: number
            truck: {
                vehicleNumber: string
            }
            loadingPoint: {
                name: string
            }
            unloadingPoint: {
                name: string
            }
            tripStatus: boolean
        }
    }
}

export interface tripProps {
    stockPointToUnloadingPointTrip: {
        loadingPointToStockPointTrip: {
            truck: {
                vehicleNumber: string
            }
        }
    }
    loadingPointToUnloadingPointTrip: {
        truck: {
            vehicleNumber: string
        }
    }
}
