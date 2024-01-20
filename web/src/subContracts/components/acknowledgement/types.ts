export interface FormFieldProps {
    tripDetails: {
        id: number
        loadingPointToStockPointTrip: {
            truck: {
                vehicleNumber: string
            }
            loadingPoint: {
                name: string
            }
            stockPoint: {
                name: string
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
    loadingPointToStockPointTrip: {
        truck: {
            vehicleNumber: string
        }
    }
    loadingPointToUnloadingPointTrip: {
        truck: {
            vehicleNumber: string
        }
    }
}
