import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'

export const columns = [
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', flex: 1 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1 },
    { field: 'loadingPoint', headerName: 'Loading Point', flex: 1 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', flex: 1 },
    { field: 'filledLoad', headerName: 'Loading Quantity', flex: 1 },
    { field: 'unloadedQuantity', headerName: 'Unloading Quantity', flex: 1 },
    {
        field: 'freightAmount',
        headerName: 'Freight Amount(₹)',
        flex: 1,
        valueFormatter: (params: number) => `₹ ${params}`
    },
    {
        field: 'totalFreightAmount',
        headerName: 'Total Freight Amount(₹)',
        flex: 1,
        valueFormatter: (params: number) => `₹ ${params}`
    },
    { field: 'billingRate', headerName: 'Billing Rate', flex: 1, justifyCOntent: 'center' },
    { field: 'action', headerName: 'Action', flex: 1 }
]
export interface tripProp {
    billingRate: number
    id: number
    startDate: number
    invoiceNumber: string
    freightAmount: number
    totalFreightAmount: number
    filledLoad?: number
    overallTrip: {
        truck: { vehicleNumber: string }
        shortageQuantity: { unloadedQuantity: number }[]
    }[]
    loadingPointToStockPointTrip?: {
        filledLoad: number
        stockPoint: { name: string }
    }
    stockPoint?: { name: string }
    loadingPoint?: { name: string }
    unloadingPoint?: { name: string }
}
export const alignRows = (tripDetails: tripProp[]) => {
    return tripDetails.map((trip: tripProp) => {
        return {
            id: trip.id,
            startDate: epochToMinimalDate(trip.startDate),
            invoiceNumber: trip.invoiceNumber,
            vehicleNumber: trip.overallTrip[0].truck.vehicleNumber,
            loadingPoint: trip.loadingPoint
                ? trip.loadingPoint.name
                : trip.stockPoint
                  ? trip.stockPoint.name
                  : trip.loadingPointToStockPointTrip?.stockPoint.name,
            unloadingPoint: trip.unloadingPoint ? trip.unloadingPoint.name : trip.stockPoint?.name,
            filledLoad: trip.filledLoad
                ? trip.filledLoad
                : trip.loadingPointToStockPointTrip?.filledLoad,
            unloadedQuantity: (
                trip.overallTrip[0].shortageQuantity[0].unloadedQuantity / 1000
            ).toFixed(2),
            freightAmount: trip.freightAmount,
            totalFreightAmount: trip.totalFreightAmount,
            billingRate: trip.billingRate
        }
    })
}
