import DetailsList from './details.tsx'
import { useEffect, useState } from 'react'
import { allPendingSRforSingleVehicle } from '../../services/reason.ts'
import { useParams } from 'react-router-dom'

interface DetailsProps {
    pendingDetails: any;
}
const Details: React.FC<DetailsProps>  = () => {
    const { number } = useParams()
    const [pendingDetails, setPendingDetails] = useState()

    useEffect(() => {
        // @ts-ignore
        allPendingSRforSingleVehicle(number).then(setPendingDetails)
    }, [number])

    return (
        <>
            <DetailsList pendingDetails={pendingDetails} />
        </>
    )
}
export default Details
