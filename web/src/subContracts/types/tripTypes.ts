export interface tripDetailsProps {
    id: number
    startDate: number
    filledLoad: number
    wantFuel: boolean
    tripStatus: true
    acknowledgeDueTime: number
    margin: number
    loadingKilometer: number
    unloadingKilometer: number
    invoiceNumber: string
    loadingPointId: number
    unloadingPointId: number
    truckId: number
    truck: {
        vehicleNumber: string
        transporter: {
            id: number
            name: string
            csmName: string
        }
    }
    loadingPoint: {
        id: number
        name: string
    }
    unloadingPoint?: {
        id: number
        name: string
    } | null
    stockPointToUnloadingPointTrip?:
        | {
              unloadingPoint: { name: string }
          }[]
        | null
}
export interface shortageQuantity {
    id: number
    overallTripId: number
    approvalStatus: boolean
    filledLoad: number
    unloadedQuantity: number
    shortageQuantity: number
}
export interface overallTripProps {
    id: number
    truck: {
        vehicleNumber: string
        transporter: {
            id: number
            name: string
            csmName: string
        }
    }
    loadingPointToStockPointTrip: tripDetailsProps
    stockPointToUnloadingPointTrip: tripDetailsProps
    loadingPointToUnloadingPointTrip: tripDetailsProps
    shortageQuantity: shortageQuantity[]
}
