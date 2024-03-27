import { useEffect, useState } from 'react'
import { getAllTransporter } from '../../../services/transporter'
import ListAllTransporter from './transporterReportShow'

const TransporterReport: React.FC = () => {
    const [allTransporter, setAllTransporter] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllTransporter()
            .then(setAllTransporter)
            .then(() => setLoading(false))
    }, [])
    return (
        <>
            <ListAllTransporter allTransporter={allTransporter} loading={loading} />
        </>
    )
}
export default TransporterReport
