import { useState } from 'react'
import BunkReportList from '../bunkReport/list'
import AddBunk from './addBunk'

const Bunk = () => {
    const [reCall, setReCall] = useState<boolean>(false)
    return (
        <>
            <AddBunk setReCall={setReCall} reCall={reCall} />
            <br />
            <BunkReportList reCall={reCall} />
        </>
    )
}
export default Bunk
