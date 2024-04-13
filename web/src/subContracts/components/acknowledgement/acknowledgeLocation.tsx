import { ReactElement } from 'react'
import {
    getDate,
    getFilledLoad,
    getFrom,
    getInvoiceNumber,
    getTo
} from './acknowledgeLocationField'

export const AcknowledgementLocation = (
    loadingPoint: string,
    unloadingPoint: string,
    date: number,
    filledLoad: number,
    invoiceNumber: string
) => {
    return acknowledgeBody(loadingPoint, unloadingPoint, invoiceNumber, filledLoad, date)
}
const InvoiceNumber = (invoiceNumber: string, filledLoad: number) => {
    return (
        <div>
            {getInvoiceNumber(invoiceNumber)}
            {getFilledLoad(filledLoad)}
        </div>
    )
}
const loadingPointToUnloadingPoint = (loadingPoint: string, unloadingPoint: string) => {
    return (
        <div>
            {getFrom(loadingPoint)}
            {getTo(unloadingPoint)}
        </div>
    )
}
type Type = (
    loadingPoint: string,
    unloadingPoint: string,
    invoiceNumber: string,
    filledLoad: number,
    date: number
) => ReactElement
const acknowledgeBody: Type = (loadingPoint, unloadingPoint, invoiceNumber, filledLoad, date) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {loadingPointToUnloadingPoint(loadingPoint, unloadingPoint)}
            {InvoiceNumber(invoiceNumber, filledLoad)}
            {getDate(date)}
        </div>
    )
}
