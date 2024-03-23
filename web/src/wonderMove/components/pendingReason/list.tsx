import { useEffect, useState } from 'react'
import PendingStops, { PendingStop } from './show.tsx'
import { pendingStopReason } from '../../services/stops.js'

interface PendingListProps {}
const style = {
    display: 'flex',
    justifyContent: 'center'
}

const pendingStopsList = (pendingStops: PendingStop[]) => {
    return (
        <>
            {pendingStops.length > 0 && <PendingStops pendingStops={pendingStops} />}
            {pendingStops.length === 0 && <h5 style={style}>No Pending Reasons To Update</h5>}
        </>
    )
}

const PendingList: React.FC<PendingListProps> = () => {
    const [pendingStops, setPendingStops] = useState([])
    useEffect(() => {
        pendingStopReason().then(setPendingStops)
    }, [])
    return pendingStopsList(pendingStops)
}

export default PendingList
