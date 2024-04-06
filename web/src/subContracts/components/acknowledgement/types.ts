interface truck {
    vehicleNumber: string
    transporter: {
        name: string
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
    stockPointToUnloadingPointTrip: {
        startDate: number
        unloadingPoint: pointProps
        tripStatus: boolean
        acknowledgeDueTime: number
        loadingPointToStockPointTrip: {
            acknowledgeDueTime: number
            startDate: number
            truck: truck
            loadingPoint: pointProps
            filledLoad: number
            invoiceNumber: string
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
    }
}
