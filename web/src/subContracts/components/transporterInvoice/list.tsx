import { useEffect, useState } from 'react'
import TransporterInvoiceTable from './show'
import { getTripByTransporterInvoice } from '../../services/transporterInvoice'
import { tripDetailProps } from './type'

const TransporterInvoiceList: React.FC = () => {
    const [tripDetails, setTripDetails] = useState<tripDetailProps[]>([])
    useEffect(() => {
        getTripByTransporterInvoice().then(setTripDetails)
    }, [])
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}
        >
            <TransporterInvoiceTable tripDetails={tripDetails} setTripDetails={setTripDetails} />
        </div>
    )
}
export default TransporterInvoiceList
