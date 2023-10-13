import { useEffect, useState } from 'react'
import PendingStops from './show.jsx'

import { pendingStopReason } from '../../services/stops.js'

const PendingList = () => {
    const [pendingStops, setPendingStops] = useState([])

    useEffect(() => {
        pendingStopReason().then(setPendingStops)
    }, [])

    return (
        <>
            {pendingStops.length > 0 ? (
                <PendingStops pendingStops={pendingStops} />
            ) : (
                <h5
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    No Pending Reasons To Update
                </h5>
            )}
        </>
    )
}

export default PendingList
