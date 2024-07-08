interface paymentDues {
    id: number
    name: string
    vehicleNumber: string
    dueDate: number
    fuelId: number | null
    type: string
    status: boolean
    NEFTStatus: boolean
    payableAmount: number
    transactionId: string | null
    paidAt: number | null
    createdAt: Date
    updatedAt: Date
    overallTripId: number | null
}
interface shortageQuantity {
    id: number
    overallTripId: number | null
    shortageQuantity: number
    shortageAmount: number
    approvalStatus: boolean
    reason: string | null
    filledLoad: number
    unloadedQuantity: number
    unloadedDate: number
    createdAt: Date
    updatedAt: Date
}
interface overallTripProps {
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
            tdsPercentage: number | null
            transporterType: string
            gstPercentage: number | null
        }
    } | null
    id: number
    acknowledgementApproval: boolean
    acknowledgementDate: number | null
    finalPayDuration: number | null
    transporterInvoice: string
    paymentDues: paymentDues[]
    shortageQuantity: shortageQuantity[]
    stockPointToUnloadingPointTrip: {
        totalTransporterAmount: number
        loadingPointToStockPointTrip: {
            totalTransporterAmount: number
        }
    } | null
    loadingPointToUnloadingPointTrip: {
        totalTransporterAmount: number
    } | null
    loadingPointToStockPointTrip: {
        totalTransporterAmount: number
    } | null
}

export default overallTripProps
