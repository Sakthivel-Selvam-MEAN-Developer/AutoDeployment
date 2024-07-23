export interface cementCompanyProps {
    address: string
    contactPersonName: string
    contactPersonNumber: string
    emailId: string
    gstNo: string
    id: number
    name: string
}
export interface dateProps {
    $d: number
}
export interface formattedData {
    id: number
    billNo: string
    billDate: string
    company: string
    amount: string
    pdfLink: string
}
export interface tripDetailsProps {
    tripId: number
    tripName: string
}
export interface tripDetails {
    id: number
    startDate: number
    filledLoad: number
    truck: {
        vehicleNumber: string
    }
    loadingPoint: {
        name: string
    }
    stockPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    invoiceNumber: string
    freightAmount: number
    totalFreightAmount: number
    loadingPointToStockPointTrip: { stockPoint: { name: string } }
}
export interface SelectedProps {
    selectedTrip: tripDetails[]
    setSelectedTrip: React.Dispatch<React.SetStateAction<tripDetails[]>>
}
