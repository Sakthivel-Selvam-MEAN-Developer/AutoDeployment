import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

const style = { display: 'flex', width: '135px', fontWeight: '600' }
export const AcknowledgementLocation = (
    loadingPoint: string,
    unloadingPoint: string,
    date: number,
    filledLoad: number,
    invoiceNumber: string
) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {loadingPointToUnloadingPoint(loadingPoint, unloadingPoint)}
            {InvoiceNumber(invoiceNumber, filledLoad)}
            <p style={{ display: 'flex' }}>
                <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>Date </span>
                <span>: {epochToMinimalDate(date)}</span>
            </p>
        </div>
    )
}
const InvoiceNumber = (invoiceNumber: string, filledLoad: number) => {
    return (
        <div>
            <p style={{ display: 'flex' }}>
                <span style={style}> Invoice Number</span> <span>: {invoiceNumber}</span>
            </p>
            <p style={{ display: 'flex' }}>
                <span style={style}>Loaded Quantity</span> <span>: {filledLoad} Tons</span>
            </p>
        </div>
    )
}
const loadingPointToUnloadingPoint = (loadingPoint: string, unloadingPoint: string) => {
    return (
        <div>
            <p style={{ display: 'flex' }}>
                <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>From </span>
                <span>: {loadingPoint}</span>
            </p>
            <p style={{ display: 'flex' }}>
                <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>To </span>
                <span>: {unloadingPoint}</span>
            </p>
        </div>
    )
}
