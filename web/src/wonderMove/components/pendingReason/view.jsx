import DetailsList from './details.jsx'
import { useEffect, useState } from 'react'
import { allPendingSRforSingleVehicle } from '../../services/reason.js'
import { useParams } from 'react-router-dom'

const Details = () => {
    const { number } = useParams()
    const [pendingDetails, setPendingDetails] = useState()

    useEffect(() => {
        allPendingSRforSingleVehicle(number).then(setPendingDetails)
    }, [number])

    return (
        <>
            <DetailsList pendingDetails={pendingDetails} />
        </>
    )
}
export default Details
