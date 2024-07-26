interface truck {
    vehicleNumber: string
    transporter: {
        name: string
        transporterType: string
    }
}
interface pointProps {
    name: string
}
export interface FormFieldProps {
    tripDetails: tripdetailsProps
    setRender: React.Dispatch<React.SetStateAction<boolean>>
    render: boolean
}
export interface tripProps {
    truck: truck
    stockPointToUnloadingPointTrip: {
        loadingPointToStockPointTrip: {
            truck: truck
        }
    }
    loadingPointToUnloadingPointTrip: {
        truck: truck
    }
}
export interface tripdetailsProps {
    acknowledgementStatus: boolean
    id: number
    truck: truck
    stockPointToUnloadingPointTrip: {
        startDate: number
        acknowledgeDueTime: number
        truck: truck
        loadingPoint: pointProps
        unloadingPoint: pointProps
        tripStatus: boolean
        filledLoad: number
        invoiceNumber: string
        loadingPointToStockPointTrip: {
            startDate: number
            acknowledgeDueTime: number
            truck: truck
            loadingPoint: pointProps
            unloadingPoint: pointProps
            tripStatus: boolean
            filledLoad: number
            invoiceNumber: string
            loadingPointToStockPointTrip: undefined
        }
    }
    loadingPointToStockPointTrip: {
        startDate: number
        acknowledgeDueTime: number
        truck: truck
        loadingPoint: pointProps
        unloadingPoint: pointProps
        tripStatus: boolean
        filledLoad: number
        invoiceNumber: string
        loadingPointToStockPointTrip: {
            startDate: number
            acknowledgeDueTime: number
            truck: truck
            loadingPoint: pointProps
            unloadingPoint: pointProps
            tripStatus: boolean
            filledLoad: number
            invoiceNumber: string
            loadingPointToStockPointTrip: undefined
        }
    }
    loadingPointToUnloadingPointTrip: {
        startDate: number
        acknowledgeDueTime: number
        truck: truck
        loadingPoint: pointProps
        unloadingPoint: pointProps
        tripStatus: boolean
        filledLoad: number
        invoiceNumber: string
        loadingPointToStockPointTrip: undefined
    }
}
