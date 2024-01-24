import { epochToMinimalDate } from '../../../commonUtils/epochToTime'

const AcknowledgementLocation = (loadingPoint: string, unloadingPoint: string, date: number) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <p style={{ display: 'flex' }}>
                    <span style={{ display: 'flex', width: '50px' }}>From </span>
                    <span>: {loadingPoint}</span>
                </p>
                <p style={{ display: 'flex' }}>
                    <span style={{ display: 'flex', width: '50px' }}>To </span>
                    <span>: {unloadingPoint}</span>
                </p>
            </div>
            <p style={{ display: 'flex' }}>
                <span style={{ display: 'flex', width: '50px' }}>Date </span>
                <span>: {epochToMinimalDate(date)}</span>
            </p>
        </div>
    )
}

export default AcknowledgementLocation
