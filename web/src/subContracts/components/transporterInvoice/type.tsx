export interface TransporterInvoiceProps {
    tripDetails: tripDetailProps[]
}
export interface tripDetailProps {
    id: number
    truck: { vehicleNumber: string; transporter: { name: string; csmName: string } }
    loadingPointToUnloadingPointTrip: tripProps | null
    loadingPointToStockPointTrip: tripProps | null
}
interface tripProps {
    invoiceNumber: string
    startDate: number
    loadingPoint: { name: string }
    unloadingPoint: { name: string }
    truck: { vehicleNumber: string; transporter: { name: string; csmName: string } }
}
export interface GetCellsProps {
    trip: tripProps | undefined
    id: number
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetailProps[]>>
}
export interface TextFieldContainerProps {
    id: number
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetailProps[]>>
}
export interface StockTripTableProps {
    trip: tripDetailProps[]
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetailProps[]>>
    tableName: string
}
export interface textCellProps {
    invoice: string
    setInvoice: React.Dispatch<React.SetStateAction<string>>
    onSubmit: () => void
}
export interface tripTableProps {
    direct: tripDetailProps[]
    stock: tripDetailProps[]
}
export interface TableConatinerProps {
    trips: tripDetailProps[]
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetailProps[]>>
}
