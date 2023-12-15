import React, { useState } from 'react'
import SearchStops from './searchStops'
import Stops from './view'

interface StopListProps {}
const StopList: React.FC<StopListProps> = () => {
    const [selectedStop, setSelectedStop] = useState<string | undefined>()

    return (
        <>
            <SearchStops onSelect={setSelectedStop} />
            <br />
            {selectedStop && <Stops number={selectedStop} />}
        </>
    )
}

export default StopList
