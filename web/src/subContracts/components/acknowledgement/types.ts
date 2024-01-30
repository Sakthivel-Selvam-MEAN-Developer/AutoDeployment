export interface FormFieldProps {
    tripDetails: {
        acknowledgementStatus: boolean
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
                    transporter: {
                        name: string
                    }
                }
                loadingPoint: {
                    name: string
                }
                filledLoad: number
                invoiceNumber: string
            }
        }
        loadingPointToUnloadingPointTrip: {
            startDate: number
            acknowledgeDueTime: number
            truck: {
                vehicleNumber: string
                transporter: {
                    name: string
                }
            }
            loadingPoint: {
                name: string
            }
            unloadingPoint: {
                name: string
            }
            tripStatus: boolean
            filledLoad: number
            invoiceNumber: string
        }
    }
    setRender: React.Dispatch<React.SetStateAction<boolean>>
    render: boolean
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
