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
export interface tripDetailsProps {
    tripId: number
    tripName: string
}
export interface contextProps {
    filterData: filterDataProps
    setFilterData: React.Dispatch<React.SetStateAction<filterDataProps>>
}
export interface filterDataProps {
    pageName: string
    startDate: number
    endDate: number
    cementCompany: { id: number | undefined; name: string | undefined }
}
export interface companyInvoice {
    id: number
    billNumber: string
    billDate: number
    companyName: string
    amount: number
    pdfLink: string
}
