import { useState } from 'react'
import TransporterInvoiceTable from './show'
import { getTripByTransporterInvoice } from '../../services/transporterInvoice'
import { tripDetailProps } from './type'
import InvoiceNumberField from './invoiceNumberField'

const TransporterInvoiceList: React.FC = () => {
    const [filteredTripDetails, setFilteredTripDetails] = useState<tripDetailProps[]>([])
    const [showTable, setShowTable] = useState(false)
    const handleSearch = (invoiceNumber: string) => {
        getTripByTransporterInvoice(invoiceNumber).then((data) => {
            setFilteredTripDetails(data)
            setShowTable(true)
        })
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
