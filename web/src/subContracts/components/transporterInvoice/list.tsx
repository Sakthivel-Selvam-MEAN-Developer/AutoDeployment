import { useEffect, useState } from 'react'
import TransporterInvoiceTable from './show'
import { getTripByTransporterInvoice } from '../../services/transporterInvoice'
import { tripDetailProps } from './type'
import InvoiceNumberField from './invoiceNumberField'

const TransporterInvoiceList: React.FC = () => {
    const [tripDetails, setTripDetails] = useState<tripDetailProps[]>([])
    const [filteredTripDetails, setFilteredTripDetails] = useState<tripDetailProps[]>([])
    const [showTable, setShowTable] = useState(false)
    useEffect(() => {
        getTripByTransporterInvoice().then((data) => {
            setTripDetails(data)
            setFilteredTripDetails(data)
        })
    }, [])
    const handleSearch = (invoiceNumber: string) => {
        const filteredTrips = tripDetails.filter((trip) => {
            const { loadingPointToStockPointTrip, loadingPointToUnloadingPointTrip } = trip
            return (
                (loadingPointToStockPointTrip &&
                    loadingPointToStockPointTrip.invoiceNumber.includes(invoiceNumber)) ||
                (loadingPointToUnloadingPointTrip &&
                    loadingPointToUnloadingPointTrip.invoiceNumber.includes(invoiceNumber))
            )
        })
        setFilteredTripDetails(filteredTrips)
        setShowTable(true)
    }
    return (
        <div
            data-testid="test"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}
        >
            <InvoiceNumberField onSearch={handleSearch} />
            {showTable && <TransporterInvoiceTable tripDetails={filteredTripDetails} />}
        </div>
    )
}
export default TransporterInvoiceList
