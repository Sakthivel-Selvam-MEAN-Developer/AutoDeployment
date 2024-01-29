import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

const AcknowledgementLocation = (
    loadingPoint: string,
    unloadingPoint: string,
    date: number,
    filledLoad: number,
    invoiceNumber: string
) => {
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
                    <span style={{ display: 'flex', width: '135px', fontWeight: '600' }}>
                        Invoice Number{' '}
                    </span>
                    <span>: {invoiceNumber}</span>
                </p>
                <p style={{ display: 'flex' }}>
                    <span style={{ display: 'flex', width: '135px', fontWeight: '600' }}>
                        Loaded Quantity{' '}
                    </span>
                    <span>: {filledLoad} Tons</span>
                </p>
            </div>
            <p style={{ display: 'flex' }}>
                <span style={{ display: 'flex', width: '50px', fontWeight: '600' }}>Date </span>
                <span>: {epochToMinimalDate(date)}</span>
            </p>
        </div>
    )
}

export default AcknowledgementLocation
