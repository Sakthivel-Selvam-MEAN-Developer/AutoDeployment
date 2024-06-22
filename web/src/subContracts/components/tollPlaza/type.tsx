import { props } from './tollInvoice/alignTripDetails'

export interface trip {
    invoiceNumber: string
    partyName: string
    lrNumber: string
    filledLoad: number
    loadingPoint: { name: string }
    unloadingPoint?: { name: string }
    stockPoint?: { name: string }
    startDate: number
    truck: { vehicleNumber: string }
    stockPointToUnloadingPointTrip?: { unloadingPoint: { name: string } }[]
}
export interface overallTrip {
    id: number
    loadingPointToStockPointTrip: trip
    loadingPointToUnloadingPointTrip: trip
    tollPlaza: {
        tollPlazaLocation: { id: number; location: string; state: string }
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
    tollPlaza: {
        tollPlazaLocation: { id: number; location: string }
        amount: number
    }[]
}
export interface Props {
    trip: overallTripp[]
    reload: boolean
    setReload: React.Dispatch<React.SetStateAction<boolean>>
    display: overallTripp[]
    setDisplay: React.Dispatch<React.SetStateAction<overallTripp[]>>
}
export interface dialogPreview {
    setPreDialog: React.Dispatch<React.SetStateAction<boolean>>
    preDialog: boolean
    trips: props['trip']
    bill: { number: string; date: number }
}
