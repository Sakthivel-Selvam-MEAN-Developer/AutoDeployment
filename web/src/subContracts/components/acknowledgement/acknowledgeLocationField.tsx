import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

const style = { display: 'flex', width: '135px', fontWeight: '600' }

export const getInvoiceNumber = (invoiceNumber: string) => {
    return (
        <p style={{ display: 'flex' }}>
            <span style={style}> Invoice Number</span> <span>: {invoiceNumber}</span>
        </p>
    )
}

export const getFilledLoad = (filledLoad: number) => {
    return (
        <p style={{ display: 'flex' }}>
            <span style={style}>Loaded Quantity</span> <span>: {filledLoad} Tons</span>
        </p>
    )
}

export const getFrom = (loadingPoint: string) => {
    return (
        <p style={{ display: 'flex' }}>
            <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>From </span>
            <span>: {loadingPoint}</span>
        </p>
    )
}
export const getTo = (unloadingPoint: string) => {
    return (
        <p style={{ display: 'flex' }}>
            <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>To </span>
            <span>: {unloadingPoint}</span>
        </p>
    )
}

export const getDate = (date: number) => {
    return (
        <p style={{ display: 'flex' }}>
            <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>Date </span>
            <span>: {epochToMinimalDate(date)}</span>
        </p>
    )
}
