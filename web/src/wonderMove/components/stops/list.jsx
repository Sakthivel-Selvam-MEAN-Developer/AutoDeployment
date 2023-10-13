import { useState } from 'react'
import SearchStops from './searchStops'
import Stops from './view'

const StopList = () => {
    const [selectedStop, setSelectedStop] = useState()

    return (
        <>
            <SearchStops onSelect={setSelectedStop} />
            <br />
            {selectedStop && <Stops number={selectedStop} />}
        </>
    )
}

export default StopList
