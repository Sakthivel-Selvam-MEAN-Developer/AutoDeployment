import DetailsList from './details.tsx'
import { useEffect, useState } from 'react'
import { allPendingSRforSingleVehicle } from '../../services/reason.ts'
import { Params, useParams } from 'react-router-dom'
export interface pendingDetailsProps {
    id: number
    startTime: number
    endTime: number
    durationInMillis: number
    vehicleId: number
    latitude: number
    longitude: number
    source: string
}
interface DetailsProps {}
const Details: React.FC<DetailsProps> = () => {
    const { number }: Readonly<Params<string>> = useParams()
    const [pendingDetails, setPendingDetails] = useState<pendingDetailsProps[]>([])

    useEffect(() => {
        if (number !== undefined) allPendingSRforSingleVehicle(number).then(setPendingDetails)
    }, [number])

    return (
        <>
            <DetailsList pendingDetails={pendingDetails} />
        </>
    )
}
export default Details
