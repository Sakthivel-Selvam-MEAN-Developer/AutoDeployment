import DetailsList from './details.tsx'
import { useEffect, useState } from 'react'
import { allPendingSRforSingleVehicle } from '../../services/reason.ts'
import { useParams } from 'react-router-dom'

interface DetailsProps {}
const Details: React.FC<DetailsProps> = () => {
    const { number }: any = useParams()
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
