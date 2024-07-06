import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'

export const columns = [
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'invoiceNumber', headerName: 'Invoice Number', width: 150 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150 },
    { field: 'loadingPoint', headerName: 'Loading Point', width: 150 },
    { field: 'unloadingPoint', headerName: 'Unloading Point', width: 150 },
    { field: 'filledLoad', headerName: 'Quantity', width: 150 },
    {
        field: 'freightAmount',
        headerName: 'Freight Amount(₹)',
        width: 150,
        valueFormatter: (params: number) => `₹ ${params}`
    },
    {
        field: 'totalFreightAmount',
        headerName: 'Total Freight Amount(₹)',
        width: 200,
        valueFormatter: (params: number) => `₹ ${params}`
    },
    { field: 'billingRate', headerName: 'Billing Rate', width: 300 },
    { field: 'action', headerName: 'Action' }
]
export interface tripProp {
    id: number
    startDate: number
    invoiceNumber: string
    freightAmount: number
    totalFreightAmount: number
    filledLoad?: number
    overallTrip: { truck: { vehicleNumber: string } }[]
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
            freightAmount: trip.freightAmount,
            totalFreightAmount: trip.totalFreightAmount
        }
    })
}
