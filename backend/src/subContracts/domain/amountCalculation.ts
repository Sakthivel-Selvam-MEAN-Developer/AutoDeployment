interface tripProps {
    id: number
    invoiceNumber: string
    filledLoad: number
    startDate: number
    totalTransporterAmount: number
    tripStatus: boolean
    loadingPointId: number
    stockPointId: number
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
            transporterType: string
            gstPercentage: number | null
        }
    }
}
export const amountCalculation = (
    transporterPercentage: number,
    approvedFreightAmount: number,
    trip: tripProps
) => {
    const transporterAmount =
        approvedFreightAmount - (approvedFreightAmount * transporterPercentage) / 100
    const totalTransporterAmount = transporterAmount * trip.filledLoad
    const totalFreightAmount = approvedFreightAmount * trip.filledLoad
    const margin = parseFloat(((totalFreightAmount - totalTransporterAmount) * 0.7).toFixed(2))
    return {
        totalFreightAmount: parseFloat(totalFreightAmount.toFixed(2)),
        totalTransporterAmount: parseFloat(totalTransporterAmount.toFixed(2)),
        margin,
        transporterAmount: parseFloat(transporterAmount.toFixed(2)),
        approvedFreightAmount
    }
}
