export interface FormFieldProps {
    tripDetails: {
        id: number
        stockPointToUnloadingPointTrip: {
            unloadingPoint: {
                name: string
            }
            loadingPointToStockPointTrip: {
                truck: {
                    vehicleNumber: string
                }
                loadingPoint: {
                    name: string
                }
            }
        }
        loadingPointToUnloadingPointTrip: {
            truck: {
                vehicleNumber: string
            }
            loadingPoint: {
                name: string
            }
            unloadingPoint: {
                name: string
            }
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
