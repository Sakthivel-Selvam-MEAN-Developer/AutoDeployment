import { tripDetails, tripDetailsProps } from './list'
export interface TableBodyProps {
    tripDetails: tripDetails[]
    setSelectedTrip: React.Dispatch<React.SetStateAction<tripDetails[]>>
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetails[]>>
}
export interface tableProps {
    tripDetails: tripDetails[]
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetails[]>>
}
export interface InvoicePartyNameFieldProps {
    handleClick: (obj: tripDetailsProps) => void
    pageName: string
    row: {
        id: number
        invoiceNumber: string
    }
}
export interface TableRowContainerProps {
    setSelectedTrip: React.Dispatch<React.SetStateAction<tripDetails[]>>
    setTripId: React.Dispatch<React.SetStateAction<tripDetailsProps[]>>
    row: tripDetails
    setTripDetails: React.Dispatch<React.SetStateAction<tripDetails[]>>
    tripDetails: tripDetails[]
}
