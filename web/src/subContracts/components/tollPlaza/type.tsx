export interface trip {
    invoiceNumber: string
    loadingPoint: { name: string }
    unloadingPoint?: { name: string }
    stockPoint?: { name: string }
    startDate: number
    truck: { vehicleNumber: string }
    stockPointToUnloadingPointTrip?: {
        unloadingPoint: {
            name: string
        }
    }[]
}
export interface overallTrip {
    loadingPointToStockPointTrip: trip
    loadingPointToUnloadingPointTrip: trip
    tollPlaza: {
        tollPlazaLocation: string
        amount: number
    }[]
}
export interface alignedtrip {
    id: number
    vehicleNumber: string
    invoiceNumber: string
    loadingPoint: string
    unloadingPoint?: string
    stockPoint: string
    startDate: number
    totalTollAmount: number
}
export interface overallTripp {
    id: number
    loadingPointToStockPointTrip: trip
    loadingPointToUnloadingPointTrip: trip
    stockPointToUnloadingPointTrip: trip
}
export interface Props {
    trip: overallTripp[]
    reload: boolean
    setReload: React.Dispatch<React.SetStateAction<boolean>>
    display: overallTripp[]
    setDisplay: React.Dispatch<React.SetStateAction<overallTripp[]>>
}
