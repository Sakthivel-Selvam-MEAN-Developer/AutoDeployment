import { FC } from 'react'
import { TransporterInvoiceProps, tripTableProps } from './type'
import { TripTable } from './table'

const TransporterInvoiceTable: FC<TransporterInvoiceProps> = ({ tripDetails, setTripDetails }) => {
    const stock = tripDetails.filter((trip) => trip.loadingPointToStockPointTrip !== null)
    const direct = tripDetails.filter((trip) => trip.loadingPointToUnloadingPointTrip !== null)
    return (
        <>
            <TransporterTripTable direct={direct} setTripDetails={setTripDetails} stock={stock} />
            <br />
        </>
    )
}
export default TransporterInvoiceTable
const TransporterTripTable: FC<tripTableProps> = ({ direct, setTripDetails, stock }) => {
    console.log(direct, stock)
    return (
        <div style={{ width: '100%' }}>
            <TripTable trip={direct} setTripDetails={setTripDetails} tableName={'Direct Trip'} />
            <TripTable
                trip={stock}
                setTripDetails={setTripDetails}
                tableName={'LoadingToStock Trip'}
            />
        </div>
    )
}
