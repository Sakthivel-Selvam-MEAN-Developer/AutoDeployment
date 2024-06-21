import { FC } from 'react'
import { epochToMinimalDate } from '../../../../commonUtils/epochToTime'
import { AdvanceDetail, driverDetailProps } from '../types'
import { totalCalculation } from './totalCalulation'
interface AdvanceTableProps {
    tripDetails: driverDetailProps
}
export const AdvanceTable: FC<AdvanceTableProps> = ({ tripDetails }) => {
    const { totalAdvance } = totalCalculation(tripDetails)
    return (
        <table className="advanceTable" style={{ width: '100%' }}>
            <tr>
                <th className="alignLeft" style={{ width: '10%' }}>
                    SI No
                </th>
                <th className="alignLeft" style={{ width: '20%' }}>
                    Date
                </th>
                <th className="alignLeft" style={{ width: '40%' }}>
                    Particulars
                </th>
                <th className="alignRight" style={{ width: '15%' }}>
                    Recd. Amt.
                </th>
                <th className="alignRight" style={{ width: '15%' }}>
                    Distributed Amt.
                </th>
            </tr>
            {tripDetails.advanceDetails.length > 0 &&
                tripDetails.advanceDetails.map((tripDetails, index) => (
                    <TableCells key={index} tripDetails={tripDetails} number={index} />
                ))}
            <tr>
                <td></td>
                <td></td>
                <td className="alignRight">
                    <h4>Total</h4>
                </td>
                <td className="alignRight">
                    <h4>{totalAdvance.toFixed(2)}</h4>
                </td>
                <td className="alignRight">
                    <h4>0.00</h4>
                </td>
            </tr>
        </table>
    )
}
interface tableCellProps {
    tripDetails: AdvanceDetail
    number: number
}
const TableCells: FC<tableCellProps> = ({ tripDetails, number }) => {
    return tripDetails.advanceforTrip.map((tripAdvance, index) => {
        return (
            <tr key={index}>
                <td className="alignLeft">{number + 1}</td>
                <td className="alignLeft">{epochToMinimalDate(tripAdvance.advanceDate)}</td>
                <td className="alignLeft">Recd From Vigneshwaran R at HO</td>
                <td className="alignRight">{tripAdvance.amount.toFixed(2)}</td>
                <td className="alignRight">0.00</td>
            </tr>
        )
    })
}
