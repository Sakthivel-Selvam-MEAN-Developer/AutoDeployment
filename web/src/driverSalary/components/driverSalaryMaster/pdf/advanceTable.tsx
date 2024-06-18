import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { AdvanceDetail } from './types'
export const totalCalculation = (advanceDetails: AdvanceDetail[]) => {
    let total = 0
    advanceDetails.map((trip) => {
        trip.advanceforTrip.map(({ amount }: { amount: number }) => (total += amount))
    })
    return total
}
interface AdvanceTableProps {
    advanceDetails: AdvanceDetail[]
}
export const AdvanceTable: FC<AdvanceTableProps> = ({ advanceDetails }) => {
    const TotalAdvance = totalCalculation(advanceDetails)
    return (
        <table className="advanceTable" style={{ width: '100%' }}>
            <tr>
                <th style={{ textAlign: 'left' }}>SI No</th>
                <th style={{ textAlign: 'left' }}>Date</th>
                <th style={{ textAlign: 'left' }}>Particulars</th>
                <th style={{ textAlign: 'right' }}>Recd. Amt.</th>
                <th style={{ textAlign: 'right' }}>Distributed Amt.</th>
            </tr>
            {advanceDetails.length > 0 &&
                advanceDetails.map((tripDetails, index) => (
                    <TableCells key={index} tripDetails={tripDetails} />
                ))}
            <tr>
                <td></td>
                <td></td>
                <td style={{ textAlign: 'right' }}>
                    <h4>Total</h4>
                </td>
                <td style={{ textAlign: 'right' }}>
                    <h4>{TotalAdvance.toFixed(2)}</h4>
                </td>
                <td style={{ textAlign: 'right' }}>
                    <h4>0.00</h4>
                </td>
            </tr>
        </table>
    )
}
interface tableCellProps {
    tripDetails: AdvanceDetail
}
const TableCells: FC<tableCellProps> = ({ tripDetails }) => {
    return tripDetails.advanceforTrip.map((tripAdvance, index) => {
        return (
            <tr key={index}>
                <td style={{ textAlign: 'left' }}>1</td>
                <td style={{ textAlign: 'left' }}>{epochToMinimalDate(tripAdvance.advanceDate)}</td>
                <td style={{ textAlign: 'left' }}>Recd From Vigneshwaran R at HO</td>
                <td style={{ textAlign: 'right' }}>{tripAdvance.amount.toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>0.00</td>
            </tr>
        )
    })
}
