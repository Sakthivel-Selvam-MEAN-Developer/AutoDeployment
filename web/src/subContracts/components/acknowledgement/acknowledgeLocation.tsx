import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

export const AcknowledgementLocation = (
    loadingPoint: string,
    unloadingPoint: string,
    date: number,
    filledLoad: number,
    invoiceNumber: string
) => {
    const style = { display: 'flex', width: '135px', fontWeight: '600' }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <div>
                <p style={{ display: 'flex' }}>
                    <span style={style}> Invoice Number</span> <span>: {invoiceNumber}</span>
                </p>
                <p style={{ display: 'flex' }}>
                    <span style={style}>Loaded Quantity</span> <span>: {filledLoad} Tons</span>
                </p>
            </div>
            <p style={{ display: 'flex' }}>
                <span style={style}>Date </span> <span>: {epochToMinimalDate(date)}</span>
            </p>
        </div>
    )
}
