export interface DueDateDialogProps {
    tripClosed: boolean
    paymentDetails: paymentDetailsProps
}
export interface paymentDetailsProps {
    dueDate: number
    name: string
    overallTripId: number
    payableAmount: number
    type: string
    vehicleNumber: string
}
export interface DialogContentsProps {
    paymentDetails: paymentDetailsProps
}
