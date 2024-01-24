export interface FormFieldProps {
    tripDetails: {
        id: number
        stockPointToUnloadingPointTrip: {
            startDate: number
            unloadingPoint: {
                name: string
            }
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
