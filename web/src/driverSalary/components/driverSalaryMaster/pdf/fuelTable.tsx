import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { driverDetailProps, Trip } from './types'
interface FuelTable {
    tripDetails: driverDetailProps
}
export const FuelTable: FC<FuelTable> = ({ tripDetails }) => {
    return (
        <table className="advanceTable" style={{ width: '100%' }}>
            <tr>
                <th className="alignLeft">SI No</th>
                <th className="alignLeft">Date</th>
                <th className="alignLeft">Place/Bunk</th>
                <th className="alignLeft">Bill/Fleet Card No</th>
                <th className="alignRight">Lts</th>
                <th className="alignRight">Amount</th>
                <th className="alignRight">Fill Km</th>
                <th className="alignRight">Run Km</th>
                <th className="alignRight">Mileage</th>
            </tr>
            <TableCells tripDetails={tripDetails.trips} />
        </table>
    )
}
interface tableCellProps {
    tripDetails: Trip[]
}
const TableCells: FC<tableCellProps> = ({ tripDetails }) => {
    let number = 0
    return tripDetails.map((trip) => {
        if (trip.fuel.length === 0) return
        number += 1
        const fuel = trip.fuel[0]
        return (
            <tr key={trip.id}>
                <td className="alignLeft">{number}</td>
                <td className="alignLeft">{epochToMinimalDate(fuel.fueledDate)}</td>
                <td className="alignLeft">{fuel.bunk.bunkName}</td>
                <td className="alignLeft">{fuel.invoiceNumber}</td>
                <td className="alignLeft"></td>
                <td className="alignRight">{fuel.totalprice.toFixed(2)}</td>
                <td className="alignLeft"></td>
                <td className="alignRight">0.00</td>
            </tr>
        )
    })
}
