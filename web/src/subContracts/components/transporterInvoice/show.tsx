import { FC, useEffect, useState } from 'react'
import { TransporterInvoiceProps, tripTableProps } from './type'
import { TripTable } from './table'

const TransporterInvoiceTable: FC<TransporterInvoiceProps> = ({ tripDetails }) => {
    const stock = tripDetails.filter((trip) => trip.loadingPointToStockPointTrip !== null)
    const direct = tripDetails.filter((trip) => trip.loadingPointToUnloadingPointTrip !== null)
    return (
        <>
            <TransporterTripTable direct={direct} stock={stock} />
            <br />
        </>
    )
}
export default TransporterInvoiceTable
const TransporterTripTable: FC<tripTableProps> = ({ direct, stock }) => {
    const [directTrip, setDirectTrip] = useState(direct)
    const [stockTrip, setStockTrip] = useState(stock)
    useEffect(() => {
        setDirectTrip(direct)
        setStockTrip(stock)
    }, [direct, stock])
    return (
        <div style={{ width: '100%' }}>
            <TripTable trip={directTrip} setTripDetails={setDirectTrip} tableName={'Direct Trip'} />
            <TripTable
                trip={stockTrip}
                setTripDetails={setStockTrip}
                tableName={'LoadingToStock Trip'}
            />
        </div>
    )
}
