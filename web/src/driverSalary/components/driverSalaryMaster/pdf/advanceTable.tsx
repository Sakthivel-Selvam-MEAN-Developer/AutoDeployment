import { FC } from 'react'
import { driverDetailProps } from '../types'
import { totalCalculation } from './totalCalulation'
import { TableCells } from './advanceTableUtils'
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
            </tr>
        </table>
    )
}
