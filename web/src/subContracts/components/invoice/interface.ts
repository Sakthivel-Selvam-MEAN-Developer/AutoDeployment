export interface loadingPointToStockPointTrip {
    id: number
    startDate: number
    filledLoad: number
    wantFuel: boolean
    tripStatus: boolean
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    loadingPointId: number
    invoiceNumber: string
    stockPointId: number
    truckId: number
    billNo: string | null
    truck: {
        id: number
        vehicleNumber: string
        capacity: number
        transporterId: number
        transporter: {
            id: number
            name: string
            csmName: string
            emailId: string
            contactPersonName: string
            contactPersonNumber: number
            address: string
            hasGst: boolean
            gstNumber: null
            gstPercentage: null
            hasTds: boolean
            tdsPercentage: null
            accountHolder: string
            accountNumber: number
            ifsc: string
            accountTypeNumber: number
        }
    }
    loadingPoint: {
        id: number
        name: string
        cementCompanyId: number
        pricePointMarkerId: number
    }
    stockPoint: {
        id: number
        name: string
        cementCompanyId: number
        pricePointMarkerId: number
    }
}

export interface tripDetailProps {
    id: number
    acknowledgementStatus: true
    loadingPointToStockPointTripId: number | null
    stockPointToUnloadingPointTripId: number | null
    loadingPointToUnloadingPointTripId: number | null
    stockPointToUnloadingPointTrip: {
        id: number
        startDate: number
        wantFuel: null
        tripStatus: true
        acknowledgeDueTime: number
        freightAmount: number
        transporterAmount: number
        totalFreightAmount: number
        totalTransporterAmount: number
        margin: number
        invoiceNumber: string
        loadingPointId: number
        unloadingPointId: number
        truckId: number
        billNo: string
        loadingPointToStockPointTrip: loadingPointToStockPointTrip
        unloadingPoint: {
            id: number
            name: string
            cementCompanyId: number
            pricePointMarkerId: number
        }
    }
    loadingPointToStockPointTrip: loadingPointToStockPointTrip
    loadingPointToUnloadingPointTrip: {
        id: number
        startDate: number
        filledLoad: number
        wantFuel: null
        tripStatus: true
        acknowledgeDueTime: number
        freightAmount: number
        transporterAmount: number
        totalFreightAmount: number
        totalTransporterAmount: number
        margin: number
        invoiceNumber: string
        loadingPointId: number
        unloadingPointId: number
        truckId: number
        billNo: string
        truck: {
            id: number
            vehicleNumber: string
            capacity: number
            transporterId: number
            transporter: {
                id: number
                name: string
                csmName: string
                emailId: string
                contactPersonName: string
                contactPersonNumber: number
                address: string
                hasGst: boolean
                gstNumber: null
                gstPercentage: null
                hasTds: boolean
                tdsPercentage: null
                accountHolder: string
                accountNumber: number
                ifsc: string
                accountTypeNumber: number
            }
        }
        loadingPoint: {
            id: number
            name: string
            cementCompanyId: number
            pricePointMarkerId: number
        }
        unloadingPoint: {
            id: number
            name: string
            cementCompanyId: number
            pricePointMarkerId: number
        }
    }
}
export interface stockToUnloadingProps {
    id: number
    startDate: number
    wantFuel: null
    tripStatus: true
    acknowledgeDueTime: number
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    invoiceNumber: string
    loadingPointId: number
    unloadingPointId: number
    truckId: number
    billNo: string
    loadingPointToStockPointTrip: {
        id: number
        startDate: number
        filledLoad: number
        wantFuel: boolean
        tripStatus: boolean
        freightAmount: number
        transporterAmount: number
        totalFreightAmount: number
        totalTransporterAmount: number
        margin: number
        loadingPointId: number
        invoiceNumber: string
        stockPointId: number
        truckId: number
        billNo: string | null
        truck: {
            id: number
            vehicleNumber: string
            capacity: number
            transporterId: number
            transporter: {
                id: number
                name: string
                csmName: string
                emailId: string
                contactPersonName: string
                contactPersonNumber: number
                address: string
                hasGst: boolean
                gstNumber: null
                gstPercentage: null
                hasTds: boolean
                tdsPercentage: null
                accountHolder: string
                accountNumber: number
                ifsc: string
                accountTypeNumber: number
            }
        }
        loadingPoint: {
            id: number
            name: string
            cementCompanyId: number
            pricePointMarkerId: number
        }
        stockPoint: {
            id: number
            name: string
            cementCompanyId: number
            pricePointMarkerId: number
        }
    }
    unloadingPoint: {
        id: number
        name: string
        cementCompanyId: number
        pricePointMarkerId: number
    }
}

export interface AnnexureProps {
    tripDetails: InvoiceProp
    billNo: string
    total: totalProps
}
export interface totalProps {
    totalAmount: number
    totalFilledLoad: number
    numberOfTrips: number
    fromDate: number
    endDate: number
    shortageQuantity: number
}
export interface InvoiceProp {
    loadingPointToUnloadingPointTrip: LoadingToUnloadingPointProps[]
    stockPointToUnloadingPointTrip: StockToUnloadingPointProps[]
    loadingPointToStockPointTrip: LoadingToStockPointProps[]
}
export interface rowProps {
    startDate: number
    partyName?: string
    unloadingPoint: {
        name: string
    }
    stockPoint: {
        name: string
    }
    loadingPoint: {
        name: string
    }
    freightAmount: number
    truck: {
        vehicleNumber: string
    }
    filledLoad: number
    invoiceNumber: string
    overallTrip: [
        {
            shortageQuantity: [
                {
                    shortageQuantity: number
                }
            ]
        }
    ]
}
export interface LoadingToUnloadingPointProps {
    startDate: number
    partyName: string
    lrNumber: string
    unloadingPoint: {
        name: string
    }
    stockPoint: {
        name: string
    }
    loadingPoint: {
        name: string
    }
    overallTrip: [
        {
            shortageQuantity: [
                {
                    shortageQuantity: number
                }
            ]
        }
    ]
    freightAmount: number
    truck: {
        vehicleNumber: string
    }
    filledLoad: number
    invoiceNumber: string
}
export interface LoadingToStockPointProps {
    lrNumber: string
    partyName: string
    startDate: number
    stockPoint: {
        name: string
    }
    unloadingPoint: {
        name: string
    }
    loadingPoint: {
        name: string
    }
    overallTrip: [
        {
            shortageQuantity: [
                {
                    shortageQuantity: number
                }
            ]
        }
    ]
    filledLoad: number
    freightAmount: number
    truck: {
        vehicleNumber: string
    }
    invoiceNumber: string
}
export interface StockToUnloadingPointProps {
    startDate: number
    partyName: string
    lrNumber: string
    unloadingPoint: {
        name: string
    }
    freightAmount: number
    loadingPointToStockPointTrip: {
        filledLoad: number
        truck: {
            vehicleNumber: string
        }
        stockPoint: {
            name: string
        }
    }
    invoiceNumber: string
    overallTrip: [
        {
            shortageQuantity: [
                {
                    shortageQuantity: number
                }
            ]
        }
    ]
}
